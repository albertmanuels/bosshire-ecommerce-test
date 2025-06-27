 
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Cart } from "@/services/useGetAllCarts";

interface CartState {
  allCarts: Cart[];
  setAllCarts: (allCarts: Cart[]) => void;
  newCart: Cart | null;
  addCart: (cart:Cart) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      allCarts: [],
      newCart: null,
      addCart: (cart: Cart) => set(state => ({allCarts: [...state.allCarts, cart]})),
      setAllCarts: (allCarts: Cart[]) => set({ allCarts }),
    }),
    {
      name: "cart-storage",
      partialize: ({ allCarts }) => ({
        allCarts: allCarts,
      }),
    }
  )
);