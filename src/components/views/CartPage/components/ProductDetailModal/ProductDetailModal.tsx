"use client";
import Modal from "@/components/shared/Modal";
import { ModalProps } from "@/components/shared/Modal/Modal";
import useGetProductById from "@/services/useGetProductById";
import { Star } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  DialogActions,
  DialogContent,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";

type ProductDetailModalProps = ModalProps & {
  setOpen: (val: boolean) => void;
  productId: number | null;
};

const ProductDetailModal = (props: ProductDetailModalProps) => {
  const { open, setOpen, productId, ...delegated } = props;

  const { data, isLoading } = useGetProductById({ id: productId as number });

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      title=""
      fullWidth
      maxWidth="md"
      {...delegated}
    >
      <DialogContent>
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
      <DialogActions>
        <Button onClick={() => setOpen(false)} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Modal>
  );
};

export default ProductDetailModal;
