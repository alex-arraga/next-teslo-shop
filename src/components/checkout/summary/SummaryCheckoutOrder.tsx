'use client'

import { useEffect, useState } from "react";
import { Title } from "@/components";
import { useRouter } from "next/navigation";
import clsx from "clsx";

import { currencyFormat } from '@/utils';
import { useAddressStore, useCartStore } from "@/store";
import { placeOrder } from "@/actions";


export const SummaryCheckoutOrder = () => {
  const router = useRouter();
  
  const [loading, setloading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [sendingOrder, setSendingOrder] = useState(false);

  // Store
  const cart = useCartStore(state => state.cart);
  const cleanCart = useCartStore(state => state.cleanCart);
  const userAddress = useAddressStore(state => state.address);
  const { subTotal, tax, total, totalItems } = useCartStore(state => state.getSummaryInformation());


  useEffect(() => {
    setloading(true)
  }, [])

  if (!loading) {
    return <p>Loading...</p>
  }


  const onSendingOrder = async () => {
    setSendingOrder(true)

    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size
    }))

    //! Server Action to place Order
    const res = await placeOrder(productsToOrder, userAddress)

    if (!res.ok) {
      setSendingOrder(false)
      setErrorMessage(res.message)
      return;
    }

    setSendingOrder(false);
    cleanCart();

    router.replace('/orders/' + res.order?.id)
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


        <span className={clsx({
          "error-msg": errorMessage,
          "hidden": !errorMessage
        })}>
          {errorMessage}
        </span>


        <div className="w-full mt-4">
          <button
            onClick={onSendingOrder}
            disabled={sendingOrder}
            className={clsx(
              "text-center w-full",
              {
                "btn-primary": !sendingOrder,
                "btn-disabled": sendingOrder
              }
            )}
          >
            {
              sendingOrder ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="loader" />
                  <p>Confirmando orden...</p>
                </div>
              ) : (
                <>
                  Confirmar order
                </>
              )
            }
          </button>
        </div>
      </div>

    </div>
  )
}