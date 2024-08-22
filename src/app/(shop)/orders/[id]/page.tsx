import { redirect } from "next/navigation";
import { ResolvingMetadata, Metadata } from "next";

import { Title } from "@/components";
import { OrderedProducts } from "./ui/OrderedProducts";

import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";

import { currencyFormat } from "@/utils";
import { getOrderById } from "@/actions";

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
    title: `Order #${orderId.split('-').at(0)?.slice(0, -3)}`,
    description: `Order #${orderId.split('-').at(0)?.slice(0, -3)}`,
    openGraph: {
      title: `Order #${orderId.split('-').at(0)?.slice(0, -3)}`,
      description: `Order #${orderId.split('-').at(0)?.slice(0, -3)}`,
      // images: [`/products/${product?.images[1]}`],
    },
  }
}


export default async function OrdersByIdPage({ params }: Props) {
  const { id } = params;

  // Verify if the order exist
  const { order, ok } = await getOrderById(id);

  if (!ok) {
    redirect('/');
  }

  const { OrderAddress, OrderItem } = order!;

  return (
    <section className="flex justify-center w-full min-h-screen">
      <div className="grid grid-cols-1 w-full sm:max-w-[calc(90vw)] xl:grid-cols-2 gap-6 xl:max-w-[calc(60vw)]">

        <div className="flex flex-col col-span-2 xl:col-span-1 bg-white h-fit rounded-md p-4 sm:p-6">
          <Title
            title={`Order #${id.split('-').at(0)?.slice(0, -3)}`}
          />

          {/* Products in order */}
          <OrderedProducts orderItem={OrderItem} />

        </div>

        {/* Order details */}
        <div className="mb-28 xl:mb-0 col-span-2 xl:col-span-1 bg-white rounded-md shadow-xl h-fit p-4 sm:p-6">
          <Title
            title="Detalles"
            className="mt-0"
          />

          {/* Shipping address */}
          <h2 className="text-xl font-semibold text-gray-700 mb-6">Dirección de entrega</h2>
          <div className="grid grid-cols-2">

            <p>Cliente</p>
            <p className="text-right font-medium">
              {OrderAddress!.firstName} {OrderAddress!.lastName}
            </p>

            <p>Ciudad</p>
            <p className="text-right">
              {OrderAddress!.city}
            </p>

            {/* <p>Provincia / Estado</p>
            <p className="text-right">Santa Fe</p> */}

            <p>Codigo postal</p>
            <p className="text-right">
              {OrderAddress!.postalCode}
            </p>

            <p>País</p>
            <p className="text-right">
              {OrderAddress!.countryId}
            </p>

          </div>


          {/* Divisor */}
          <div className="rounded bg-gray-200 mt-6 h-0.5 w-full" />


          {/* Summary products */}
          <h2 className="text-xl font-semibold text-gray-700 my-6">Productos</h2>
          <div className="grid grid-cols-2">

            <span>N° Productos</span>
            <span className="text-right">
              {order!.itemsInOrder} artículos
            </span>

            <span>Subtotal</span>
            <span className="text-right">
              {
                currencyFormat({
                  value: order!.subTotal,
                  country: "United States"
                })
              }
            </span>

            <span>Impuestos (15%)</span>
            <span className="text-right">
              {
                currencyFormat({
                  value: order!.tax,
                  country: "United States"
                })
              }
            </span>

            <span className="mt-8 text-lg font-bold">Total</span>
            <span className="mt-8 text-lg font-bold text-right">
              {
                currencyFormat({
                  value: order!.total,
                  country: "United States"
                })
              }
            </span>

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