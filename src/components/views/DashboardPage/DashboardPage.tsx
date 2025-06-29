"use client";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Visibility, AddShoppingCart } from "@mui/icons-material";
import { useCartStore } from "@/stores/useCartStore";
import { Chip } from "@mui/material";
import { TableHeader } from "@/components/shared/Table/Table.types";
import Table from "@/components/shared/Table";
import ProductDetailModal from "@/components/shared/_features/ProductDetailModal";
import useDashboard from "./Dashboard.hook";

const DashboardPage = () => {
  const { addToCart } = useCartStore();

  const {
    tableData,
    isLoading,
    open,
    setOpen,
    currentViewProductId,
    setCurrentViewProductId,
  } = useDashboard();

  const tableHeader: TableHeader[] = [
    {
      key: "index",
      type: "index",
      label: "No",
      sx: {
        width: "6%",
      },
    },
    {
      key: "image",
      type: "image",
      label: "Image",
      sx: {
        width: "10%",
      },
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
      label: "Product Name",
      sx: {
        width: "30%",
      },
    },
    {
      key: "category",
      label: "Category",
      render: (row) => (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Chip
            label={row?.category}
            variant="filled"
            sx={{ width: "fit-content", margin: "auto" }}
          />
        </Box>
      ),
    },
    {
      key: "price",
      label: "Price",
      render: (row) => (
        <Typography textAlign="center">${row?.price}</Typography>
      ),
    },
    {
      key: "action",
      type: "action",
      label: "Action",
      actionOptions: () => [
        {
          icon: Visibility,
          onClick: (row) => {
            setOpen(true);
            setCurrentViewProductId(row?.id);
          },
          color: "primary",
        },
        {
          icon: AddShoppingCart,
          onClick: (row) => {
            addToCart({
              id: row?.id,
              image: row?.image,
              price: row?.price,
              quantity: 1,
              title: row?.title,
              description: row?.description,
              rating: row?.rating,
              category: row?.category,
            });
          },
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
      <ProductDetailModal
        open={open}
        onClose={() => setOpen(false)}
        productId={currentViewProductId}
      />
    </Box>
  );
};

export default DashboardPage;
