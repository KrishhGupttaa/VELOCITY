"use client"

import dynamic from "next/dynamic"

export const DynamicThreeDViewer = dynamic(
  () => import("./index"),
  { 
    ssr: false,
    loading: () => (
      <div className="relative w-full h-[500px] md:h-[700px] bg-[#f4f4f4] rounded-xl flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
      </div>
    )
  }
)
