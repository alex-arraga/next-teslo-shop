import Link from "next/link"
import { Title } from "@/components/ui/title/Title"


export const SummaryCheckoutOrder = () => {
  return (
    <div className="mb-28 col-span-2 xl:col-span-1 bg-white rounded-md shadow-xl h-fit p-4 xl:p-6">

      <Title
        title="Orden de compra"
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

      {/* Terms and conditions */}
      <div className="flex flex-col mt-6">
        <span className="text-sm text-wrap">
          Al hacer click en "confirmar orden" acepta nuestros <a href="#" className="underline font-medium hover:text-blue-700 transition-all">terminos y condiciones</a> de uso y <a href="#" className="underline font-medium hover:text-blue-700 transition-all">politicas de privacidad</a>
        </span>


        <button className="w-full mt-4 btn-primary">
          <Link href='/orders/123' className="text-center block">
            Confirmar orden
          </Link>
        </button>
      </div>

    </div>
  )
}