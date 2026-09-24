"use client"

import React, { useState, useRef, useEffect } from "react"
import { MagnifyingGlass, XMark } from "@medusajs/icons"
import { useRouter } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const POPULAR_SEARCHES = ["Air Runner", "Velocity Pro", "Running", "Urban Motion", "Shoes"]

const CATALOG_ITEMS = [
  {
    id: "prod_air_runner",
    title: "Air Runner X",
    handle: "air-runner-x",
    category: "Running",
    price: "₹8,999.00",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=200",
    has3d: true,
  },
  {
    id: "prod_velocity_pro",
    title: "Velocity Pro",
    handle: "velocity-pro",
    category: "Performance",
    price: "₹11,999.00",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=200",
    has3d: true,
  },
  {
    id: "prod_urban_motion",
    title: "Urban Motion",
    handle: "urban-motion",
    category: "Lifestyle",
    price: "₹7,499.00",
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=200",
    has3d: true,
  },
  {
    id: "prod_court_classic",
    title: "Court Classic / Nike Jordan",
    handle: "court-classic",
    category: "Basketball",
    price: "₹9,499.00",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=200",
    has3d: true,
  },
]

export default function SearchButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 50)
    } else {
      setQuery("")
    }
  }, [isOpen])

  // Close on outside click or ESC
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick)
      document.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  const results = query.trim()
    ? CATALOG_ITEMS.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : []

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      setIsOpen(false)
      router.push(`/store?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <div ref={containerRef} className="flex items-center">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="hover:text-gray-500 transition-colors p-1 flex items-center gap-2"
          aria-label="Open search"
          title="Search sneakers"
        >
          <MagnifyingGlass className="w-5 h-5" />
        </button>
      ) : (
        /* Full Header Bar on Mobile, Inline Search Pill on Desktop */
        <div className="fixed inset-x-0 top-0 h-20 z-[100] bg-white dark:bg-black px-4 sm:px-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 shadow-md sm:relative sm:inset-auto sm:h-auto sm:bg-transparent sm:p-0 sm:border-0 sm:shadow-none">
          <form
            onSubmit={handleSubmit}
            className="flex flex-1 items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 sm:py-1.5 sm:w-64 md:w-80 transition-all duration-300 shadow-inner border border-gray-200 dark:border-gray-700 mr-2 sm:mr-0"
          >
            <MagnifyingGlass className="w-4 h-4 text-gray-400 shrink-0 mr-2" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search sneakers, 3D models..."
              className="w-full text-sm sm:text-xs font-medium text-black dark:text-white placeholder:text-gray-400 bg-transparent focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="p-1 text-gray-400 hover:text-black dark:hover:text-white"
              >
                <XMark className="w-4 h-4" />
              </button>
            )}
          </form>

          {/* Close button for full search bar */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white shrink-0 sm:hidden px-2 py-1"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="hidden sm:block p-1 ml-1 text-gray-400 hover:text-black dark:hover:text-white"
          >
            <XMark className="w-4 h-4" />
          </button>

          {/* Dropdown Menu - Full width below header on Mobile, Floating Dropdown on Desktop */}
          <div className="fixed inset-x-0 top-20 bg-white dark:bg-[#121212] border-b border-gray-200 dark:border-gray-800 shadow-2xl z-[100] overflow-hidden text-black dark:text-white max-h-[75vh] flex flex-col sm:absolute sm:top-full sm:right-0 sm:left-auto sm:w-80 sm:md:w-96 sm:rounded-2xl sm:border sm:mt-3">
            <div className="p-4 overflow-y-auto space-y-4 flex-1">
              {!query.trim() ? (
                <div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 block mb-2">
                    Popular Searches
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_SEARCHES.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setQuery(tag)}
                        className="px-3.5 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-xs font-semibold transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 block mb-3">
                    Results ({results.length})
                  </span>

                  {results.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-xs text-gray-500">
                        No sneakers found for &quot;{query}&quot;
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {results.map((item) => (
                        <LocalizedClientLink
                          key={item.id}
                          href={`/products/${item.handle}`}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-12 h-12 object-cover rounded-lg bg-gray-100 shrink-0"
                            />
                            <div>
                              <h5 className="text-xs sm:text-sm font-bold group-hover:underline">
                                {item.title}
                              </h5>
                              <span className="text-[10px] text-gray-400 uppercase tracking-wider block">
                                {item.category}
                              </span>
                            </div>
                          </div>
                          <span className="text-xs sm:text-sm font-mono font-bold">
                            {item.price}
                          </span>
                        </LocalizedClientLink>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {query.trim() && (
              <div className="p-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 text-center shrink-0">
                <button
                  onClick={handleSubmit}
                  className="text-xs font-bold uppercase tracking-wider text-black dark:text-white hover:underline"
                >
                  View all results &rarr;
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
