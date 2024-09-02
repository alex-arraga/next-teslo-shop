'use server'

export const paypalCheckPayment = async (transactionId: string) => {
  try {

    const authToken = await getPayPalBearerToken();
    console.log({ authToken })

    if (!authToken) {
      return {
        ok: false,
        message: 'No se pudo obtener el token'
      }
    }

  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: `No se pudo chequear el pago ${transactionId}`
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
    const result = await fetch(paypalOAuthURL, requestOptions).then(res => res.json())
    return result.access_token

  } catch (error) {
    console.log(error)
    return null
  }
}