import { useState } from "react";

import useGetAllProducts from "@/services/useGetAllProducts";

const useDashboard = () => {
  const { data: products, isLoading } = useGetAllProducts();
  const [open, setOpen] = useState(false);
  const [currentViewProductId, setCurrentViewProductId] = useState(null);

  const tableData =
    products?.map((product) => ({
      ...product,
      category: product.category,
      image: product.image,
      title: product.title,
      id: product.id,
      price: product.price,
    })) || [];

  return {
    tableData,
    isLoading,
    open,
    setOpen,
    currentViewProductId,
    setCurrentViewProductId,
  };
};

export default useDashboard;
