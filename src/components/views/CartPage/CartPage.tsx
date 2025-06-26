"use client";
import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import CartTable from "@/components/shared/CartTable";
import {
  TableData,
  TableHeader,
} from "@/components/shared/CartTable/CartTable";
import { BorderColor, Delete, Visibility } from "@mui/icons-material";
import NumberStepper from "@/components/shared/NumberStepper";

const CartPage = () => {
  const tableData: TableData[] = [
    {
      id: 234,
      image: "xx",
      product: "Product 99",
      category: "Men's outfit",
      price: 10.99,
      quantity: 2,
      total: 21.98,
    },
  ];

  const tableHeader: TableHeader[] = [
    {
      key: "image",
      label: "Image",
      sx: {
        width: "10%",
      },
    },
    {
      key: "product",
      label: "Product Name",
    },
    {
      key: "category",
      label: "Category",
    },
    {
      key: "quantity",
      label: "Quantity",
      render: () => (
        <Stack direction="row" justifyContent="center">
          <NumberStepper onChange={() => {}} value={4} />
        </Stack>
      ),
      align: "center",
    },
    {
      key: "total",
      label: "Total",
      render: (row) => <Typography>{row?.total}</Typography>,
      sx: {
        textAlign: "center",
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
        {
          icon: BorderColor,
          onClick: () => {},
          color: "success",
        },
        {
          icon: Delete,
          onClick: () => {},
          color: "error",
        },
      ],
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CartTable tableData={tableData} tableHeader={tableHeader} />
    </Box>
  );
};

export default CartPage;
