"use client";
import React from "react";
import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import Table from "@/components/shared/Table";
import { Close } from "@mui/icons-material";
import { formatDateToLong } from "@/utils/date";
import { TableHeader } from "@/components/shared/Table/Table.types";
import { CartDetailModalProps } from "./CartDetailModal.types";
import useCartDetailModal from "./CartDetailModal.hook";

const CartDetailModal = (props: CartDetailModalProps) => {
  const { open, onClose } = props;

  const { totalPrice, cartDetail } = useCartDetailModal(props);

  const tableHeader: TableHeader[] = [
    {
      key: "index",
      type: "index",
      label: "No",
      sx: {
        width: "4%",
      },
    },
    {
      key: "image",
      type: "image",
      label: "Image",
      sx: {
        width: "15%",
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
      label: "Title",
      sx: {
        maxWidth: "50%",
      },
    },
    {
      key: "category",
      label: "Category",
      sx: {
        maxWidth: "30%",
      },
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
      key: "quantity",
      label: "Quantity",
      sx: {
        maxWidth: "40%",
      },
    },
    {
      key: "price",
      label: "Price",
      render: (row) => (
        <Typography textAlign="center">${row?.price}</Typography>
      ),
      sx: {
        width: "10%",
      },
    },
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        Cart Detail - ID #{cartDetail?.id}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ paddingBottom: 4 }}>
        <Typography variant="subtitle2" gutterBottom>
          User ID: {cartDetail.userId}
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Created At: {formatDateToLong(cartDetail.date)}
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Total Products:{" "}
          {`${cartDetail.products.length} ${
            cartDetail.products.length > 1 ? "items" : "item"
          }`}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Product list
        </Typography>
        <Table
          tableData={cartDetail?.products}
          isLoading={false}
          tableHeader={tableHeader}
          tableFooter={
            <Typography variant="body1" fontWeight={500}>
              Total Price: ${totalPrice}
            </Typography>
          }
        />
      </DialogContent>
    </Dialog>
  );
};

export default CartDetailModal;
