import { Title } from "@/components";
import Link from "next/link";

export default function CheckoutAddressPage() {
  return (
    <div className="flex flex-col sm:justify-start sm:items-center min-h-screen">
      <div className="w-full xl:w-[1000px] flex flex-col justify-center text-left">

        <Title
          title="Dirección"
          subtitle="Dirección de entrega"
        />

        {/* Form */}
        <form className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2">

          <div className="flex flex-col mb-2">
            <label>Nombres</label>
            <input
              type="text"
              className="p-2 border rounded-md bg-gray-200"
            />
          </div>

          <div className="flex flex-col mb-2">
            <label>Apellidos</label>
            <input
              type="text"
              className="p-2 border rounded-md bg-gray-200"
            />
          </div>

          <div className="flex flex-col mb-2">
            <label>Dirección</label>
            <input
              type="text"
              className="p-2 border rounded-md bg-gray-200"
            />
          </div>

          <div className="flex flex-col mb-2">
            <label>Dirección 2 (opcional)</label>
            <input
              type="text"
              className="p-2 border rounded-md bg-gray-200"
            />
          </div>

          <div className="flex flex-col mb-2">
            <label>Código postal</label>
            <input
              type="text"
              className="p-2 border rounded-md bg-gray-200"
            />
          </div>

          <div className="flex flex-col mb-2">
            <label>Ciudad</label>
            <input
              type="text"
              className="p-2 border rounded-md bg-gray-200"
            />
          </div>

          <div className="flex flex-col mb-2">
            <label>País</label>
            <select
              className="p-2 border rounded-md bg-gray-200 cursor-pointer"
            >
              <option value="">[ Seleccione ]</option>
              <option value="ARG">Argentina</option>
              <option value="BRZ">Brasil</option>
              <option value="CRI">Costa Rica</option>
            </select>
          </div>

          <div className="flex flex-col mb-2">
            <label>Teléfono</label>
            <input
              type="text"
              className="p-2 border rounded-md bg-gray-200"
            />
          </div>


          {/* Button checkout */}
          <div className="flex flex-col mt-4 sm:mt-10">
            <Link
              href='/checkout'
              className="btn-primary flex w-full sm:w-1/2 justify-center ">
              Siguiente
            </Link>
          </div>
          
        </form>

      </div>
    </div>
  );
}