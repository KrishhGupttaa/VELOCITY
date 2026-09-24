import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const categories = [
  {
    title: "PERFORMANCE RUNNING",
    subtitle: "Engineered for speed & endurance",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
    href: "/store?category=running",
    span: "col-span-1 md:col-span-2 row-span-1",
  },
  {
    title: "STREET LIFESTYLE",
    subtitle: "Iconic designs for daily wear",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=600",
    href: "/store?category=lifestyle",
    span: "col-span-1 row-span-1",
  },
  {
    title: "TRAIL & OUTDOOR",
    subtitle: "Rugged grip for rough terrain",
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=600",
    href: "/store?category=outdoor",
    span: "col-span-1 row-span-1",
  },
  {
    title: "LIMITED EDITIONS",
    subtitle: "Exclusive 3D-crafted releases",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800",
    href: "/store?category=limited",
    span: "col-span-1 md:col-span-2 row-span-1",
  },
]

export default function CategoriesGrid() {
  return (
    <section className="max-w-[1440px] mx-auto px-6 py-20">
      <div className="flex flex-col items-center text-center mb-12">
        <span className="text-xs font-bold tracking-[0.25em] text-gray-500 uppercase mb-2">
          Curated Lineup
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter uppercase text-black">
          SHOP BY CATEGORY
        </h2>
        <div className="w-12 h-1 bg-black mt-4"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px] md:auto-rows-[340px]">
        {categories.map((cat, index) => (
          <LocalizedClientLink
            key={index}
            href={cat.href}
            className={`group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 ${cat.span}`}
          >
            {/* Background Image with Hover Zoom */}
            <img
              src={cat.image}
              alt={cat.title}
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300 group-hover:from-black/90"></div>

            {/* Card Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
              <span className="text-[10px] font-bold tracking-widest uppercase bg-white/20 backdrop-blur-md px-3 py-1 rounded-full w-max mb-2">
                Explore Line
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight uppercase">
                {cat.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-300 font-medium mt-1">
                {cat.subtitle}
              </p>
              
              <div className="mt-4 flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-white group-hover:translate-x-2 transition-transform duration-300">
                <span>Shop Now</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </div>
            </div>
          </LocalizedClientLink>
        ))}
      </div>
    </section>
  )
}
