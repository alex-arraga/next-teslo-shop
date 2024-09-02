// Products
export { getPaginatedProductWithImages } from './products/products-pagination';
export { getProductBySlug } from './products/get-product-by-slug';
export { getStockBySlug } from './products/get-stock-by-slug';

// Auth
export { authenticate, login } from './auth/login'
export { logout } from './auth/logout'
export { registerUser } from './auth/register'

// Countries
export { getCountries } from './country/getCountries'

// Address
export { setUserAddress } from './address/set-user-address'
export { deleteUserAddress } from './address/delete-user-address'
export { getUserAddress } from './address/get-user-address'

// Order
export { placeOrder } from './order/place-order'
export { getOrderById } from './order/get-order-by-id'
export { getAddressByOrderId } from './order/get-address-by-id'
export { getOrdersBySessionUser } from './order/get-orders-by-user'

// Payment
export { setTransactionId } from './payments/set-transaction-id'
export { paypalCheckPayment } from './payments/paypal-check-payment'

// AC: I Don't export all (export *) cause generate conflicts