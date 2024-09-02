'use client'

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { CreateOrderData, CreateOrderActions } from "@paypal/paypal-js"
import { setTransactionId } from "@/actions"


interface Props {
  maxWith?: boolean,
  orderId: string,
  amount: number
}


export const PayPalButton = ({ amount, orderId, maxWith = true }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmount = Math.round(amount * 100) / 100;

  if (isPending) {
    return (
      <div className="flex flex-col items-center gap-4 animate-pulse transition-all">
        <div className="bg-gray-200 w-full h-12 rounded" />
        <div className="bg-gray-200 w-full h-12 rounded" />
        <div className="bg-gray-200 w-32 h-4 rounded" />
      </div>
    )
  }


  const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
    const transactionId = await actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          invoice_id: orderId, // -> A unique number that identifies a transaction made with PayPal
          amount: {
            currency_code: "USD",
            value: roundedAmount.toString()
          }
        }
      ]
    });

    console.log({ transactionId })

    const { ok, message } = await setTransactionId(transactionId, orderId)

    if (!ok) {
      throw new Error(message)
    }

    return transactionId
  }


  return (
    <PayPalButtons
      createOrder={createOrder}

      style={{
        color: "blue",
        height: 45,
        disableMaxWidth: maxWith,
      }}
    />
  )
}