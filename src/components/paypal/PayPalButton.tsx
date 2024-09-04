'use client'

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions } from "@paypal/paypal-js"
import { setTransactionId, paypalCheckPayment } from "@/actions"


interface Props {
  maxWidth?: boolean,
  orderId: string,
  amount: number
}


export const PayPalButton = ({ amount, orderId, maxWidth = true }: Props) => {
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
          invoice_id: orderId, // -> A unique number that identifies our order with transaction made with PayPal
          amount: {
            currency_code: "USD",
            value: roundedAmount.toString()
          }
        }
      ]
    });

    const { ok, message } = await setTransactionId(transactionId, orderId)

    if (!ok) {
      throw new Error(message)
    }

    return transactionId
  }


  const onApproved = async (data: OnApproveData, actions: OnApproveActions): Promise<void> => {

    const details = await actions.order?.capture();
    if (!details?.id) return;

    await paypalCheckPayment(details.id)
  }

  return (
    <PayPalButtons
      createOrder={createOrder}
      onApprove={onApproved}

      style={{
        color: "blue",
        height: 45,
        disableMaxWidth: maxWidth,
      }}
    />
  )
}