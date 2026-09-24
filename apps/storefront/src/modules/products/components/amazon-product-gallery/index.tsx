"use client"

import React, { useState, useEffect } from "react"
import { HttpTypes } from "@medusajs/types"
import { DynamicThreeDViewer } from "../three-d-viewer/dynamic"
import ThreeDModal from "../three-d-modal"

type Props = {
  images: HttpTypes.StoreProductImage[]
  model3dUrl?: string | null
  productTitle: string
}

export default function AmazonProductGallery({
  images,
  model3dUrl,
  productTitle,
}: Props) {
  // Mode: "3d" or image index (0, 1, 2...)
  const [activeMode, setActiveMode] = useState<"3d" | number>(
    model3dUrl ? "3d" : 0
  )
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && model3dUrl) {
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.get("ar") === "true") {
        setIsModalOpen(true)
      }
    }
  }, [model3dUrl])

  const activeImage =
    typeof activeMode === "number" && images[activeMode]
      ? images[activeMode].url
      : images[0]?.url

  return (
    <div className="flex flex-col gap-3">
      {/* Amazon-Style Main Layout: Left Vertical Thumbnails + Center Main Viewer */}
      <div className="flex flex-col-reverse sm:flex-row gap-4">
        {/* Left Column: Vertical Thumbnails */}
        <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-y-auto max-h-[550px] no-scrollbar shrink-0">
          {/* 3D Model Thumbnail - Renders Sneaker Image Preview with 360° Badge */}
          {model3dUrl && (
            <button
              onClick={() => setActiveMode("3d")}
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 relative group bg-gray-100 ${
                activeMode === "3d"
                  ? "border-black ring-2 ring-black/20 scale-105 shadow-md"
                  : "border-gray-200 hover:border-gray-400 opacity-90 hover:opacity-100"
              }`}
              title="View Interactive 3D Model"
            >
              {/* Sneaker image thumbnail */}
              {images[0]?.url ? (
                <img
                  src={images[0].url}
                  alt="3D Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-900 flex items-center justify-center text-white">
                  👟
                </div>
              )}

              {/* 360° Circular Badge Overlay */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex flex-col items-center justify-center text-white gap-0.5">
                <svg
                  className="w-5 h-5 text-white animate-spin-slow"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span className="text-[9px] font-black tracking-widest uppercase text-white bg-black/60 px-1.5 py-0.2 rounded font-mono">
                  360°
                </span>
              </div>
            </button>
          )}

          {/* Product Image Thumbnails */}
          {images &&
            images.map((img, index) => {
              const isActive = activeMode === index
              return (
                <button
                  key={img.id || index}
                  onClick={() => setActiveMode(index)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-gray-100 ${
                    isActive
                      ? "border-black ring-2 ring-black/10 scale-105 shadow-md"
                      : "border-gray-200 hover:border-gray-400 opacity-80 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img.url}
                    alt={`${productTitle} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              )
            })}
        </div>

        {/* Center Column: Main Viewer Display Box */}
        <div className="flex-1 aspect-square rounded-2xl bg-[#f8f8f8] dark:bg-[#121212] border border-gray-200 dark:border-gray-800 overflow-hidden relative group shadow-sm">
          {activeMode === "3d" && model3dUrl ? (
            <div className="w-full h-full relative">
              <DynamicThreeDViewer modelUrl={model3dUrl} />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center p-4">
              <img
                src={activeImage}
                alt={productTitle}
                className="w-full h-full object-contain transition-transform duration-500 hover:scale-110 cursor-zoom-in"
              />
            </div>
          )}

          {/* Sleek Floating Action Buttons Inside Main Display Box */}
          {model3dUrl && (
            <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
              {activeMode !== "3d" ? (
                <button
                  onClick={() => setActiveMode("3d")}
                  className="bg-black/90 hover:bg-black text-white backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 shadow-lg flex items-center gap-2 border border-white/20"
                >
                  <svg
                    className="w-4 h-4 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  <span>Interactive 3D (360°)</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-black/90 hover:bg-black text-white backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 shadow-lg flex items-center gap-2 border border-white/20"
                >
                  <span>📱</span>
                  <span>View in AR / Fullscreen</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Full-screen 3D Modal */}
      {model3dUrl && (
        <ThreeDModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          modelUrl={model3dUrl}
          productTitle={productTitle}
        />
      )}
    </div>
  )
}
