'use client'

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"


interface Props {
  maxWith?: boolean
}


export const PayPalButton = ({ maxWith = true }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();

  if (isPending) {
    return (
      <div className="flex flex-col items-center gap-4 animate-pulse transition-all">
        <div className="bg-gray-200 w-full h-12 rounded" />
        <div className="bg-gray-200 w-full h-12 rounded" />
        <div className="bg-gray-200 w-32 h-4 rounded" />
      </div>
    )
  }

  return (
    <PayPalButtons
      style={{
        color: "blue",
        height: 45,
        disableMaxWidth: maxWith,
      }}
    />
  )
}