import { ResolvingMetadata, Metadata } from "next";

import notFound from "../not-found";
import { titleFont } from "@/config/fonts";

import {
  ProductMobileSlideshow,
  ProductSlideshow,
  QuantitySelector,
  SizeSelector,
  StockLabel
} from "@/components";

import { getProductBySlug } from "@/actions";

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
      // images: [], --> https://mysite.com/product/slug/image.jpg
      images: [`/products/${product?.images[1]}`],
    },
  }
}


export default async function ProductPage({ params }: Props) {
  const { slug } = params;
  const product = await getProductBySlug(slug)

  if (!product) {
    return null && notFound()
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

        <div className="flex flex-col mb-6">
          <h1 className={`${titleFont.className} text-2xl mb-4 font-bold`}>
            {product.title}
          </h1>

          <StockLabel slug={product.slug} />

          <span className="font-semibold text-lg">
            ${product.price}
          </span>
        </div>


        {/* Selector de Tallas */}
        <SizeSelector
          availableSizes={product.sizes!}
          selectedSize={product.sizes[0]!}
        />


        {/* Selector de cantidad */}
        <QuantitySelector
          quantity={3}
          className="mb-8"
        />


        {/* Button */}
        <button className="btn-primary mb-6">
          Agregar al carrito
        </button>


        {/* Descripción */}
        <h3 className="font-bold my-6">Descripción</h3>
        <p className="mb-28 md:mb-0">{product.description}</p>
      </div>

    </section>
  );
}