import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function PromoBanner() {
  return (
    <section className="max-w-[1440px] mx-auto px-6 py-12">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
        
        {/* Decorative Background Blur */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gray-700/30 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-xl flex flex-col items-start gap-4">
          <span className="text-[11px] font-bold tracking-[0.25em] bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full uppercase">
            3D Interactive Experience
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter uppercase leading-tight">
            STEP INTO THE FUTURE OF FOOTWEAR.
          </h2>
          <p className="text-sm md:text-base text-gray-300 font-medium leading-relaxed">
            Rotate, zoom, and inspect every stitch of our signature sneakers in real-time 3D before making your move.
          </p>
          
          <LocalizedClientLink
            href="/store?category=shoes"
            className="mt-4 bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-full font-bold text-xs tracking-widest uppercase transition-all duration-500 hover:scale-105 shadow-lg"
          >
            EXPERIENCE 3D CATALOG
          </LocalizedClientLink>
        </div>

        {/* Sneaker Visual / Card */}
        <div className="relative z-10 shrink-0 w-full md:w-auto flex justify-center">
          <div className="relative bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl max-w-xs text-center transform hover:rotate-2 transition-transform duration-500">
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400"
              alt="Air Runner X"
              className="w-48 h-48 object-contain mx-auto drop-shadow-xl"
            />
            <span className="text-xs font-bold uppercase tracking-wider block mt-2">
              AIR RUNNER X — LIMITED EDITION
            </span>
            <span className="text-xs text-gray-300 font-mono block mt-1">
              ₹8,999 INR
            </span>
          </div>
        </div>

      </div>
    </section>
  )
}
