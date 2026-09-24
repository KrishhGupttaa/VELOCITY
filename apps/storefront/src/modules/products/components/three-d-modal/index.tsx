"use client"

import React, { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { XMark } from "@medusajs/icons"
import ArQrModal from "../ar-qr-modal"

type ThreeDModalProps = {
  isOpen: boolean
  onClose: () => void
  modelUrl: string
  productTitle: string
}

export default function ThreeDModal({
  isOpen,
  onClose,
  modelUrl,
  productTitle,
}: ThreeDModalProps) {
  const [mounted, setMounted] = useState(false)
  const [isQrOpen, setIsQrOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!document.querySelector('script[src*="model-viewer"]')) {
      const script = document.createElement("script")
      script.type = "module"
      script.src = "https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js"
      document.head.appendChild(script)
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isQrOpen) onClose()
    }
    if (isOpen) {
      document.body.style.overflow = "hidden"
      document.addEventListener("keydown", handleKeyDown)
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, isQrOpen, onClose])

  if (!isOpen || !mounted) return null

  const modalContent = (
    <>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-6 animate-fade-in">
        <div className="relative w-full max-w-5xl bg-[#121212] rounded-3xl overflow-hidden border border-gray-800 shadow-2xl flex flex-col h-[85vh]">
          {/* Header */}
          <div className="p-5 border-b border-gray-800 flex items-center justify-between bg-black/80 shrink-0">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-green-400 uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Interactive 3D & AR View
              </span>
              <h3 className="text-lg font-extrabold text-white uppercase tracking-tight mt-0.5">
                {productTitle}
              </h3>
            </div>
            
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
            >
              <XMark className="w-6 h-6" />
            </button>
          </div>

          {/* 3D Model Viewport */}
          <div className="flex-1 w-full h-full relative flex items-center justify-center bg-gradient-to-b from-[#181818] to-[#0a0a0a] overflow-hidden">
            {/* @ts-ignore */}
            <model-viewer
              src={modelUrl}
              alt={`3D Model of ${productTitle}`}
              auto-rotate
              camera-controls
              camera-orbit="45deg 75deg 90%"
              field-of-view="35deg"
              bounds="tight"
              shadow-intensity="1.5"
              shadow-softness="0.8"
              exposure="1.2"
              ar
              interaction-prompt="auto"
              style={{ width: "100%", height: "100%", outline: "none" }}
            >
              {/* Custom AR Button for Mobile Devices */}
              <button
                slot="ar-button"
                className="absolute top-4 left-4 bg-white/90 hover:bg-white text-black font-bold text-xs uppercase px-4 py-2 rounded-full shadow-lg transition-transform active:scale-95 flex items-center gap-2"
              >
                📱 View in Your Space (AR)
              </button>

              <div slot="poster" className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <span className="text-xs text-gray-400 font-medium">Loading 3D Model...</span>
                </div>
              </div>
            {/* @ts-ignore */}
            </model-viewer>

            {/* Desktop Scan Prompt Badge */}
            <div className="absolute top-4 right-4 z-10 hidden md:flex items-center gap-2 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs font-semibold text-gray-300 shadow-xl">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
              <span>Want AR on your phone?</span>
              <button
                onClick={() => setIsQrOpen(true)}
                className="text-white underline font-bold hover:text-purple-300 ml-1"
              >
                Scan QR Code
              </button>
            </div>

            {/* Controls Overlay Guidance */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/75 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 flex items-center gap-4 text-xs font-semibold text-gray-300 pointer-events-none shadow-xl">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Drag to Rotate 360°
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-600"></span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
                Pinch / Scroll to Zoom
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* AR QR Modal */}
      <ArQrModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        modelUrl={modelUrl}
        productTitle={productTitle}
      />
    </>
  )

  return createPortal(modalContent, document.body)
}
