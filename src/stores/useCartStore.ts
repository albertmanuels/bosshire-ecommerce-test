 
"use client"
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Cart } from "@/services/useGetAllCarts";

export type CartProduct =  {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  description?: string; 
};

interface CartState {
  allCarts: Cart[];
  cart: CartProduct[]
  addToCart: (product: CartProduct) => void
  setToAllCarts: (Cart: Cart) => void;
  updateQuantity: (id: number, quantity: number) => void
  removeItemFromCart: (id: number) => void
  checkout: (cart: Cart) => void 
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