'use server'

import prisma from '@/lib/prisma';
import { PayPalPayment, PayPalPaymentSchema } from '@/interfaces';

export const paypalCheckPayment = async (transactionId: string) => {
  // 1. Get auth token from paypal
  const authToken = await getPayPalBearerToken();

  if (!authToken) {
    return {
      ok: false,
      message: 'No se pudo obtener el token'
    }
  }

  // 2. Verify if payment exist
  const payment = await verifyPayPalPayment(transactionId, authToken)

  if (!payment) {
    return {
      ok: false,
      message: 'Error verificando el pago en PayPal'
    }
  }

  const { status, purchase_units } = payment;

  // 3. Check if payment has been made
  if (status !== "COMPLETED") {
    return {
      ok: false,
      message: 'Aún no se ha pagado en PayPal'
    }
  }

  try {
    // 4. Updated the order in db
    await prisma.order.update({
      where: { id: '9b232ab8-0cf8-48f8-99b6-ea2db0ceecf0' },
      data: {
        isPaid: true,
        paidAt: new Date()
      }
    })

    console.log('Orden pagada 💰')

  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: `500 - Error al actualizar el pago de la transacción: ${transactionId}`
    }
  }
}


const getPayPalBearerToken = async (): Promise<string | null> => {
  // .env
  const paypalOAuthURL = process.env.PAYPAL_OAUTH_URL ?? '';
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_KEY = process.env.PAYPAL_SECRET_KEY;

  // Generate encoded buffer
  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_KEY}`, 'utf-8'
  ).toString('base64');

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append(
    "Authorization",
    `Basic ${base64Token}`
  );

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };


  try {
    const result = await fetch(paypalOAuthURL, {
      ...requestOptions,
      cache: 'no-store'
    }).then(res => res.json())

    return result.access_token

  } catch (error) {
    console.log(error)
    return null
  }
}


const verifyPayPalPayment = async (transactionId: string, authToken: string): Promise<PayPalPayment | null> => {
  const paypalOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${transactionId}`;

  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Bearer ${authToken}`
  );

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    // Not save in cache
    const result: PayPalPayment = await fetch(paypalOrderUrl, {
      ...requestOptions,
      cache: 'no-store'
    }).then(res => res.json());

    const check = PayPalPaymentSchema.safeParse(result);

    if (!check.success) {
      throw new Error('PayPal: Ocurrio un error en la validación de Zod' + check.error);
    }

    return result

  } catch (error) {
    console.log(error)
    return null
  }

}