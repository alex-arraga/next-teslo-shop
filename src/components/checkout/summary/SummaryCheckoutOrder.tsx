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
    <div className="mb-28 col-span-2 xl:col-span-1 bg-white dark:bg-neutral-700 shadow-xl dark:shadow-neutral-950 rounded-md h-fit p-4 xl:p-6">

      <Title
        title="Purchase order"
      />

      {/* Shipping address */}
      <h2 className="text-base sm:text-lg xl:text-xl font-semibold text-gray-700 dark:text-blue-100 mb-6">Shipping address</h2>
      <div className="grid grid-cols-2">
        <p className="text-sm md:text-base">Client</p>
        <p className="text-sm md:text-base text-right font-medium">
          {userAddress.firstName} {userAddress.lastName}
        </p>

        <p className="text-sm md:text-base">City and country</p>
        <p className="text-sm md:text-base text-right">
          {userAddress.city + ' - ' + userAddress.country}
        </p>

        {/* <p>Provincia / Estado</p>
        <p className="text-right">
          {userAddress.state}
        </p> */}

        <p className="text-sm md:text-base">Zip code</p>
        <p className="text-sm md:text-base text-right">
          {userAddress.postalCode}
        </p>
      </div>


      {/* Divisor */}
      <div className="rounded bg-gray-200 dark:bg-neutral-600 mt-6 h-0.5 w-full" />


      {/* Summary products */}
      <h2 className="text-base sm:text-lg xl:text-xl font-semibold text-gray-700 dark:text-blue-100 my-6">Products</h2>
      <div className="grid grid-cols-2">

        <span className="text-sm md:text-base">Number of items</span>
        <span className="text-right text-sm md:text-base">
          {totalItems === 1 ? '1 item' : totalItems + ' items'}
        </span>

        <span className="text-sm md:text-base">Subtotal</span>
        <span className="text-right text-sm md:text-base">
          {
            currencyFormat({
              country: "United States",
              value: subTotal,
            })
          }
        </span>

        <span className="text-sm md:text-base">Taxes (15%)</span>
        <span className="text-right text-sm md:text-base">
          {
            currencyFormat({
              country: "United States",
              value: tax,
            })
          }
        </span>

        <span className="mt-8 text-sm md:text-base font-bold">Total</span>
        <span className="mt-8 font-bold text-right text-sm md:text-base">
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
        <span className="text-xs sm:text-sm text-wrap">
          By clicking on <b>confirm order</b> you accept our <a href="#" className="underline font-medium hover:text-blue-700 transition-all">terms and conditions</a> of use and <a href="#" className="underline font-medium hover:text-blue-700 transition-all">privacy policy</a>
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
              "mt-4 sm:mt-0 text-center w-full",
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
                  <p>Confirming order...</p>
                </div>
              ) : (
                <>
                  Confirm order
                </>
              )
            }
          </button>
        </div>
      </div>

    </div>
  )
}