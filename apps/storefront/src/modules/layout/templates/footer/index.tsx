import { Text } from "@modules/common/components/ui";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

export default async function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-[#0a0a0a] border-t border-gray-200 dark:border-gray-800 text-black dark:text-white pt-24 pb-12 mt-16 transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-y-16">
          
          <div className="flex-1 max-w-sm flex flex-col gap-6">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus hover:text-gray-500 transition-colors uppercase font-bold tracking-widest text-black dark:text-white"
            >
              V E L O C I T Y
            </LocalizedClientLink>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
              Performance, comfort and design built for every step. The ultimate premium sneaker experience.
            </p>
          </div>

          <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="flex flex-col gap-y-4">
              <span className="text-xs font-bold tracking-widest uppercase text-black dark:text-white">
                Shop
              </span>
              <ul className="flex flex-col gap-3">
                <li>
                  <a href="/store" className="text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-black dark:after:bg-white after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100">
                    All Sneakers
                  </a>
                </li>
                <li>
                  <a href="/store" className="text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-black dark:after:bg-white after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100">
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a href="/store" className="text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-black dark:after:bg-white after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100">
                    Sale
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col gap-y-4">
              <span className="text-xs font-bold tracking-widest uppercase text-black dark:text-white">
                Support
              </span>
              <ul className="flex flex-col gap-3">
                <li>
                  <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-black dark:after:bg-white after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-black dark:after:bg-white after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100">
                    Shipping & Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-black dark:after:bg-white after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-black dark:after:bg-white after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100">
                    Size Guide
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-y-4">
              <span className="text-xs font-bold tracking-widest uppercase text-black dark:text-white">
                Connect
              </span>
              <ul className="flex flex-col gap-3">
                <li>
                  <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-black dark:after:bg-white after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-black dark:after:bg-white after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800 mt-16">
          <Text className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide">
            © {new Date().getFullYear()} VELOCITY SNEAKERS. ALL RIGHTS RESERVED.
          </Text>
          <div className="flex items-center gap-6 mt-4 md:mt-0 text-xs text-gray-500 dark:text-gray-400 font-medium">
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-black dark:after:bg-white after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100">Privacy Policy</a>
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-black dark:after:bg-white after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
