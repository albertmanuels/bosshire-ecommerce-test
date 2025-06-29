"use client";
import { useState } from "react";
import { useCartStore } from "@/stores/useCartStore";
import usePostNewCart from "@/services/usePostNewCart";
import { ADMIN } from "@/constants/user";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getNextCartId } from "@/helpers/global";
import getEnrichedCart from "@/helpers/getEnrichedCarts";

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
      router.push("/");
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
