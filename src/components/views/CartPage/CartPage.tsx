"use client";
import React, { useState } from "react";
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
import { Delete, ShoppingCart, Visibility } from "@mui/icons-material";
import NumberStepper from "@/components/shared/NumberStepper";
import usePostNewCart from "@/services/usePostNewCart";
import { ADMIN } from "@/constants/user";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getNextCartId } from "@/helpers/global";
import Link from "next/link";
import getEnrichedCart from "@/helpers/getEnrichedCarts";
import ProductDetailModal from "@/components/shared/_features/ProductDetailModal";

const CartPage = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [currentViewProductId, setCurrentViewProductId] = useState<
    number | null
  >(null);

  const { cart, updateQuantity, removeItemFromCart, allCarts, checkout } =
    useCartStore();

  const totalPrice = useCartStore((state) =>
    state.cart.reduce(
      (sum, product) => sum + (product?.price ?? 0) * (product.quantity ?? 0),
      0
    )
  ).toFixed(2);

  const { mutate, isPending } = usePostNewCart({
    onSuccess: (data) => {
      const payload = {
        ...data,
        id: getNextCartId(allCarts),
      };

      const enriched = getEnrichedCart(payload, cart);
      checkout(enriched);
      toast.success("Checkout is successful!");
      router.push("/");
    },
    onError: (error) => {
      toast.error("Checkout failed!");
      console.error(error);
    },
  });

  const handleOnCheckout = () => {
    mutate({
      id: getNextCartId(allCarts),
      userId: ADMIN.id,
      date: new Date().toISOString(),
      products: cart.map((product) => ({
        productId: product.id,
        quantity: product.quantity,
      })),
    });
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={500} marginBottom={3}>
        Cart
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card variant="outlined" sx={{ padding: 2, borderRadius: 3 }}>
            <Stack gap={2}>
              {cart.length === 0 ? (
                <Box textAlign="center">
                  <ShoppingCart sx={{ width: "3rem", height: "3rem" }} />
                  <Typography>Cart is empty</Typography>
                  <Link href="/">
                    <Button variant="contained">Continue Shopping</Button>
                  </Link>
                </Box>
              ) : (
                <>
                  {cart.map((product) => (
                    <Box
                      key={product.id}
                      p={2}
                      mb={2}
                      borderRadius={2}
                      border="1px solid #eee"
                    >
                      <Stack
                        direction={{ xs: "column", lg: "row" }}
                        gap={2}
                        alignItems={{ xs: "revert", lg: "center" }}
                        justifyContent={{ xs: "center", lg: "revert" }}
                      >
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

                        <NumberStepper
                          value={product.quantity}
                          onChange={(value) => {
                            updateQuantity(product.id, value);
                          }}
                        />

                        <Box display="flex" alignItems="center" gap={1}>
                          <IconButton
                            color="primary"
                            onClick={() => {
                              setOpen(true);
                              setCurrentViewProductId(product.id);
                            }}
                          >
                            <Visibility fontSize="small" color="primary" />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => removeItemFromCart(product.id)}
                          >
                            <Delete fontSize="small" color="error" />
                          </IconButton>
                        </Box>
                      </Stack>
                    </Box>
                  ))}
                </>
              )}
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
              color="success"
              sx={{ borderRadius: 3, py: 1.5, fontWeight: 600 }}
              disabled={cart.length === 0}
              onClick={handleOnCheckout}
              loading={isPending}
            >
              Checkout
            </Button>
            <ProductDetailModal
              open={open}
              onClose={() => setOpen(false)}
              productId={currentViewProductId}
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartPage;
