"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import Table from "@/components/shared/Table";
import CartDetailModal from "./CartDetailModal";
import useAllCarts from "./AllCarts.hook";

const AllCartsPage = () => {
  const {
    open,
    setOpen,
    currentViewCartId,
    descOrderTableData,
    isLoading,
    tableHeader,
  } = useAllCarts();

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
