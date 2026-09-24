"use client"

import React, { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { XMark, Check } from "@medusajs/icons"

type ArQrModalProps = {
  isOpen: boolean
  onClose: () => void
  modelUrl: string
  productTitle: string
  qrUrl?: string
}

export default function ArQrModal({
  isOpen,
  onClose,
  modelUrl,
  productTitle,
  qrUrl,
}: ArQrModalProps) {
  const [mounted, setMounted] = useState(false)
  const [copied, setCopied] = useState(false)
  const [targetUrl, setTargetUrl] = useState("")

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (qrUrl) {
        setTargetUrl(qrUrl)
      } else {
        const url = new URL(window.location.href)
        url.searchParams.set("ar", "true")
        url.searchParams.set("model", modelUrl)
        setTargetUrl(url.toString())
      }
    }
  }, [qrUrl, modelUrl, isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      document.body.style.overflow = "hidden"
      document.addEventListener("keydown", handleKeyDown)
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen || !mounted) return null

  const handleCopyLink = () => {
    if (targetUrl) {
      navigator.clipboard.writeText(targetUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const encodedUrl = encodeURIComponent(targetUrl || "http://localhost:8000")
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodedUrl}`

  const modalContent = (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in">
      <div className="relative w-full max-w-md bg-[#121212] border border-gray-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl overflow-hidden flex flex-col items-center text-center">
        
        {/* Glow Effects */}
        <div className="absolute -top-20 -left-20 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2.5 rounded-full bg-gray-800/80 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors z-10"
        >
          <XMark className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center gap-2 mb-6">
          <span className="text-[11px] font-extrabold tracking-[0.2em] text-green-400 bg-green-950/60 border border-green-500/30 px-3.5 py-1 rounded-full uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Augmented Reality (AR)
          </span>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight uppercase mt-1">
            Experience in Your Room
          </h3>
          <p className="text-xs text-gray-400 max-w-xs font-medium leading-relaxed">
            Scan this QR Code with your phone camera to view <strong className="text-white font-bold">{productTitle}</strong> in 3D AR in your physical space.
          </p>
        </div>

        {/* QR Code Container */}
        <div className="relative p-4 bg-white rounded-2xl shadow-2xl border-4 border-white/10 group mb-6 transition-transform hover:scale-105">
          {targetUrl ? (
            <img
              src={qrImageUrl}
              alt="AR Mobile QR Code"
              className="w-[200px] h-[200px] object-contain rounded-lg"
            />
          ) : (
            <div className="w-[200px] h-[200px] flex items-center justify-center text-black font-semibold">
              Generating QR...
            </div>
          )}
        </div>

        {/* Step-by-Step Instructions */}
        <div className="w-full bg-gray-900/80 border border-gray-800 rounded-2xl p-4 text-left flex flex-col gap-2.5 mb-5 text-xs text-gray-300">
          <div className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-white/10 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
              1
            </span>
            <span>Open camera on your <strong>iPhone</strong> or <strong>Android</strong>.</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-white/10 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
              2
            </span>
            <span>Point camera at this QR code & tap the popup link.</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-white/10 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
              3
            </span>
            <span>Tap <strong>"View in Your Space"</strong> to project 3D sneaker in your room!</span>
          </div>
        </div>

        {/* Copy Link Button */}
        <button
          onClick={handleCopyLink}
          className="w-full py-3 px-4 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-bold uppercase tracking-wider text-gray-200 transition-colors flex items-center justify-center gap-2 border border-gray-700"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-400" />
              <span>Link Copied!</span>
            </>
          ) : (
            <>
              <span>🔗 Copy Mobile AR Link</span>
            </>
          )}
        </button>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}
