"use client"

import React, { useState, useEffect, useRef } from "react"
import { MagnifyingGlass, XMark } from "@medusajs/icons"
import { useRouter } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type SearchModalProps = {
  isOpen: boolean
  onClose: () => void
}

const POPULAR_SEARCHES = ["Air Runner", "Velocity Pro", "Running", "Urban Motion", "Shoes"]

// Mock product list for instant live search matching store catalog items
const CATALOG_ITEMS = [
  {
    id: "prod_air_runner",
    title: "Air Runner X",
    handle: "air-runner-x",
    category: "Running",
    price: "₹8,999.00",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=300",
    has3d: true,
  },
  {
    id: "prod_velocity_pro",
    title: "Velocity Pro",
    handle: "velocity-pro",
    category: "Performance",
    price: "₹11,999.00",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=300",
    has3d: true,
  },
  {
    id: "prod_urban_motion",
    title: "Urban Motion",
    handle: "urban-motion",
    category: "Lifestyle",
    price: "₹7,499.00",
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=300",
    has3d: true,
  },
  {
    id: "prod_court_classic",
    title: "Court Classic / Nike Jordan",
    handle: "court-classic",
    category: "Basketball",
    price: "₹9,499.00",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=300",
    has3d: true,
  },
]

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 50)
    } else {
      setQuery("")
    }
  }, [isOpen])

  // ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  // Filter items
  const results = query.trim()
    ? CATALOG_ITEMS.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : []

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onClose()
      router.push(`/store?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[80vh] transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative flex items-center p-6 border-b border-gray-100">
          <MagnifyingGlass className="w-6 h-6 text-gray-400 shrink-0 mr-4" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sneakers, categories, 3D models..."
            className="w-full text-lg font-medium text-black placeholder:text-gray-400 bg-transparent focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 text-gray-400 hover:text-black mr-2"
            >
              <XMark className="w-5 h-5" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-black transition-colors"
          >
            <XMark className="w-6 h-6" />
          </button>
        </form>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 flex-1 space-y-6">
          {/* Default view when query is empty */}
          {!query.trim() && (
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-gray-400 block mb-3">
                Popular Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-4 py-2 rounded-full bg-gray-100 hover:bg-black hover:text-white text-xs font-semibold text-gray-700 transition-all duration-200"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results list */}
          {query.trim() && (
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-gray-400 block mb-4">
                Products ({results.length})
              </span>

              {results.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-sm font-medium text-gray-500">
                    No sneakers found matching &quot;{query}&quot;.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {results.map((item) => (
                    <LocalizedClientLink
                      key={item.id}
                      href={`/products/${item.handle}`}
                      onClick={onClose}
                      className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-14 h-14 object-cover rounded-xl bg-gray-100 shrink-0"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-black group-hover:underline">
                            {item.title}
                          </h4>
                          <span className="text-xs text-gray-500 uppercase tracking-wider block">
                            {item.category} {item.has3d && "• 3D Ready"}
                          </span>
                        </div>
                      </div>
                      <span className="text-sm font-semibold font-mono text-black">
                        {item.price}
                      </span>
                    </LocalizedClientLink>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400 font-medium px-6">
          <span>Press ESC or click outside to close</span>
          {query.trim() && (
            <button
              onClick={handleSearchSubmit}
              className="text-black font-bold uppercase tracking-wider hover:underline"
            >
              View all results &rarr;
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
