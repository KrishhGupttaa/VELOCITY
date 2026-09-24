"use client"

import React, { useState } from "react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
    }
  }

  return (
    <section className="bg-gray-100 border-t border-gray-200 py-20">
      <div className="max-w-[1440px] mx-auto px-6 text-center max-w-2xl">
        <span className="text-xs font-bold tracking-[0.25em] text-gray-500 uppercase">
          JOIN THE CLUB
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter uppercase text-black mt-2">
          GET 15% OFF YOUR FIRST DROP
        </h2>
        <p className="text-sm text-gray-600 font-medium mt-3 leading-relaxed">
          Subscribe to Velocity Insider for early access to limited edition sneaker drops, 3D releases, and exclusive member discounts.
        </p>

        {subscribed ? (
          <div className="mt-8 p-4 bg-black text-white rounded-xl text-sm font-bold tracking-wider uppercase animate-fade-in">
            ✓ Welcome to the Velocity Club! Check your inbox for your 15% discount code.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="flex-1 px-5 py-4 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-black bg-white text-black"
            />
            <button
              type="submit"
              className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-full font-bold text-xs tracking-widest uppercase transition-all duration-300 hover:scale-105 shrink-0"
            >
              SUBSCRIBE
            </button>
          </form>
        )}
        <p className="text-[10px] text-gray-400 font-medium mt-4">
          By subscribing, you agree to our Privacy Policy and Terms of Service. Unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}
