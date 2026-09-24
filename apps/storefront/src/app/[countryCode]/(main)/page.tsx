import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import ValueProps from "@modules/home/components/value-props"
import CategoriesGrid from "@modules/home/components/categories-grid"
import FeatureShowcase from "@modules/home/components/feature-showcase"
import PromoBanner from "@modules/home/components/promo-banner"
import Newsletter from "@modules/home/components/newsletter"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Velocity Sneaker Store",
  description:
    "A premium sneaker e-commerce platform with 3D interactive product viewing.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  }).catch(() => ({ collections: [] }))

  if (!region) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Region not found for country code: {countryCode}</p>
      </div>
    )
  }

  return (
    <>
      <Hero />
      <ValueProps />
      <CategoriesGrid />
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections ?? []} region={region} />
        </ul>
      </div>
      <FeatureShowcase />
      <PromoBanner />
      <Newsletter />
    </>
  )
}
