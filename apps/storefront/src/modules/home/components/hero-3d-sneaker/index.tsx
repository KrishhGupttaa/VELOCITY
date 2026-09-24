"use client"

import React from "react"
import { DynamicThreeDViewer } from "@modules/products/components/three-d-viewer/dynamic"

type Props = {
  modelUrl?: string
  productTitle?: string
}

export default function Hero3DSneaker({
  modelUrl = "/models/shoes/urban-motion.glb",
}: Props) {
  return (
    <div className="relative w-full h-full min-h-[380px] sm:min-h-[480px] md:min-h-[550px] flex items-center justify-center bg-transparent">
      {/* Pure Seamless 3D Canvas Floating Directly on Hero Background */}
      <div className="w-full h-full min-h-[380px] sm:min-h-[480px] md:min-h-[550px] relative bg-transparent overflow-visible">
        <DynamicThreeDViewer modelUrl={modelUrl} transparent={true} />
      </div>
    </div>
  )
}
