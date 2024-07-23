import { initialData } from "@/seed/seed";
import notFound from "../not-found";
import { titleFont } from "@/config/fonts";
import { ProductMobileSlideshow, ProductSlideshow, QuantitySelector, SizeSelector } from "@/components";

interface Props {
  params: {
    slug: string
  }
}


export default function ProductPage({ params }: Props) {
  const { slug } = params;
  const product = initialData.products.find(product => product.slug === slug)

  if (!product) {
    notFound()
  }


  return (
    <section className="md:mx-10 grid grid-cols-1 md:grid-cols-4 gap-2 w-full">
      
      <div className="col-span-1 md:col-span-2 md:rounded-xl">
        {/* Mobile Slideshow */}
        <ProductMobileSlideshow
          images={product?.images!}
          title={product?.title!}
          className="block md:hidden"
        />


        {/* Desktop Slideshow */}
        <ProductSlideshow
          images={product?.images!}
          title={product?.title!}
          className="hidden md:block"
        />
      </div>

      {/* Product details */}
      <div className="md:mx-10 md:col-span-2 rounded">
        <div className="flex flex-col mb-6">
          <h1 className={`${titleFont.className} text-2xl font-bold`}>{product?.title}</h1>
          <span className="font-semibold text-lg">${product?.price}</span>
        </div>


        {/* Selector de Tallas */}
        <SizeSelector
          availableSizes={product?.sizes!}
          selectedSize={product?.sizes[0]!}
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
        <p className="mb-28 md:mb-0">{product?.description}</p>
      </div>
    </section>
  );
}