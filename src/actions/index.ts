// ! AC: I Don't export all (export *) cause generate conflicts

// Products
export { getPaginatedProductWithImages } from './products/products-pagination';
export { getProductBySlug } from './products/get-product-by-slug';
export { getStockBySlug } from './products/get-stock-by-slug';

// Auth
export { authenticate, login } from './auth/login'
export { logout } from './auth/logout'
export { registerUser } from './auth/register'

// Users
export { getPaginatedUsers } from './users/get-paginated-users'
export { changeUserRole } from './users/change-user-role'

// Countries
export { getCountries } from './country/getCountries'

// Address
export { setUserAddress } from './address/set-user-address'
export { deleteUserAddress } from './address/delete-user-address'
export { getUserAddress } from './address/get-user-address'

// Orders
export { placeOrder } from './orders/place-order'
export { getOrderById } from './orders/get-order-by-id'
export { getAddressByOrderId } from './orders/get-address-by-id'
export { getOrdersBySessionUser } from './orders/get-orders-by-user'
export { getPaginatedOrders } from './orders/get-paginated-orders'

// Payment
export { setTransactionId } from './payments/set-transaction-id'
export { paypalCheckPayment } from './payments/paypal-check-payment'

// Categories
export { getCategories } from './categories/get-categories'