"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Table from "@/components/shared/Table";
import { TableHeader } from "@/components/shared/Table/Table";
import { FormatListBulleted, AddBox } from "@mui/icons-material";
import useGetAllCarts from "@/services/useGetAllCarts";
import { formatDateToLong } from "@/utils/date";
import CartDetailModal from "./CartDetailModal";
import { useCartStore } from "@/stores/useCartStore";

const CartPage = () => {
  const { allCarts, setAllCarts } = useCartStore();

  const { data: carts, isLoading, isSuccess } = useGetAllCarts();
  const [open, setOpen] = React.useState(false);
  const [currentViewCartId, setCurrentViewCartId] = useState(null);

  useEffect(() => {
    if (allCarts.length == 0 && isSuccess) {
      setAllCarts(carts);
    }
  }, [allCarts.length, carts, isSuccess, setAllCarts]);

  const tableData = allCarts
    ? allCarts.map((cart) => ({
        ...cart,
        id: cart.id,
        userId: cart?.userId,
        totalProducts: cart?.products.length,
        totalQuantity: cart?.products.reduce(
          (acc: number, curr: { quantity: number }) => acc + curr.quantity,
          0
        ),
        createdAt: formatDateToLong(cart.date),
      }))
    : [];

  const tableHeader: TableHeader[] = [
    {
      key: "id",
      label: "Cart ID",
      sx: {
        width: "6%",
      },
    },
    {
      key: "userId",
      label: "user ID",
    },
    {
      key: "totalProducts",
      label: "Total Products",
    },
    {
      key: "totalQuantity",
      label: "Total Quantity",
    },
    {
      key: "createdAt",
      label: "Created at",
      sx: {
        width: "10%",
      },
    },
    {
      key: "action",
      type: "action",
      label: "Actions",
      actionOptions: () => [
        {
          icon: FormatListBulleted,
          onClick: (row) => {
            setOpen(true);
            setCurrentViewCartId(row?.id);
          },
          color: "action",
        },
      ],
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" fontWeight={500} marginBottom={3}>
        Shopping Cart
      </Typography>
      <Table
        tableData={tableData}
        tableHeader={tableHeader}
        isLoading={isLoading}
        withSearch={true}
        buttons={[
          {
            label: "Add a new cart",
            onClick: () => {},
            color: "primary",
            variant: "contained",
            startIcon: <AddBox />,
          },
        ]}
      />
      <CartDetailModal
        open={open}
        setOpen={() => setOpen(false)}
        id={currentViewCartId}
      />
    </Box>
  );
};

export default CartPage;
