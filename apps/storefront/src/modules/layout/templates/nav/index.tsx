import { Suspense } from "react"

import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listRegions } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import { User, Heart } from "@medusajs/icons"
import SearchButton from "@modules/layout/components/search-button"

export default async function Nav() {
  const [regions, locales, currentLocale, customer] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
    retrieveCustomer().catch(() => null),
  ])

  const userName = customer?.first_name || customer?.email?.split("@")[0]

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-20 mx-auto border-b duration-200 bg-white/90 dark:bg-black/90 backdrop-blur-md border-transparent hover:bg-white dark:hover:bg-black border-ui-border-base transition-colors">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular px-4 sm:px-6">
          
          {/* Logo (Left) */}
          <div className="flex items-center">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus hover:text-gray-500 transition-colors uppercase font-extrabold tracking-wider sm:tracking-widest text-black dark:text-white shrink-0 whitespace-nowrap text-lg sm:text-xl"
              data-testid="nav-store-link"
            >
              VELOCITY
            </LocalizedClientLink>
          </div>

          {/* Desktop Center Links */}
          <div className="hidden small:flex items-center h-full gap-x-8">
            {["Men", "Women", "New Arrivals", "Best Sellers", "Sale"].map((item) => (
              <LocalizedClientLink
                key={item}
                href={`/store?category=${item.toLowerCase().replace(" ", "-")}`}
                className="hover:text-black dark:hover:text-white transition-colors font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide text-xs relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-[-2px] after:left-0 after:bg-black dark:after:bg-white after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {item}
              </LocalizedClientLink>
            ))}
          </div>

          {/* Right Icons: Search, Cart, Account, Hamburger */}
          <div className="flex items-center gap-x-3 sm:gap-x-5 h-full justify-end">
            <SearchButton />

            {/* Desktop Account & Wishlist */}
            <div className="hidden small:flex items-center gap-x-5 text-black dark:text-white">
              <LocalizedClientLink
                className="flex items-center gap-1.5 hover:text-gray-500 transition-colors"
                href="/account"
                data-testid="nav-account-link"
              >
                <User />
                {customer && (
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    Hi, {userName}
                  </span>
                )}
              </LocalizedClientLink>

              <LocalizedClientLink
                className="hover:text-gray-500 transition-colors"
                href="/wishlist"
              >
                <Heart />
              </LocalizedClientLink>
            </div>

            {/* Cart Button */}
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-gray-500 transition-colors flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Cart (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>

            {/* Mobile Hamburger Side Menu */}
            <div className="h-full flex items-center small:hidden">
              <SideMenu customer={customer} regions={regions} locales={locales} currentLocale={currentLocale} />
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
