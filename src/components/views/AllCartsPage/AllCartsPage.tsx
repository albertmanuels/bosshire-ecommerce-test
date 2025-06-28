"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Table from "@/components/shared/Table";
import { TableHeader } from "@/components/shared/Table/Table";
import { FormatListBulleted } from "@mui/icons-material";
import useGetAllCarts from "@/services/useGetAllCarts";
import { formatDateToLong } from "@/utils/date";
import CartDetailModal from "./CartDetailModal";
import { useCartStore } from "@/stores/useCartStore";
import useGetAllProducts from "@/services/useGetAllProducts";
import { Product } from "@/types/product";
import getEnrichedCart from "@/helpers/getEnrichedCarts";

const AllCartsPage = () => {
  const { allCarts, setToAllCarts } = useCartStore();

  const [open, setOpen] = useState(false);
  const [currentViewCartId, setCurrentViewCartId] = useState(null);

  const { data: carts, isLoading, isSuccess } = useGetAllCarts();
  const { data: products } = useGetAllProducts();

  useEffect(() => {
    if (allCarts.length == 0 && isSuccess) {
      carts?.map((cart) => {
        const enriched = getEnrichedCart(cart, products as Product[]);
        setToAllCarts(enriched);
      });
    }
  }, [allCarts.length, carts, isSuccess, products, setToAllCarts]);

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

  const descOrderTableData = tableData.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  console.log("ALL CARTS: ", allCarts);

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
      key: "id",
      label: "Cart ID",
      sx: {
        width: "6%",
      },
    },
    {
      key: "userId",
      label: "User ID",
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
      label: "Created At",
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
      sx: {
        width: "10%",
      },
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" fontWeight={500} marginBottom={3}>
        All User Carts
      </Typography>
      <Table
        tableData={descOrderTableData}
        tableHeader={tableHeader}
        isLoading={isLoading}
        withSearch
      />
      {open && (
        <CartDetailModal
          open={open}
          onClose={() => setOpen(false)}
          id={currentViewCartId}
        />
      )}
    </Box>
  );
};

export default AllCartsPage;
