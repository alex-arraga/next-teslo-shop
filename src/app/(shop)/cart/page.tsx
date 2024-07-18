import { ProductsInCart, QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Link from "next/link";


const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]


export default function () {
  return (
    <section className="flex justify-center w-full">
      <div className="grid grid-cols-1 xl:grid-cols-2 p-4 xl:p-6 gap-6">
        <div className="flex flex-col col-span-2 xl:col-span-1 rounded-md xl:p-6">
          <Title
            title="Carrito de compra"
            subtitle="Añadir mas productos"
          />

          <Link href='/shop' className="p-2 w-fit bg-gray-200 rounded-md mb-2 hover:bg-blue-200 hover:font-semibold transition-all">
            Seguir comprando
          </Link>

          {/* Products in cart */}
          {productsInCart.map((product) => (
            <ProductsInCart
              key={product.slug}
              product={product}
            />
          ))}
        </div>

        {/* Checkout */}
        <div className="mb-10 xl:mb-0 col-span-2 xl:col-span-1 bg-white rounded-md shadow-xl h-fit p-4 xl:p-6">
          <Title
            title="Resumen de orden"
          />

          <div className="grid grid-cols-2">
            <span>N° Productos</span>
            <span className="text-right">3 articulos</span>

            <span>Subtotal</span>
            <span className="text-right">$100</span>

            <span>Impuestos (15%)</span>
            <span className="text-right">$15</span>

            <span className="mt-5 text-lg font-bold">Total</span>
            <span className="mt-5 text-lg font-bold text-right">$115</span>

          </div>

          <button className="w-full mt-4 btn-primary">
            <Link href='/checkout/address' className="text-center">
              Confirmar compra
            </Link>
          </button>
        </div>

      </div>
    </section>
  );
}