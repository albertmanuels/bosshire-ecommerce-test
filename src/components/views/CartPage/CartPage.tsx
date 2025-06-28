"use client";
import React from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useCartStore } from "@/stores/useCartStore";
import Image from "next/image";
import { Delete, FavoriteBorder } from "@mui/icons-material";
import NumberStepper from "@/components/shared/NumberStepper";
import usePostNewCart from "@/services/usePostNewCart";
import { ADMIN } from "@/constants/user";
import { toast } from "react-toastify";

const CartPage = () => {
  const {
    cart,
    getTotalPriceInCart,
    updateQuantity,
    removeItemFromCart,
    setToAllCarts,
  } = useCartStore();

  const totalPrice = getTotalPriceInCart().toFixed(2);
  const cartId = Math.random() * 1000;

  // const { mutate } = usePostNewCart({
  //   onSuccess: (data) => {
  //     console.log("data from success: ", data);
  //     setToAllCarts({
  //       date: new Date().toISOString(),
  //       products: ,
  //       id: cartId,
  //       userId: ADMIN.id,
  //     });
  //   },
  //   onError: (error) => {
  //     toast.error(error);
  //   },
  // });

  return (
    <Box>
      <Typography variant="h4" fontWeight={500} marginBottom={3}>
        Cart
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card variant="outlined" sx={{ padding: 2, borderRadius: 3 }}>
            <Stack gap={2}>
              {cart.map((product) => (
                <Box
                  key={product.id}
                  p={2}
                  mb={2}
                  borderRadius={2}
                  border="1px solid #eee"
                >
                  <Box display="flex" alignItems="center" gap={2}>
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={70}
                      height={70}
                      style={{ borderRadius: 8 }}
                    />

                    <Box flex={1}>
                      <Typography fontWeight="medium">
                        {product.title}
                      </Typography>
                    </Box>

                    <Typography fontWeight="bold" sx={{ minWidth: 90 }}>
                      ${product.price.toFixed(2)}
                    </Typography>

                    <Box display="flex" alignItems="center" gap={1}>
                      <IconButton
                        onClick={() => removeItemFromCart(product.id)}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>

                    <NumberStepper
                      value={product.quantity}
                      onChange={(value) => {
                        updateQuantity(product.id, value);
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Stack>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            variant="outlined"
            sx={{ borderRadius: 3, p: 3, position: "sticky", top: 80 }}
          >
            <Typography fontWeight={600} mb={2}>
              Shopping summary
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="body1" fontWeight={500}>
                Total
              </Typography>
              <Typography variant="h6" fontWeight={700}>
                ${totalPrice}
              </Typography>
            </Box>

            <Button
              fullWidth
              size="large"
              variant="contained"
              color="primary"
              sx={{ borderRadius: 3, py: 1.5, fontWeight: 600 }}
              disabled={cart.length === 0}
              // onClick={() =>
              //   mutate({
              //     id: cartId,
              //     products: cart,
              //     userId: ADMIN.id,
              //   })
              // }
            >
              Buy
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartPage;
