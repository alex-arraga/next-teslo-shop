import { z } from "zod"

export const PayPalPaymentSchema = z.object({
  id: z.string(),
  intent: z.string(),
  status: z.string(),
  payment_source: z.object({
    paypal: z.object({
      email_address: z.string(),
      account_id: z.string(),
      account_status: z.string(),
      name: z.object({ given_name: z.string(), surname: z.string() }),
      address: z.object({ country_code: z.string() })
    })
  }),
  purchase_units: z.array(
    z.object({
      reference_id: z.string(),
      amount: z.object({ currency_code: z.string(), value: z.string() }),
      payee: z.object({ email_address: z.string(), merchant_id: z.string() }),
      invoice_id: z.string(),
      shipping: z.object({
        name: z.object({ full_name: z.string() }),
        address: z.object({
          address_line_1: z.string(),
          admin_area_2: z.string(),
          admin_area_1: z.string(),
          postal_code: z.string(),
          country_code: z.string()
        })
      }),
      payments: z.object({
        captures: z.array(
          z.object({
            id: z.string(),
            status: z.string(),
            amount: z.object({ currency_code: z.string(), value: z.string() }),
            final_capture: z.boolean(),
            seller_protection: z.object({
              status: z.string(),
              dispute_categories: z.array(z.string())
            }),
            seller_receivable_breakdown: z.object({
              gross_amount: z.object({
                currency_code: z.string(),
                value: z.string()
              }),
              paypal_fee: z.object({
                currency_code: z.string(),
                value: z.string()
              }),
              net_amount: z.object({
                currency_code: z.string(),
                value: z.string()
              })
            }),
            invoice_id: z.string(),
            links: z.array(
              z.object({
                href: z.string(),
                rel: z.string(),
                method: z.string()
              })
            ),
            create_time: z.string(),
            update_time: z.string()
          })
        )
      })
    })
  ),
  payer: z.object({
    name: z.object({ given_name: z.string(), surname: z.string() }),
    email_address: z.string(),
    payer_id: z.string(),
    address: z.object({ country_code: z.string() })
  }),
  create_time: z.string(),
  update_time: z.string(),
  links: z.array(
    z.object({ href: z.string(), rel: z.string(), method: z.string() })
  )
})

export type PayPalPayment = z.infer<typeof PayPalPaymentSchema>;