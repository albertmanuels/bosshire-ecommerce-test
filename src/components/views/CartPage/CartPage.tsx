"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import Table from "@/components/shared/Table";
import { TableHeader } from "@/components/shared/Table/Table";
import { Visibility } from "@mui/icons-material";
import useGetAllCarts from "@/services/useGetAllCarts";

const CartPage = () => {
  const { data: carts, isLoading } = useGetAllCarts();

  const tableData = carts
    ? carts.map((cart) => ({
        image: "-",
        id: cart.id,
        userId: cart?.userId,
      }))
    : [];

  const tableHeader: TableHeader[] = [
    {
      key: "image",
      label: "Image",
      sx: {
        width: "10%",
      },
    },
    {
      key: "id",
      label: "Cart ID",
    },
    {
      key: "userId",
      label: "user ID",
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
