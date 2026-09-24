"use client"

import React from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"

const categories = [
  { label: "All Sneakers", value: "" },
  { label: "Running", value: "running" },
  { label: "Lifestyle", value: "lifestyle" },
  { label: "Basketball", value: "basketball" },
  { label: "Outdoor", value: "outdoor" },
  { label: "Limited Edition", value: "limited" },
]

export default function CategoryPills() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const currentCategory = searchParams.get("category") || ""

  const handleSelect = (val: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (val) {
      params.set("category", val)
    } else {
      params.delete("category")
    }
    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname)
  }

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-3 border-b border-gray-100">
      <div className="flex items-center gap-2.5 min-w-max px-1">
        {categories.map((cat) => {
          const isActive = currentCategory === cat.value
          return (
            <button
              key={cat.value}
              onClick={() => handleSelect(cat.value)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                isActive
                  ? "bg-black text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-black"
              }`}
            >
              {cat.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
