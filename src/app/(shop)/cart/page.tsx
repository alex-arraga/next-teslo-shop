import Link from "next/link";
// import { redirect } from "next/navigation";

import { ProductsInCart, SummaryOrderCart, Title } from "@/components";
import { IoChevronForward } from "react-icons/io5";


export const metadata = {
  title: 'Cart',
  description: 'Cart',
};


export default function CartPage() {
  // todo: redirect to empty if the user hasn't any product
  // redirect('/empty')


  return (
    <section className="flex justify-center w-full min-h-screen">

      <div className="grid grid-cols-1 xl:grid-cols-2 xl:p-6 gap-6 xl:max-w-[calc(60vw)] h-fit">

        <div className="flex flex-col col-span-2 xl:col-span-1 rounded-md">
          <Title
            title="Carrito de compra"
          />

          <Link href='/' className="flex items-center gap-1 rounded-md mb-2 w-fit transform hover:translate-x-1 hover:text-blue-400 hover:font-semibold transition-all">
            <IoChevronForward size={15} />
            Seguir comprando
          </Link>

          <ProductsInCart />
        </div>

        {/* Checkout */}
        <div className="mb-28 xl:mb-0 col-span-2 xl:col-span-1 bg-white rounded-md shadow-xl h-fit p-4 xl:p-6">
          <Title
            title="Resumen"
          />

          <SummaryOrderCart />

          <button className="w-full mt-4 btn-primary">
            <Link href='/checkout/address' className="text-center block">
              Continuar
            </Link>
          </button>
        </div>

      </div>

    </section>
  );
}