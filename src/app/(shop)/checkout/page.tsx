import Link from "next/link";

import { ProductsInCheckout, SummaryCheckoutOrder, Title } from "@/components";
import { IoChevronForward } from "react-icons/io5";

export const metadata = {
  title: 'Checkout',
  description: 'Checkout',
};


export default function CheckoutPage() {
  return (
    <section className="flex justify-center w-full min-h-screen">

      <div className="grid grid-cols-1 xl:grid-cols-2 xl:p-6 gap-6 xl:max-w-[calc(60vw)] h-fit">
        <div className="flex flex-col col-span-2 xl:col-span-1 rounded-md xl:p-6">
          <Title
            title="Productos"
          />

          <Link href='/cart' className="flex items-center gap-1 rounded-md mb-2 w-fit transform hover:translate-x-1 hover:text-blue-400 hover:font-semibold transition-all">
            <IoChevronForward size={15} />
            Editar carrito
          </Link>

          {/* Products in checkout */}
          <ProductsInCheckout />
        </div>

        {/* Summary */}
        <SummaryCheckoutOrder />
      </div>

    </section>
  );
}