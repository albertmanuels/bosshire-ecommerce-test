"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import Table from "@/components/shared/Table";
import { TableHeader } from "@/components/shared/Table/Table";
import { Visibility } from "@mui/icons-material";
import useGetAllCarts from "@/services/useGetAllCarts";
import { formatDateToLong } from "@/utils/date";

const CartPage = () => {
  const { data: carts, isLoading } = useGetAllCarts();

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
      label: "Actions",
      actionOptions: () => [
        {
          icon: Visibility,
          onClick: () => {},
          color: "info",
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
      />
    </Box>
  );
};

export default CartPage;
