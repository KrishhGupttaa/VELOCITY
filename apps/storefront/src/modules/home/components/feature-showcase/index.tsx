import React from "react"

const features = [
  {
    number: "01",
    title: "AERO-KNIT UPPER",
    description: "Ultra-breathable micro-woven fabric that molds seamlessly to your foot for zero friction.",
  },
  {
    number: "02",
    title: "CARBON-FLY PLATE",
    description: "Full-length responsive carbon plate engineered to maximize energy return with every stride.",
  },
  {
    number: "03",
    title: "CLOUD-CUSHION SOLE",
    description: "Dual-density foam cushioning system designed to absorb shock and protect your joints.",
  },
  {
    number: "04",
    title: "ALL-TERRAIN LUGS",
    description: "High-grade rubber compound with multi-directional tread pattern for unmatched grip.",
  },
]

export default function FeatureShowcase() {
  return (
    <section className="bg-black text-white py-24 my-16 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & Tech Specs */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <span className="text-xs font-bold tracking-[0.3em] text-gray-400 uppercase">
                Engineering Excellence
              </span>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter uppercase mt-2 leading-none">
                CRAFTED FOR <br /> HIGH IMPACT.
              </h2>
              <p className="text-sm text-gray-400 font-medium mt-4 leading-relaxed">
                We combine precision 3D modeling, sustainable materials, and athletic research to create footwear that performs under extreme conditions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feat, idx) => (
                <div key={idx} className="border-t border-gray-800 pt-4 flex flex-col gap-2">
                  <span className="text-xs font-mono text-gray-500 font-bold">{feat.number}</span>
                  <h4 className="text-sm font-extrabold tracking-wider uppercase text-white">{feat.title}</h4>
                  <p className="text-xs text-gray-400 font-normal leading-relaxed">{feat.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Showcase */}
          <div className="lg:col-span-7 relative flex items-center justify-center">
            <div className="absolute w-[80%] h-[80%] bg-gradient-to-r from-gray-800/40 to-gray-900/60 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 group">
              <img
                src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=900"
                alt="Sneaker Technology Showcase"
                className="w-full max-w-[550px] mx-auto rounded-3xl shadow-2xl object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-lg border border-white/20 px-6 py-3 rounded-2xl">
                <span className="text-[10px] font-mono tracking-widest text-gray-300 uppercase block">
                  Interactive 3D Render
                </span>
                <span className="text-sm font-bold text-white uppercase tracking-wide">
                  Velocity Air-Runner Spec V2
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
