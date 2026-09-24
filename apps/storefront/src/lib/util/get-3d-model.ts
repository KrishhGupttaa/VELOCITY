import { HttpTypes } from "@medusajs/types"

/**
 * Normalizes GLB URLs by converting backend static URLs to storefront proxy paths (/static/...)
 * and resolving double/triple URL encodings (%252520 -> %20)
 */
export function normalizeGlbUrl(rawUrl: string): string {
  if (!rawUrl) return "/models/shoes/Nike Shoe V2.glb"
  try {
    let url = rawUrl

    // Proxy backend http://localhost:9000/static/ through storefront /static/ to bypass CORS
    if (url.includes("http://localhost:9000/static/")) {
      url = url.replace("http://localhost:9000/static/", "/static/")
    }

    let decoded = url
    // Recursively decode if double/triple encoded
    while (decoded.includes("%25")) {
      decoded = decodeURIComponent(decoded)
    }
    if (decoded.includes("%")) {
      decoded = decodeURIComponent(decoded)
    }
    return encodeURI(decoded)
  } catch (e) {
    return rawUrl
  }
}

/**
 * Dynamically resolves the 3D GLB model URL for a Medusa product.
 * Supports direct Medusa Admin PC File Uploads, Metadata URLs, and fallback mappings.
 */
export function getProduct3DModel(product: HttpTypes.StoreProduct): string | null {
  if (!product) return null

  // 1. Direct PC Upload via Medusa Admin Media Gallery (.glb / .gltf uploaded directly from computer)
  if (product.images && product.images.length > 0) {
    const glbMedia = product.images.find(
      (img) =>
        img.url?.toLowerCase().includes(".glb") ||
        img.url?.toLowerCase().includes(".gltf")
    )
    if (glbMedia?.url) {
      return normalizeGlbUrl(glbMedia.url)
    }
  }

  // 2. Medusa Admin Metadata Check (model_3d, model_url, glb_url, glb)
  const metaUrl =
    product.metadata?.model_3d ||
    product.metadata?.model_url ||
    product.metadata?.glb_url ||
    product.metadata?.glb

  if (typeof metaUrl === "string" && metaUrl.trim() !== "") {
    return normalizeGlbUrl(metaUrl.trim())
  }

  // 3. Fallback handle mapping for storefront demo products
  const handleMap: Record<string, string> = {
    "air-runner-x": "/models/shoes/Nike Shoe V2.glb",
    "velocity-pro": "/models/shoes/Air Jordan 4 Bred 2024.glb",
    "urban-motion": "/models/shoes/Air Jordan 1 High Lost .glb",
    "court-classic": "/models/shoes/Air Jordan 1 Reverse Mocha (Right Shoe).glb",
    "air-jordan-1": "/models/shoes/Air Jordan 1 High Lost .glb",
    "air-jordan-4": "/models/shoes/Air Jordan 4 Bred 2024.glb",
    "reverse-mocha": "/models/shoes/Air Jordan 1 Reverse Mocha (Right Shoe).glb",
    "nike-v2": "/models/shoes/Nike Shoe V2.glb",
  }

  if (product.handle && handleMap[product.handle]) {
    return normalizeGlbUrl(handleMap[product.handle])
  }

  // 4. Fallback title-based fuzzy matching
  const title = (product.title || "").toLowerCase()

  if (title.includes("mocha") || title.includes("reverse") || title.includes("court") || title.includes("jordan")) {
    return "/models/shoes/Air Jordan 1 Reverse Mocha (Right Shoe).glb"
  }
  if (title.includes("bred") || title.includes("velocity") || title.includes("4")) {
    return "/models/shoes/Air Jordan 4 Bred 2024.glb"
  }
  if (title.includes("urban") || title.includes("lost") || title.includes("high")) {
    return "/models/shoes/Air Jordan 1 High Lost .glb"
  }
  if (title.includes("runner") || title.includes("nike") || title.includes("air")) {
    return "/models/shoes/Nike Shoe V2.glb"
  }

  return "/models/shoes/Nike Shoe V2.glb"
}
