"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@modules/common/components/ui"

type StickyMobileBarProps = {
  title: string
  price: string
  image: string
  onAddToCart?: () => void
}

export default function StickyMobileBar({
  title,
  price,
  image,
  onAddToCart,
}: StickyMobileBarProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleAction = () => {
    if (onAddToCart) {
      onAddToCart()
    } else {
      window.scrollTo({ top: 300, behavior: "smooth" })
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 inset-x-0 z-[90] sm:hidden bg-white/95 dark:bg-black/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 p-3 px-4 shadow-2xl flex items-center justify-between animate-slide-in-bottom">
      <div className="flex items-center gap-3">
        {image && (
          <img
            src={image}
            alt={title}
            className="w-11 h-11 object-cover rounded-lg bg-gray-100 shrink-0"
          />
        )}
        <div className="overflow-hidden">
          <h4 className="text-xs font-bold text-black dark:text-white truncate max-w-[140px]">
            {title}
          </h4>
          <span className="text-xs font-mono font-bold text-gray-900 dark:text-gray-100 block">
            {price}
          </span>
        </div>
      </div>

      <Button
        onClick={handleAction}
        className="bg-black hover:bg-gray-800 text-white rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-transform active:scale-95 shadow-md"
      >
        Add to Cart
      </Button>
    </div>
  )
}
