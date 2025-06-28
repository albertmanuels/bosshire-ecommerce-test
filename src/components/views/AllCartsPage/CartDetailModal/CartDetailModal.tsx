"use client";
import Modal from "@/components/shared/Modal";
import React, { useMemo } from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import useGetProductDetailQueries from "@/services/useGetProductDetailQueries";
import { Cart } from "@/services/useGetAllCarts";
import Table from "@/components/shared/Table";
import { Product } from "@/services/useGetAllProducts";
import { TableHeader } from "@/components/shared/Table/Table";
import { Visibility } from "@mui/icons-material";
import { useCartStore } from "@/stores/useCartStore";

type CartDetailModalProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  id: number | null;
};

const CartDetailModal = (props: CartDetailModalProps) => {
  const { open, setOpen, id } = props;
  const { allCarts } = useCartStore();

  const cartDetail = useMemo(
    () => allCarts.find((cart) => cart.id === id),
    [allCarts, id]
  );

  const productDetailsQueries = useGetProductDetailQueries({
    cart: cartDetail as Cart,
  });

  const products = productDetailsQueries.map((item) => {
    const res = item.data as Product;
    return res;
  });

  const isLoadingProduct = productDetailsQueries.some((prod) => prod.isLoading);
  const isLoading = isLoadingProduct;

  const tableHeader: TableHeader[] = [
    {
      key: "image",
      type: "image",
      label: "Image",
      align: "left",
      sx: {
        width: "10%",
      },
    },
    {
      key: "id",
      label: "Product ID",
    },
    {
      key: "title",
      label: "Title",
    },
    {
      key: "price",
      label: "Price",
      render: (row) => <Typography>${row?.price}</Typography>,
    },
    {
      key: "action",
      type: "action",
      label: "Action",
      actionOptions: () => [
        {
          icon: Visibility,
          onClick: (row) => {
            console.log(row);
          },
        },
      ],
    },
  ];

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      title="Cart Detail"
      fullWidth
    >
      <DialogContent>
        <Table
          tableData={products}
          isLoading={isLoading}
          tableHeader={tableHeader}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Close</Button>
      </DialogActions>
    </Modal>
  );
};

export default CartDetailModal;
