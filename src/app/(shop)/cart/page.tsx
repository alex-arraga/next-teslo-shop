import Link from "next/link";
// import { redirect } from "next/navigation";

import { ProductsInCart, SummaryOrderCart, Title } from "@/components";
import { IoChevronForward } from "react-icons/io5";


export const metadata = {
  title: 'Cart',
  description: 'Cart',
};


export default function CartPage() {
  return (
    <section className="flex justify-center min-h-screen">
      <div className="grid grid-cols-1 w-full xl:grid-cols-2 xl:p-6 gap-4 md:gap-6 max-w-none xl:max-w-[calc(70vw)] h-fit">

        <div className="flex flex-col col-span-2 xl:col-span-1 rounded-md">
          <Title
            title="Shopping cart"
          />

          <Link href='/' className="flex items-center gap-1 rounded-md mb-2 w-fit transform hover:translate-x-1 hover:text-blue-400 hover:font-semibold transition-all">
            <IoChevronForward size={15} />
            Continue shopping
          </Link>

          <ProductsInCart />
        </div>

        {/* Checkout */}
        <div className="mb-28 xl:mb-0 col-span-2 xl:col-span-1 bg-white dark:bg-neutral-700 shadow-xl dark:shadow-neutral-950 rounded-md h-fit p-4 xl:p-6">
          <Title
            title="Cart summary"
          />

          <SummaryOrderCart />

          <Link
            replace
            href='/checkout/address'
            className="btn-primary mt-4"
          >
            Continue
          </Link>
        </div>

      </div>
    </section>
  );
}