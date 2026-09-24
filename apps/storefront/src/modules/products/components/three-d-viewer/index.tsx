"use client"

import React, { Suspense, useState, useEffect, useRef, Component, ReactNode } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment, ContactShadows, Center } from "@react-three/drei"
import { ArrowsPointingOut, ArrowPath } from "@medusajs/icons"
import { normalizeGlbUrl } from "@lib/util/get-3d-model"
import ArQrModal from "../ar-qr-modal"

const DEFAULT_FALLBACK_MODEL = "/models/shoes/Nike Shoe V2.glb"

function Model({ url, autoRotate, scale = 3.0 }: { url: string; autoRotate: boolean; scale?: number }) {
  const safeUrl = normalizeGlbUrl(url)
  const { scene } = useGLTF(safeUrl)
  const groupRef = useRef<any>()

  const isUrbanMotion = url.includes("urban-motion")

  return (
    <group ref={groupRef} dispose={null} rotation={isUrbanMotion ? [0, 2.45, 0] : [0, 0, 0]}>
      <Center position={[0, 0, 0]}>
        <primitive object={scene} scale={scale} />
      </Center>
    </group>
  )
}

function ModelWithValidation({
  url,
  autoRotate,
  scale = 3.0,
}: {
  url: string
  autoRotate: boolean
  scale?: number
}) {
  const [activeUrl, setActiveUrl] = useState<string>(normalizeGlbUrl(url))

  useEffect(() => {
    const targetUrl = normalizeGlbUrl(url)

    if (targetUrl.startsWith("http")) {
      let isMounted = true
      fetch(targetUrl, { method: "HEAD" })
        .then((res) => {
          if (!res.ok && isMounted) {
            console.warn("GLB URL non-200, fallback to demo model:", targetUrl)
            setActiveUrl(DEFAULT_FALLBACK_MODEL)
          } else if (isMounted) {
            setActiveUrl(targetUrl)
          }
        })
        .catch(() => {
          if (isMounted) {
            console.warn("GLB URL CORS/network failure, fallback to demo model:", targetUrl)
            setActiveUrl(DEFAULT_FALLBACK_MODEL)
          }
        })
      return () => {
        isMounted = false
      }
    } else {
      setActiveUrl(targetUrl)
    }
  }, [url])

  return <Model url={activeUrl} autoRotate={autoRotate} scale={scale} />
}

// React Error Boundary fallback
class ThreeDErrorBoundary extends Component<
  { children: ReactNode; fallbackUrl: string; scale?: number },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallbackUrl: string; scale?: number }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: any) {
    console.warn("3D Model fetch failed inside canvas, rendering fallback model:", error)
  }

  render() {
    if (this.state.hasError) {
      return <Model url={this.props.fallbackUrl} autoRotate={true} scale={this.props.scale || 3.0} />
    }
    return this.props.children
  }
}

// Fallback loader
function Loader() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50/80 backdrop-blur-sm z-10">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
      <p className="mt-4 text-sm font-medium tracking-widest text-black uppercase">Loading 3D Model...</p>
    </div>
  )
}

export default function ThreeDViewer({
  modelUrl,
  transparent = false,
}: {
  modelUrl: string
  transparent?: boolean
}) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)
  const [isQrOpen, setIsQrOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const safeModelUrl = modelUrl ? normalizeGlbUrl(modelUrl) : DEFAULT_FALLBACK_MODEL
  const modelScale = transparent ? 3.0 : 2.8

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden group ${
        transparent ? "bg-transparent h-full" : "bg-[#f4f4f4] rounded-xl"
      } ${isFullscreen ? "h-screen" : transparent ? "h-full min-h-[400px]" : "h-[500px] md:h-[700px]"}`}
    >
      {/* UI Overlay Buttons */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <button
          onClick={() => setIsQrOpen(true)}
          className="bg-black/90 hover:bg-black text-white backdrop-blur-md px-3.5 py-2 rounded-full text-[11px] font-extrabold uppercase tracking-wider transition-all hover:scale-105 shadow-xl flex items-center gap-1.5 border border-white/20"
          title="Scan QR to view in Mobile AR"
        >
          <span>📱</span>
          <span>View AR</span>
        </button>

        {!transparent && (
          <div className="flex gap-2">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className="bg-white/90 backdrop-blur shadow-sm p-2.5 rounded-full hover:bg-black hover:text-white transition-colors"
              title={autoRotate ? "Pause Rotation" : "Auto Rotate"}
            >
              <ArrowPath className={autoRotate ? "animate-spin-slow" : ""} />
            </button>
            <button
              onClick={toggleFullscreen}
              className="bg-white/90 backdrop-blur shadow-sm p-2.5 rounded-full hover:bg-black hover:text-white transition-colors"
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              <ArrowsPointingOut />
            </button>
          </div>
        )}
      </div>

      {/* Floating Interactive 3D Pill Badge */}
      <div className="absolute bottom-6 left-6 z-20 transition-all duration-300 pointer-events-none">
        <span className="bg-black/80 dark:bg-white/90 text-white dark:text-black backdrop-blur-md text-[10px] font-extrabold tracking-widest uppercase px-4 py-2 rounded-full shadow-xl flex items-center gap-2 border border-white/10">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          Drag to Rotate
        </span>
      </div>

      <Suspense fallback={<Loader />}>
        <Canvas
          shadows
          camera={{ position: [0, 0.1, 1.95], fov: 30 }}
          className="w-full h-full"
        >
          <ambientLight intensity={0.9} />
          <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow />
          <directionalLight position={[-5, 2, -5]} intensity={0.6} />
          <spotLight position={[0, 10, 10]} angle={0.25} penumbra={1} intensity={1.5} castShadow />
          <Environment preset="city" />

          <ThreeDErrorBoundary fallbackUrl={DEFAULT_FALLBACK_MODEL} scale={modelScale}>
            <ModelWithValidation url={safeModelUrl} autoRotate={autoRotate} scale={modelScale} />
          </ThreeDErrorBoundary>

          <ContactShadows position={[0, -0.7, 0]} opacity={0.5} scale={8} blur={1.5} far={3} />
          <OrbitControls
            autoRotate={true}
            autoRotateSpeed={0.8}
            enablePan={false}
            minDistance={0.8}
            maxDistance={3.5}
          />
        </Canvas>
      </Suspense>

      <ArQrModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        modelUrl={safeModelUrl}
        productTitle="3D Sneaker"
      />
    </div>
  )
}
