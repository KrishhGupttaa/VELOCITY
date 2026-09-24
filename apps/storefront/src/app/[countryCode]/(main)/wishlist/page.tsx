"use client"

import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useWishlist } from "@lib/context/wishlist-context"
import { Trash, ShoppingBag, Heart } from "@medusajs/icons"

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist()

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 pb-6 border-b border-gray-200 gap-4">
        <div>
          <span className="text-xs font-bold tracking-[0.25em] text-gray-500 uppercase">
            Your Collection
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter uppercase text-black mt-1">
            SAVED SNEAKERS ({wishlist.length})
          </h1>
        </div>

        {wishlist.length > 0 && (
          <button
            onClick={clearWishlist}
            className="text-xs font-bold tracking-widest uppercase text-gray-500 hover:text-red-600 transition-colors flex items-center gap-1.5"
          >
            <Trash className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      {/* Empty State */}
      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-24 bg-gray-50 rounded-3xl border border-gray-200">
          <div className="p-6 bg-white rounded-full shadow-sm mb-6 text-gray-400">
            <Heart className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight uppercase text-black mb-2">
            YOUR WISHLIST IS EMPTY
          </h2>
          <p className="text-sm text-gray-500 max-w-md font-medium mb-8">
            You haven&apos;t saved any sneakers yet. Browse our catalog and tap the heart icon on any pair to save them here for later.
          </p>
          <LocalizedClientLink
            href="/store"
            className="bg-black hover:bg-gray-800 text-white font-bold text-xs tracking-widest uppercase px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-md"
          >
            EXPLORE SNEAKERS
          </LocalizedClientLink>
        </div>
      ) : (
        /* Wishlist Items Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Product Thumbnail */}
              <div className="relative aspect-square bg-gray-50 overflow-hidden">
                {item.thumbnail ? (
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                    No Image
                  </div>
                )}
                
                {/* Remove Button */}
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  title="Remove from wishlist"
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-red-500 hover:text-white backdrop-blur-sm text-gray-700 shadow-sm transition-all duration-200"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>

              {/* Product Details */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
                    {item.collection || "Velocity"}
                  </span>
                  <h3 className="text-lg font-bold text-black leading-snug">
                    {item.title}
                  </h3>
                  {item.price && (
                    <span className="text-sm font-semibold text-gray-900 block mt-2 font-mono">
                      {item.price}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-3">
                  <LocalizedClientLink
                    href={`/products/${item.handle}`}
                    className="flex-1 bg-black hover:bg-gray-800 text-white font-bold text-xs tracking-widest uppercase py-3 rounded-xl text-center flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02]"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    VIEW ITEM
                  </LocalizedClientLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
