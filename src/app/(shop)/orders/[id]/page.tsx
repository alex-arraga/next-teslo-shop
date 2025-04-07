import { redirect } from "next/navigation";
import { ResolvingMetadata, Metadata } from "next";

import { Title, PayPalButton, PaymentStatus } from "@/components";
import { OrderedProducts } from "./ui/OrderedProducts";

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

        <div className="flex flex-col col-span-2 xl:col-span-1 bg-white dark:bg-neutral-700 h-fit rounded-md p-4 sm:p-6">
          <Title
            title={`Order #${id.split('-').at(0)?.slice(0, -3)}`}
          />

          {/* Products in order */}
          <OrderedProducts orderItem={OrderItem} />

        </div>

        {/* Order details */}
        <div className="mb-28 xl:mb-0 col-span-2 xl:col-span-1 bg-white dark:bg-neutral-700 rounded-md shadow-xl h-fit p-4 sm:p-6">
          <Title
            title="Detalles"
            className="mt-0"
          />

          {/* Shipping address */}
          <h2 className="text-base sm:text-lg xl:text-xl font-semibold text-gray-700 dark:text-blue-100 mb-6">Dirección de entrega</h2>
          <div className="grid grid-cols-2">

            <p className="text-sm md:text-base">Cliente</p>
            <p className="text-right font-me text-sm md:text-basedium">
              {OrderAddress!.firstName} {OrderAddress!.lastName}
            </p>

            <p className="text-sm md:text-base">Ciudad</p>
            <p className="text-right text-sm md:text-base">
              {OrderAddress!.city}
            </p>

            {/* <p>Provincia / Estado</p>
            <p className="text-right">Santa Fe</p> */}

            <p className="text-sm md:text-base">Codigo postal</p>
            <p className="text-right text-sm md:text-base">
              {OrderAddress!.postalCode}
            </p>

            <p className="text-sm md:text-base">País</p>
            <p className="text-right text-sm md:text-base">
              {OrderAddress!.country.name} - {OrderAddress!.countryId}
            </p>

          </div>


          {/* Divisor */}
          <div className="rounded bg-gray-200 dark:bg-neutral-600 mt-6 h-0.5 w-full" />


          {/* Summary products */}
          <h2 className="text-base sm:text-lg xl:text-xl font-semibold text-gray-700 dark:text-blue-100 my-6">Productos</h2>
          <div className="grid grid-cols-2">

            <span className="text-sm md:text-base">N° Productos</span>
            <span className="text-right text-sm md:text-base">
              {order!.itemsInOrder} artículos
            </span>

            <span className="text-sm md:text-base">Subtotal</span>
            <span className="text-right text-sm md:text-base">
              {
                currencyFormat({
                  value: order!.subTotal,
                  country: "United States"
                })
              }
            </span>

            <span className="text-sm md:text-base">Impuestos (15%)</span>
            <span className="text-right text-sm md:text-base">
              {
                currencyFormat({
                  value: order!.tax,
                  country: "United States"
                })
              }
            </span>

            <span className="mt-8 font-bold text-sm md:text-base">Total</span>
            <span className="mt-8 font-bold text-right text-sm md:text-base">
              {
                currencyFormat({
                  value: order!.total,
                  country: "United States"
                })
              }
            </span>
          </div>

          {/* Paypal btn and Payment status */}
          <div className="mt-6">
            {
              order!.isPaid === false ? (
                <>
                  <div className="mb-6">
                    <PaymentStatus
                      withBg
                      paid={order!.isPaid}
                    />

                    {/* Divisor */}
                    <div className="w-full h-0.5 rounded bg-gray-200 dark:bg-neutral-600 mt-6" />
                  </div>

                  <PayPalButton
                    orderId={order!.id}
                    amount={order!.total}
                  />
                </>
              )

                : (
                  <PaymentStatus
                    withBg
                    paid={order!.isPaid}
                  />
                )
            }
          </div>
        </div>

      </div>
    </section>
  );
}