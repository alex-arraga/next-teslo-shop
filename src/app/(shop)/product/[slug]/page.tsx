import { initialData } from "@/seed/seed";
import notFound from "../not-found";
import { titleFont } from "@/config/fonts";
import { QuantitySelector, SizeSelector } from "@/components";

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
    <section className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full">

      {/* Slideshow */}
      <div className="col-span-1 md:col-span-2 bg-gray-300">
        Slideshow
      </div>

      {/* Product details */}
      <div className="md:col-span-1 p-4 rounded">
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
        />

        {/* Button */}
        <button className="btn-primary mb-6">
          Agregar al carrito
        </button>



        {/* Descripción */}
        <h3 className="font-bold my-6">Descripción</h3>
        <p>{product?.description}</p>
      </div>
    </section>
  );
}