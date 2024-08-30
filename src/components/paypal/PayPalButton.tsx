'use client'

import { PayPalButtons } from "@paypal/react-paypal-js"


interface Props {
  maxWith?: boolean
}


export const PayPalButton = ({ maxWith = true }: Props) => {
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