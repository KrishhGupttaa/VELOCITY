"use client"

import React, { useState } from "react"
import { Star } from "@medusajs/icons"

type Review = {
  id: string
  author: string
  rating: number
  date: string
  title: string
  comment: string
  verified: boolean
  helpfulCount: number
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: "rev_1",
    author: "Rahul V.",
    rating: 5,
    date: "2 days ago",
    title: "Best running shoes I've owned!",
    comment: "The cushioning and 3D mesh upper are insane. Very lightweight and perfect for long morning runs.",
    verified: true,
    helpfulCount: 14,
  },
  {
    id: "rev_2",
    author: "Aman S.",
    rating: 5,
    date: "1 week ago",
    title: "Sleek look and superior comfort",
    comment: "Fits true to size. Design looks even better in real life than in photos. Highly recommend!",
    verified: true,
    helpfulCount: 9,
  },
  {
    id: "rev_3",
    author: "Priya K.",
    rating: 4,
    date: "2 weeks ago",
    title: "Great quality & fast shipping",
    comment: "Delivered in 2 days. The sole grip is fantastic for gym workouts.",
    verified: true,
    helpfulCount: 5,
  },
]

export default function ProductReviews() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS)
  const [showForm, setShowForm] = useState(false)
  const [newRating, setNewRating] = useState(5)
  const [newTitle, setNewTitle] = useState("")
  const [newComment, setNewComment] = useState("")
  const [newAuthor, setNewAuthor] = useState("")

  const handleHelpful = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newAuthor || !newComment) return

    const newRev: Review = {
      id: `rev_${Date.now()}`,
      author: newAuthor,
      rating: newRating,
      date: "Just now",
      title: newTitle || "Verified Purchase Review",
      comment: newComment,
      verified: true,
      helpfulCount: 0,
    }

    setReviews([newRev, ...reviews])
    setShowForm(false)
    setNewTitle("")
    setNewComment("")
    setNewAuthor("")
  }

  const avgRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
  ).toFixed(1)

  return (
    <div className="mt-16 border-t border-gray-200 pt-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h2 className="text-2xl font-extrabold uppercase tracking-tight text-black dark:text-white">
            Customer Reviews & Ratings
          </h2>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center text-yellow-400">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-lg font-bold text-black dark:text-white">{avgRating} out of 5</span>
            <span className="text-xs text-gray-500 font-medium">({reviews.length} reviews)</span>
          </div>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-black hover:bg-gray-800 dark:bg-white dark:text-black text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md"
        >
          {showForm ? "Cancel Review" : "Write a Review"}
        </button>
      </div>

      {/* Review Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-10 bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 space-y-4 animate-fade-in">
          <h3 className="text-sm font-bold uppercase tracking-wider text-black dark:text-white">
            Share Your Experience
          </h3>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">Rating:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewRating(star)}
                  className={`text-xl ${star <= newRating ? "text-yellow-400" : "text-gray-300"}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Name *"
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              required
              className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-xs font-medium text-black dark:text-white focus:outline-none"
            />
            <input
              type="text"
              placeholder="Headline / Summary"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-xs font-medium text-black dark:text-white focus:outline-none"
            />
          </div>

          <textarea
            placeholder="Write your review here *"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-xs font-medium text-black dark:text-white focus:outline-none"
          />

          <button
            type="submit"
            className="bg-black text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors"
          >
            Submit Review
          </button>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800/80 transition-all hover:border-gray-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className={s <= rev.rating ? "text-yellow-400" : "text-gray-300"}>
                      ★
                    </span>
                  ))}
                </div>
                <h4 className="text-sm font-bold text-black dark:text-white">{rev.title}</h4>
              </div>
              <span className="text-xs text-gray-400 font-medium">{rev.date}</span>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-300 font-medium leading-relaxed mb-4">
              {rev.comment}
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-gray-200/60 dark:border-gray-800/60">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-black dark:text-white">{rev.author}</span>
                {rev.verified && (
                  <span className="text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Verified Buyer
                  </span>
                )}
              </div>

              <button
                onClick={() => handleHelpful(rev.id)}
                className="text-[11px] font-semibold text-gray-400 hover:text-black dark:hover:text-white flex items-center gap-1 transition-colors"
              >
                Helpful ({rev.helpfulCount})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
