import { notFound } from "next/navigation";
import { ResolvingMetadata, Metadata } from "next";

import { Title } from "@/components";
import { OrderedProducts } from "./ui/OrderedProducts";

import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";

import { getProductsByOrderId, getOrderById } from "@/actions";

interface Props {
  params: {
    id: string;
  }
}


export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const orderId = params.id

  // fetch data
  // const product = await getProductBySlug(slug)

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: `Order #${orderId}`,
    description: `Order #${orderId}`,
    openGraph: {
      title: `Order #${orderId}`,
      description: `Order #${orderId}`,
      // images: [`/products/${product?.images[1]}`],
    },
  }
}


export default async function OrdersByIdPage({ params }: Props) {
  const { id } = params;

  // Verify if the order exist
  const hasOrder = await getOrderById(id);

  if (!hasOrder) {
    notFound();
  }

  const { products } = await getProductsByOrderId(id)

  if (!products) {
    notFound()
  }

  return (
    <section className="flex justify-center w-full min-h-screen">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:max-w-[calc(60vw)]">
        <div className="flex flex-col col-span-2 xl:col-span-1 rounded-md xl:p-6">
          <Title
            title={`Order #${id.split('-').at(-4)}`}
          />

          {/* Products */}
          {products.map((product) => (
            <OrderedProducts products={products} key={product.slug} />
          ))}
        </div>

        {/* Order details */}
        <div className="mb-28 xl:mb-0 col-span-2 xl:col-span-1 bg-white rounded-md shadow-xl h-fit p-4 xl:p-6">
          <Title
            title="Detalles"
          />

          {/* Shipping address */}
          <h2 className="text-xl font-semibold text-gray-700 mb-6">Dirección de entrega</h2>
          <div className="grid grid-cols-2">
            <p>Cliente</p>
            <p className="text-right font-medium">Alex Arraga</p>

            <p>Ciudad</p>
            <p className="text-right">Reconquista</p>

            <p>Provincia / Estado</p>
            <p className="text-right">Santa Fe</p>

            <p>Codigo postal</p>
            <p className="text-right">S3560</p>

            <p>País</p>
            <p className="text-right">Argentina</p>
          </div>


          {/* Divisor */}
          <div className="rounded bg-gray-200 mt-6 h-0.5 w-full" />


          {/* Summary products */}
          <h2 className="text-xl font-semibold text-gray-700 my-6">Productos</h2>
          <div className="grid grid-cols-2">
            <span>N° Productos</span>
            <span className="text-right">3 articulos</span>

            <span>Subtotal</span>
            <span className="text-right">$100</span>

            <span>Impuestos (15%)</span>
            <span className="text-right">$15</span>

            <span className="mt-8 text-lg font-bold">Total</span>
            <span className="mt-8 text-lg font-bold text-right">$115</span>
          </div>

          {/* Details */}
          <div className="flex flex-col mt-6">

            {/* Pay: paid or pending */}
            <div className={
              clsx(
                "flex items-center py-2 px-3.5 text-sm font-medium text-white w-full rounded-lg",
                {
                  "bg-red-600": true,
                  // "bg-green-600": true
                }
              )
            }>
              <IoCardOutline size={25} />
              <p className="mx-2">Pendiente de pago</p>
              {/* <p className="mx-2">Pagada</p> */}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}