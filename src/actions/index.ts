// Products
export * from './products/products-pagination';
export { getProductBySlug } from './products/get-product-by-slug';
export { getStockBySlug } from './products/get-stock-by-slug';

// Auth
export {authenticate, login} from './auth/login'
export { logout } from './auth/logout'
export { registerUser } from './auth/register'

// AC: I Don't export all (export *) cause generate conflicts