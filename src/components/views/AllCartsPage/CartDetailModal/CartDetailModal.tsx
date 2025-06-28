"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import Table from "@/components/shared/Table";
import { TableHeader } from "@/components/shared/Table/Table";
import { Close, Visibility } from "@mui/icons-material";
import { useCartStore } from "@/stores/useCartStore";

type CartDetailModalProps = {
  open: boolean;
  onClose: () => void;
  id: number | null;
};

const CartDetailModal = (props: CartDetailModalProps) => {
  const { open, onClose, id } = props;
  const { getCartDetailById } = useCartStore();

  const cartDetail = getCartDetailById(id as number);

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
        width: "20%",
      },
    },
    {
      key: "id",
      label: "Product ID",
      sx: {
        width: "15%",
      },
    },
    {
      key: "title",
      label: "Title",
      sx: {
        maxWidth: "40%",
      },
    },
    {
      key: "price",
      label: "Price",
      render: (row) => <Typography>${row?.price}</Typography>,
      sx: {
        width: "10%",
      },
    },
    {
      key: "action",
      type: "action",
      label: "Action",
      actionOptions: () => [
        {
          icon: Visibility,
          onClick: (row) => {
            console.log(row);
          },
        },
      ],
    },
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
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
          Date: {new Date(cartDetail.date).toLocaleDateString()}
        </Typography>

        <Divider sx={{ my: 2 }} />
        <Table
          tableData={cartDetail?.products}
          isLoading={false}
          tableHeader={tableHeader}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CartDetailModal;
