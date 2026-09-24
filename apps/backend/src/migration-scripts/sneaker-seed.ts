import { MedusaContainer } from "@medusajs/framework";
import {
  ContainerRegistrationKeys,
  ProductStatus,
} from "@medusajs/framework/utils";
import {
  createProductCategoriesWorkflow,
  createProductOptionsWorkflow,
  createProductsWorkflow,
} from "@medusajs/medusa/core-flows";

export default async function sneaker_seed({
  container,
}: {
  container: MedusaContainer;
}) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);

  logger.info("Seeding sneaker product data...");

  // Get default sales channel to assign products
  const { data: salesChannels } = await query.graph({
    entity: "sales_channel",
    fields: ["id"],
    filters: {
      name: "Default Sales Channel",
    },
  });

  const defaultSalesChannel = salesChannels[0];

  if (!defaultSalesChannel) {
    logger.error("Default sales channel not found. Please run initial seed first.");
    return;
  }

  // Get shipping profile
  const { data: shippingProfileResult } = await query.graph({
    entity: "shipping_profile",
    fields: ["id"],
  });
  
  const shippingProfile = shippingProfileResult[0];

  if (!shippingProfile) {
    logger.error("Shipping profile not found. Please run initial seed first.");
    return;
  }

  // Create Shoes category
  const { result: categoryResult } = await createProductCategoriesWorkflow(container).run({
    input: {
      product_categories: [
        {
          name: "Shoes",
          is_active: true,
        },
      ],
    },
  });

  const shoesCategory = categoryResult[0];

  // Create Size option
  const { result: productOptionsResult } = await createProductOptionsWorkflow(container).run({
    input: {
      product_options: [
        {
          title: "Shoe Size",
          values: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
        },
      ],
    },
  });
  
  const sizeOption = productOptionsResult[0];

  const createVariants = (skuPrefix: string, basePriceInr: number) => {
    const sizes = ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"];
    return sizes.map((size) => ({
      title: size,
      sku: `${skuPrefix}-${size.replace(" ", "")}`,
      options: {
        "Shoe Size": size,
      },
      prices: [
        {
          amount: basePriceInr,
          currency_code: "inr",
        },
        {
          amount: Math.round(basePriceInr / 80), // approx USD
          currency_code: "usd",
        },
        {
          amount: Math.round(basePriceInr / 90), // approx EUR
          currency_code: "eur",
        }
      ],
    }));
  };

  const shoesData = [
    {
      title: "Air Runner X",
      description: "Engineered to move. Performance, comfort and design built for every step.",
      skuPrefix: "ARX",
      price: 8999,
      model_3d: "/models/shoes/air-runner.glb",
      images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"],
    },
    {
      title: "Velocity Pro",
      description: "Speed meets style. The ultimate lightweight running shoe.",
      skuPrefix: "VP",
      price: 11999,
      model_3d: "/models/shoes/velocity-pro.glb",
      images: ["https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"],
    },
    {
      title: "Urban Motion",
      description: "Street ready comfort with a modern silhouette.",
      skuPrefix: "UM",
      price: 7499,
      model_3d: "/models/shoes/urban-motion.glb",
      images: ["https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"],
    },
    {
      title: "Court Classic",
      description: "Timeless design updated with modern materials.",
      skuPrefix: "CC",
      price: 6999,
      images: ["https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"],
    }
  ];

  const productsInput = shoesData.map((shoe) => ({
    title: shoe.title,
    category_ids: [shoesCategory.id],
    description: shoe.description,
    handle: shoe.title.toLowerCase().replace(/ /g, "-"),
    weight: 800,
    status: ProductStatus.PUBLISHED,
    shipping_profile_id: shippingProfile.id,
    images: shoe.images.map(url => ({ url })),
    options: [
      { id: sizeOption.id },
    ],
    variants: createVariants(shoe.skuPrefix, shoe.price),
    sales_channels: [
      {
        id: defaultSalesChannel.id,
      },
    ],
    metadata: shoe.model_3d ? { model_3d: shoe.model_3d } : undefined
  }));

  await createProductsWorkflow(container).run({
    input: {
      products: productsInput,
    },
  });

  logger.info("Finished seeding sneaker products.");
}
