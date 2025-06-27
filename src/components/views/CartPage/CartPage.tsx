"use client";
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Table from "@/components/shared/Table";
import { TableHeader } from "@/components/shared/Table/Table";
import { FormatListBulleted } from "@mui/icons-material";
import useGetAllCarts from "@/services/useGetAllCarts";
import { formatDateToLong } from "@/utils/date";
import CartDetailModal from "./CartDetailModal";

const CartPage = () => {
  const { data: carts, isLoading } = useGetAllCarts();
  const [open, setOpen] = React.useState(false);
  const [currentViewCartId, setCurrentViewCartId] = useState(null);

  const tableData = carts
    ? carts.map((cart) => ({
        ...cart,
        id: cart.id,
        userId: cart?.userId,
        totalProducts: cart?.products.length,
        totalQuantity: cart?.products.reduce(
          (acc, curr) => acc + curr.quantity,
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
