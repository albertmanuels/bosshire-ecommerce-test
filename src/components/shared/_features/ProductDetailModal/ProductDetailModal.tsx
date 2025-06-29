"use client";
import React from "react";

import { Close, Star } from "@mui/icons-material";
import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";

import useGetProductById from "@/services/useGetProductById";

type ProductDetailModalProps = {
  onClose: () => void;
  productId: number | null;
  open: boolean;
};

const ProductDetailModal = (props: ProductDetailModalProps) => {
  const { open, onClose, productId } = props;

  const { data, isLoading } = useGetProductById({ id: productId as number });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ paddingBottom: 4 }}>
        {isLoading ? (
          <>
            <Skeleton variant="text" width="60%" height={40} sx={{ mb: 2 }} />
            <Stack direction="row" gap={3}>
              <Skeleton variant="rectangular" width={240} height={180} />
              <Stack gap={2} flexGrow={1}>
                <Skeleton variant="text" width={100} height={32} />
                <Skeleton variant="text" width={120} height={32} />
                <Skeleton variant="text" width={80} height={32} />
                <Skeleton variant="text" height={64} />
              </Stack>
            </Stack>
          </>
        ) : (
          <>
            <Typography variant="h5" fontWeight={500} marginBottom={2}>
              {data?.title}
            </Typography>
            <Stack direction="row" gap={3} flex={1}>
              <Box
                sx={{
                  width: "fit-content",
                  minWidth: "max-content",
                  height: "auto",
                }}
              >
                <Image
                  src={data?.image as string}
                  width={240}
                  height={240}
                  objectFit="contain"
                  alt={`product-image-${data?.title}`}
                  loading="lazy"
                  style={{ aspectRatio: 4 / 3, objectFit: "contain" }}
                />
              </Box>
              <Stack gap={3} flexGrow={1}>
                <Chip
                  label={data?.category}
                  variant="filled"
                  sx={{ width: "fit-content" }}
                />
                <Box sx={{ display: "flex", alignContent: "center", gap: 1 }}>
                  <Star color="warning" />{" "}
                  <Typography variant="body1" fontWeight={500}>
                    {data?.rating.rate}
                  </Typography>
                  <Typography>{`(${data?.rating.count} reviews)`}</Typography>
                </Box>
                <Typography variant="h6" color="primary">
                  ${data?.price}
                </Typography>
                <Box>
                  <Typography variant="h6">Description</Typography>
                  <Typography variant="body1">{data?.description}</Typography>
                </Box>
              </Stack>
            </Stack>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
