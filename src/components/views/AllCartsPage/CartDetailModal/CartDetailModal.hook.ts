import { CartDetailModalProps } from "./CartDetailModal.types";

import { useCartStore } from "@/stores/useCartStore";











const useCartDetailModal = (props: CartDetailModalProps) => {
  const { id } = props;

  const { getCartDetailById } = useCartStore();

  const cartDetail = getCartDetailById(id as number);

  const totalPrice = cartDetail.products.reduce(
    (sum, product) => sum + product?.price * product.quantity,
    0
  );

  return {
    totalPrice,
    cartDetail,
  };
};

export default useCartDetailModal;
