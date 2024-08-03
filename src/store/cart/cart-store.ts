import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface CartState {
  cart: CartProduct[],

  addProductToCart: (product: CartProduct) => void,
  getTotalItems: () => number,
  // updateProductQuantity: () => {}
  // removeProduct: () => {}
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
      }

    })
    , {
      name: 'shopping-cart'
    }
  )


)