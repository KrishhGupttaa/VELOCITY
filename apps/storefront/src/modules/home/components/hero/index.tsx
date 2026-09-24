import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button } from "@modules/common/components/ui"
import Hero3DSneaker from "@modules/home/components/hero-3d-sneaker"

const Hero = () => {
  return (
    <div className="min-h-[85vh] md:h-[90vh] py-12 md:py-0 w-full relative bg-[#F9F9F9] dark:bg-[#050505] overflow-hidden flex items-center justify-center transition-colors duration-300">
      {/* Background abstract element for premium feel */}
      <div className="absolute inset-0 z-0 flex justify-center items-center opacity-30 dark:opacity-20">
        <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-gradient-to-tr from-gray-200 to-gray-50 dark:from-gray-800 dark:to-black rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">

        {/* Left Content */}
        <div className="flex-1 flex flex-col items-start justify-center gap-4 sm:gap-6 max-w-2xl">
          <span className="text-xs font-bold tracking-[0.2em] text-gray-500 dark:text-gray-400 uppercase">
            New Arrival ✦ Interactive 3D
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-black dark:text-white tracking-tighter leading-[0.95] md:leading-[0.9]">
            ENGINEERED <br /> TO MOVE.
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-md font-medium mt-2 md:mt-4">
            Performance, comfort and design built for every step.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-6 md:mt-8 w-full sm:w-auto">
            <LocalizedClientLink href="/store" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-black hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 text-white rounded-full px-8 py-5 text-xs sm:text-sm font-semibold tracking-wide transition-all duration-500 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-xl">
                SHOP COLLECTION
              </Button>
            </LocalizedClientLink>
            <LocalizedClientLink href="/store" className="w-full sm:w-auto">
              <Button variant="transparent" className="w-full sm:w-auto border-2 border-black dark:border-white text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full px-8 py-5 text-xs sm:text-sm font-semibold tracking-wide transition-all duration-500 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-xl">
                EXPLORE SNEAKERS
              </Button>
            </LocalizedClientLink>
          </div>
        </div>

        {/* Right Content - Pure Interactive 3D GLB Model Canvas */}
        <div className="flex-1 w-full h-[40vh] sm:h-[55vh] md:h-[75vh] relative mt-4 md:mt-0 flex items-center justify-center">
          <Hero3DSneaker
            modelUrl="/models/shoes/urban-motion.glb"
            productTitle="Urban Motion 3D Sneaker"
          />
        </div>

      </div>
    </div>
  )
}

export default Hero
