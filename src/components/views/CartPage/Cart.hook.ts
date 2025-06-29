"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { pathname } from "@/constants/navigation";
import { ADMIN } from "@/constants/user";
import getEnrichedCart from "@/helpers/getEnrichedCarts";
import { getNextCartId } from "@/helpers/global";
import usePostNewCart from "@/services/usePostNewCart";
import { useCartStore } from "@/stores/useCartStore";

const useCart = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [currentViewProductId, setCurrentViewProductId] = useState<
    number | null
  >(null);

  const { cart, updateQuantity, removeItemFromCart, allCarts, checkout } =
    useCartStore();

  const totalPrice = useCartStore((state) =>
    state.cart.reduce(
      (sum, product) => sum + (product?.price ?? 0) * (product.quantity ?? 0),
      0
    )
  ).toFixed(2);

  const { mutate, isPending } = usePostNewCart({
    onSuccess: (data) => {
      const payload = {
        ...data,
        id: getNextCartId(allCarts),
      };

      const enriched = getEnrichedCart(payload, cart);
      checkout(enriched);
      toast.success("Checkout is successful!");
      router.push(pathname.DASHBOARD);
    },
    onError: (error) => {
      toast.error("Checkout failed!");
      console.error(error);
    },
  });

  const handleOnCheckout = () => {
    mutate({
      id: getNextCartId(allCarts),
      userId: ADMIN.id,
      date: new Date().toISOString(),
      products: cart.map((product) => ({
        productId: product.id,
        quantity: product.quantity,
      })),
    });
  };

  return {
    open,
    setOpen,
    cart,
    mutate,
    isPending,
    updateQuantity,
    removeItemFromCart,
    handleOnCheckout,
    currentViewProductId,
    setCurrentViewProductId,
    totalPrice,
  };
};

export default useCart;
