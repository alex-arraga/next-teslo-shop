'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { Title } from "@/components";

import { currencyFormat } from '@/utils';
import { useAddressStore, useCartStore } from "@/store";


export const SummaryCheckoutOrder = () => {
  const [loading, setloading] = useState(false);

  // Store
  const userAddress = useAddressStore(state => state.address);
  const { subTotal, tax, total, totalItems } = useCartStore(state => state.getSummaryInformation());


  useEffect(() => {
    setloading(true)
  }, [])

  if (!loading) {
    return <p>Loading...</p>
  }


  return (
    <div className="mb-28 col-span-2 xl:col-span-1 bg-white rounded-md shadow-xl h-fit p-4 xl:p-6">

      <Title
        title="Orden de compra"
      />

      {/* Shipping address */}
      <h2 className="text-xl font-semibold text-gray-700 mb-6">Dirección de entrega</h2>
      <div className="grid grid-cols-2">
        <p>Cliente</p>
        <p className="text-right font-medium">
          {userAddress.firstName} {userAddress.lastName}
        </p>

        <p>Ciudad y país</p>
        <p className="text-right">
          {userAddress.city + ' - ' + userAddress.country}
        </p>

        {/* <p>Provincia / Estado</p>
        <p className="text-right">
          {userAddress.state}
        </p> */}

        <p>Codigo postal</p>
        <p className="text-right">
          {userAddress.postalCode}
        </p>
      </div>


      {/* Divisor */}
      <div className="rounded bg-gray-200 mt-6 h-0.5 w-full" />


      {/* Summary products */}
      <h2 className="text-xl font-semibold text-gray-700 my-6">Productos</h2>
      <div className="grid grid-cols-2">

        <span>N° Productos</span>
        <span className="text-right">
          {totalItems + ' artículos'}
        </span>

        <span>Subtotal</span>
        <span className="text-right">
          {
            currencyFormat({
              country: "United States",
              value: subTotal,
            })
          }
        </span>

        <span>Impuestos (15%)</span>
        <span className="text-right">
          {
            currencyFormat({
              country: "United States",
              value: tax,
            })
          }
        </span>

        <span className="mt-8 text-lg font-bold">Total</span>
        <span className="mt-8 text-lg font-bold text-right">
          {
            currencyFormat({
              country: "United States",
              value: total,
            })
          }
        </span>

      </div>

      {/* Terms and conditions */}
      <div className="flex flex-col mt-6">
        <span className="text-sm text-wrap">
          Al hacer click en "confirmar orden" acepta nuestros <a href="#" className="underline font-medium hover:text-blue-700 transition-all">terminos y condiciones</a> de uso y <a href="#" className="underline font-medium hover:text-blue-700 transition-all">politicas de privacidad</a>
        </span>


        <button className="w-full mt-4 btn-primary">
          <Link
            href='' // todo: redirigir a order
            className="text-center block"
          >
            Confirmar orden
          </Link>
        </button>
      </div>

    </div>
  )
}