"use client"

import React, { useState } from "react"
import CategoryPills from "../category-pills"
import MobileFilterDrawer from "../mobile-filter-drawer"
import RefinementList from "../refinement-list"
import { SortOptions } from "../refinement-list/sort-products"

type Props = {
  sortBy: SortOptions
  children: React.ReactNode
}

export default function StoreTemplateContainer({ sortBy, children }: Props) {
  const [showFilters, setShowFilters] = useState(true)

  return (
    <div className="bg-white min-h-screen">
      {/* Top Announcement Banner */}
      <div className="bg-gray-100 border-b border-gray-200 py-2.5 px-4 text-center">
        <p className="text-xs font-semibold tracking-wide text-gray-700">
          Enjoy Express Global Shipping & 30-Day Easy Returns on all Sneakers.
        </p>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Title Section */}
        <div className="mb-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tighter uppercase text-black" data-testid="store-page-title">
            ALL SNEAKERS
          </h1>
        </div>

        {/* Horizontal Category Scroll Pills */}
        <CategoryPills />

        {/* Sub-bar: Results Title & Filter Toggle Buttons */}
        <div className="py-4 my-2 flex items-center justify-between border-b border-gray-200">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
            Sneakers Lineup
          </span>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Drawer Button */}
            <div className="lg:hidden">
              <MobileFilterDrawer sortBy={sortBy} />
            </div>

            {/* Desktop Hide/Show Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="hidden lg:flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider text-black hover:bg-gray-100 transition-colors shadow-sm"
            >
              <span>{showFilters ? "Hide Filters" : "Show Filters"}</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 18H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 12h11.25" />
              </svg>
            </button>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-8 mt-6 transition-all duration-500 ease-in-out" data-testid="category-container">
          {/* Desktop Togglable Sidebar with Smooth Slide/Fade */}
          <div
            className={`hidden lg:block flex-shrink-0 transition-all duration-500 ease-in-out overflow-hidden ${
              showFilters
                ? "w-64 opacity-100 translate-x-0"
                : "w-0 opacity-0 -translate-x-4 pointer-events-none"
            }`}
          >
            <div className="w-64 sticky top-28 bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <RefinementList sortBy={sortBy} />
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1 w-full transition-all duration-500 ease-in-out">
            {children}
          </div>
        </div>

      </div>
    </div>
  )
}
