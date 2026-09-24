import { Text } from "@modules/common/components/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import PreviewPrice from "./price"
import Image from "next/image"
import WishlistButton from "./wishlist-button"

export default async function ProductPreview({
  product,
  region: _region,
}: {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  // Check if it's new
  const isNew = true 

  const initialImage = product.thumbnail || product.images?.[0]?.url

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group block w-full h-full">
      <div 
        data-testid="product-wrapper"
        className="relative bg-white border border-gray-100 rounded-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 h-full flex flex-col"
      >
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {isNew && (
            <span className="bg-black text-white text-[10px] font-bold tracking-wider px-2 py-1 uppercase rounded-sm shadow-sm">
              New
            </span>
          )}
        </div>

        {/* Interactive Wishlist Button */}
        <WishlistButton
          item={{
            id: product.id,
            title: product.title,
            handle: product.handle,
            thumbnail: initialImage,
            price: cheapestPrice?.calculated_price,
            collection: product.collection?.title || "Velocity",
          }}
        />

        {/* Image Container with subtle zoom */}
        <div className="w-full aspect-square bg-[#F5F5F5] overflow-hidden relative">
          <div className="w-full h-full transition-transform duration-700 group-hover:scale-105">
            {initialImage ? (
              <Image
                src={initialImage}
                alt={product.title}
                className="absolute inset-0 object-cover object-center w-full h-full"
                draggable={false}
                quality={80}
                sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
                fill
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <span className="text-gray-400">No image</span>
              </div>
            )}
          </div>

          {/* 3D Model indicator if available */}
          {product.metadata?.model_3d && (
            <div className="absolute bottom-3 left-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="bg-black/80 backdrop-blur-md text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                3D Viewer
              </span>
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div className="flex flex-col flex-1 p-6 bg-white z-20">
          <Text className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
            {product.collection?.title || "Velocity"}
          </Text>
          <div className="flex justify-between items-start mt-1 gap-2">
            <Text className="text-base font-semibold text-black leading-tight" data-testid="product-title">
              {product.title}
            </Text>
            <div className="flex items-center text-sm font-medium">
              {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
            </div>
          </div>
          
          <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
            <span className="text-xs font-semibold uppercase tracking-widest underline underline-offset-4 cursor-pointer hover:text-gray-600">
              View Details
            </span>
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
