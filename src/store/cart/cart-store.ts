import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface CartState {
  cart: CartProduct[],

  getTotalItems: () => number,
  getSummaryInformation: () => {
    totalItems: number;
    subTotal: number;
    tax: number;
    total: number;
  }

  addProductToCart: (product: CartProduct) => void,
  updateProductQuantity: (product: CartProduct, quantity: number) => void,
  removeProduct: (product: CartProduct) => void,
  cleanCart: () => void
}


export const useCartStore = create<CartState>()(

  // Sincroniza nuestro cart (store) en el localStorage...
  persist(
    (set, get) => ({

      cart: [],

      // Methods
      addProductToCart: (product: CartProduct) => {
        const { cart } = get();

        // 1. Revisar si el producto existe en el carrito con la talla seleccionada
        const productInCart = cart.some(
          (item) => (item.id === product.id && item.size === product.size)
        )

        if (!productInCart) {
          set({ cart: [...cart, product] })
          return;
        }

        // 2. El producto existe por talla... Hay que incrementarlo
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity }
          }

          return item;
        })

        set({ cart: updatedCartProducts })
      },



      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },



      getSummaryInformation: () => {
        const { cart } = get()

        const totalItems = cart.reduce((total, item) =>
          total + item.quantity, 0);

        const subTotal = cart.reduce((subTotal, product) =>
          (product.quantity * product.price) + subTotal, 0);

        const tax = subTotal * 0.15;
        const total = tax + subTotal;

        return {
          totalItems,
          subTotal,
          tax,
          total
        }
      },



      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get()

        const productWithNewQuantity = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: quantity }
          }

          return item
        })

        set({ cart: productWithNewQuantity })
      },



      removeProduct: (product: CartProduct) => {
        const { cart } = get()

        // Mantener en 'cart' todos los productos cuyo id y size no coincidan con el enviado en la función
        const updateCart = cart.filter(item => !(item.id === product.id && item.size === product.size));

        set({ cart: updateCart })
      },


      cleanCart: () => {
        set({ cart: [] })
      }


    })
    , {
      name: 'shopping-cart'
    }
  )


)