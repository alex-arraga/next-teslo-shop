export const revalidate = 3600 * 24 * 90 // revalidate every 3 months

import { redirect } from "next/navigation";
import { Title } from "@/components";
import { AdressForm } from "./ui/AdressForm";

import { getCountries, getUserAddress } from "@/actions";
import { auth } from "@/auth.config";


export const metadata = {
  title: 'Checkout Address',
  description: 'Checkout Address',
};


export default async function CheckoutAddressPage() {
  const session = await auth()

  if (!session) {
    redirect('/auth/login')
  }

  const countries = await getCountries();
  const userAddress = await getUserAddress(session.user.id) ?? undefined;

  return (
    <div className="flex flex-col sm:justify-start sm:items-center min-h-screen">
      <div className="w-full xl:w-[1000px] flex flex-col justify-center text-left">

        <Title
          title="Dirección"
          subtitle="Dirección de entrega"
        />

        {/* Form */}
        <AdressForm countries={countries} userAddress={userAddress} />

      </div>
    </div>
  );
}