"use client"

import React from "react"
import { Heart } from "@medusajs/icons"
import { useWishlist, WishlistItem } from "@lib/context/wishlist-context"

export default function WishlistButton({ item }: { item: WishlistItem }) {
  const { isInWishlist, toggleWishlist } = useWishlist()
  const isSaved = isInWishlist(item.id)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(item)
  }

  return (
    <button
      onClick={handleClick}
      title={isSaved ? "Remove from wishlist" : "Add to wishlist"}
      className={`absolute top-4 right-4 z-20 p-2 rounded-full backdrop-blur-sm transition-all duration-300 shadow-sm ${
        isSaved
          ? "bg-red-500 text-white opacity-100 scale-100"
          : "bg-white/80 opacity-0 group-hover:opacity-100 hover:bg-black hover:text-white hover:scale-110"
      }`}
    >
      <Heart className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
    </button>
  )
}
