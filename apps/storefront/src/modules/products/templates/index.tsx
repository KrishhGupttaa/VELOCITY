import React, { Suspense } from "react"

import ProductActions from "@modules/products/components/product-actions"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import { getProduct3DModel } from "@lib/util/get-3d-model"
import AmazonProductGallery from "@modules/products/components/amazon-product-gallery"
import ProductReviews from "@modules/products/components/product-reviews"
import StickyMobileBar from "@modules/products/components/sticky-mobile-bar"
import { convertToLocale } from "@lib/util/money"

import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  const model3dUrl = getProduct3DModel(product)
  const cheapestVariant = product.variants?.[0]
  const formattedPrice = cheapestVariant?.calculated_price?.calculated_amount
    ? convertToLocale({
        amount: cheapestVariant.calculated_price.calculated_amount,
        currency_code: region.currency_code,
      })
    : ""

  return (
    <>
      <div
        className="max-w-[1440px] mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12 relative"
        data-testid="product-container"
      >
        {/* Left Side: Amazon-Style Media Gallery (Vertical Left Thumbnails + Center Main Viewer) */}
        <div className="w-full lg:w-3/5 relative">
          <div className="sticky top-28">
            <AmazonProductGallery
              images={images}
              model3dUrl={model3dUrl}
              productTitle={product.title}
            />
          </div>
        </div>

        {/* Right Side: Product Info and Actions */}
        <div className="w-full lg:w-2/5 flex flex-col gap-y-10 lg:pl-6">
          <ProductInfo product={product} />

          <div className="bg-white border-t border-gray-100 pt-8">
            <Suspense
              fallback={
                <ProductActions
                  disabled={true}
                  product={product}
                  region={region}
                />
              }
            >
              <ProductActionsWrapper id={product.id} region={region} />
            </Suspense>
          </div>

          <div className="mt-4">
            <ProductTabs product={product} />
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="max-w-[1440px] mx-auto px-6">
        <ProductReviews />
      </div>

      {/* Related Products */}
      <div
        className="max-w-[1440px] mx-auto px-6 my-24"
        data-testid="related-products-container"
      >
        <div className="border-t border-gray-200 pt-16">
          <h2 className="text-3xl font-extrabold tracking-tighter uppercase mb-12 text-center">
            You Might Also Like
          </h2>
          <Suspense fallback={<SkeletonRelatedProducts />}>
            <RelatedProducts product={product} countryCode={countryCode} />
          </Suspense>
        </div>
      </div>

      {/* Sticky Mobile Add-To-Cart Bar */}
      <StickyMobileBar
        title={product.title}
        price={formattedPrice}
        image={product.thumbnail || images[0]?.url || ""}
      />
    </>
  )
}

export default ProductTemplate
