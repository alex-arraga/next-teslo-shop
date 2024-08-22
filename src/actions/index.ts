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
export { getProductsByOrderId } from './order/get-products-by-order-id'
export { getAddressByOrderId } from './order/get-address-by-id'

// AC: I Don't export all (export *) cause generate conflicts