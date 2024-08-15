export const revalidate = 3600 * 24 * 90 // revalidate every 3 months

import { Title } from "@/components";
import { AdressForm } from "./ui/AdressForm";
import { getCountries } from "@/actions";


export const metadata = {
  title: 'Checkout Address',
  description: 'Checkout Address',
};


export default async function CheckoutAddressPage() {

  const countries = await getCountries();

  return (
    <div className="flex flex-col sm:justify-start sm:items-center min-h-screen">
      <div className="w-full xl:w-[1000px] flex flex-col justify-center text-left">

        <Title
          title="Dirección"
          subtitle="Dirección de entrega"
        />

        {/* Form */}
        <AdressForm countries={countries} />

      </div>
    </div>
  );
}