 
"use client"
import { EnrichedCart } from "@/types/cart";
import { CartProduct } from "@/types/product";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  allCarts: EnrichedCart[];
  cart: CartProduct[]
  addToCart: (product: CartProduct) => void
  setToAllCarts: (Cart: EnrichedCart) => void;
  updateQuantity: (id: number, quantity: number) => void
  removeItemFromCart: (id: number) => void
  checkout: (cart: EnrichedCart) => void
  getCartDetailById: (cartId: number) => EnrichedCart
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      allCarts: [],
      cart: [],
      addToCart: (product) => {
        const exists = get().cart.find(p => p.id === product.id)
        if(exists) {
          set({
            cart: get().cart.map((p) => {
              if(p.id ===  product.id) {
                return {
                  ...p,
                  quantity: p.quantity + product.quantity
                }
              } else {
                return p
              }
            })
          })
        } else {
          set({
            cart: [...get().cart, product]
          })
        }
      },
      setToAllCarts: (cart) => set((state) => ({ allCarts: [...state.allCarts, cart] })),
      getCartDetailById: (cartId) => {
        const carts = get().allCarts
        const selectedCart = carts.find(cart => cart.id === cartId) as EnrichedCart

        return selectedCart
      },
      updateQuantity: (id, quantity) => set(({
        cart: get().cart.map((item => {
          if(item.id === id) {
            return {
              ...item,
              quantity: quantity
            }
          } else {
            return item
          }
        }))
      })),
      removeItemFromCart: (id) => set({
        cart: get().cart.filter(item => item.id !== id)
      }),
      checkout: (cart) => {
        get().setToAllCarts(cart)
        set(({
          cart: []
        }))
      }
    }),
    {
      name: "cart-storage",
      partialize: ({ allCarts, cart }) => ({
        allCarts: allCarts,
        cart: cart
      }),
    }
  )
);