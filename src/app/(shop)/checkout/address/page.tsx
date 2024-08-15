import { Title } from "@/components";
import { AdressForm } from "./ui/AdressForm";


export const metadata = {
  title: 'Checkout Address',
  description: 'Checkout Address',
};


export default function CheckoutAddressPage() {
  return (
    <div className="flex flex-col sm:justify-start sm:items-center min-h-screen">
      <div className="w-full xl:w-[1000px] flex flex-col justify-center text-left">

        <Title
          title="Dirección"
          subtitle="Dirección de entrega"
        />

        {/* Form */}
        <AdressForm />

      </div>
    </div>
  );
}