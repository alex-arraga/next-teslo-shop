import { ResolvingMetadata, Metadata } from "next";

import notFound from "../not-found";
import { titleFont } from "@/config/fonts";

import {
  ProductMobileSlideshow,
  ProductSlideshow,
  StockLabel
} from "@/components";

import { getProductBySlug } from "@/actions";
import { AddProduct } from "./ui/AddProduct";

interface Props {
  params: {
    slug: string
  }
}


export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug

  // fetch data
  const product = await getProductBySlug(slug)

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.title,
    description: product?.description,
    openGraph: {
      title: product?.title,
      description: product?.description,
      images: [`/products/${product?.images[1]}`], // -- > https://mysite.com/product/slug/image.jpg
    },
  }
}


export default async function ProductPage({ params }: Props) {
  const { slug } = params;
  const product = await getProductBySlug(slug)

  if (!product) {
    return notFound()
  }


  return (
    <section className="md:mx-10 grid grid-cols-1 md:grid-cols-4 gap-2 w-full">

      <div className="col-span-1 md:col-span-2 md:rounded-xl">
        {/* Mobile Slideshow */}
        <ProductMobileSlideshow
          images={product.images!}
          title={product.title!}
          className="block md:hidden"
        />

        {/* Desktop Slideshow */}
        <ProductSlideshow
          images={product.images!}
          title={product.title!}
          className="hidden md:block"
        />
      </div>


      {/* Product details */}
      <div className="md:mx-10 md:col-span-2 rounded">

        <div className="flex flex-col mb-2">
          {/* Title */}
          <h1 className={`${titleFont.className} text-2xl mb-4 font-bold`}>
            {product.title}
          </h1>

          {/* Gender */}
          <p className="mb-4 text-gray-800 dark:text-gray-400">
            Gender: <span className="capitalize font-bold text-gray-800 dark:text-gray-200">{product.gender}</span>
          </p>

          {/* Descripción */}
          <p className="text-sm md:text-base mb-6">{product.description}</p>

          {/* Price */}
          <p className="bg-neutral-200 dark:bg-neutral-700 p-2 w-fit rounded mb-4 font-semibold text-xl">
            ${product.price.toFixed(2)} <span className="text-gray-400 font-normal text-base">each</span>
          </p>

          {/* Stock allowed */}
          <StockLabel slug={product.slug} />
        </div>

        <div className="mb-28 md:mb-0">
          <AddProduct product={product} />
        </div>
      </div>

    </section>
  );
}