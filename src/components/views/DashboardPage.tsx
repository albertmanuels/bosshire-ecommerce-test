"use client";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useGetAllProducts from "@/services/useGetAllProducts";
import { Visibility, AddShoppingCart } from "@mui/icons-material";
import Table from "../shared/Table";
import { TableHeader } from "../shared/Table/Table";

const DashboardPage = () => {
  const { data: products, isLoading } = useGetAllProducts();

  const tableData =
    products?.map((product) => ({
      ...product,
      category: product.category,
      image: product.image,
      title: product.title,
      id: product.id,
      price: product.price,
    })) || [];

  const tableHeader: TableHeader[] = [
    {
      key: "image",
      type: "image",
      label: "Image",
      sx: {
        width: "10%",
      },
      align: "left",
    },
    {
      key: "id",
      label: "Product ID",
      sx: {
        width: "10%",
      },
    },
    {
      key: "title",
      label: "Title",
      sx: {
        width: "30%",
      },
    },
    {
      key: "category",
      label: "Category",
    },
    {
      key: "price",
      label: "Price",
    },
    {
      key: "action",
      type: "action",
      label: "Action",
      actionOptions: () => [
        {
          icon: Visibility,
          onClick: () => {},
          color: "primary",
        },
        {
          icon: AddShoppingCart,
          onClick: () => {},
          color: "success",
        },
      ],
      sx: {
        width: "10%",
      },
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" fontWeight={500} marginBottom={3}>
        Dashboard
      </Typography>
      <Table
        tableData={tableData}
        tableHeader={tableHeader}
        withSearch={true}
        isLoading={isLoading}
        itemsPerPage={5}
      />
    </Box>
  );
};

export default DashboardPage;
