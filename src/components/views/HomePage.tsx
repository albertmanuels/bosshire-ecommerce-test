"use client";
import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/constants/config";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Image from "next/image";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Stack from "@mui/material/Stack";

interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  image: string;
  description: string;
}
const HomePage = () => {
  const { data: products, isPending } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async (): Promise<Product[]> => {
      const response = await fetch(`${API_URL}/products`);
      const data = await response.json();

      return data;
    },
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={3}
        columns={{ xs: 4, sm: 8, md: 12 }}
        alignItems="stretch"
      >
        {products?.map((product) => (
          <Grid key={product.id} size={{ xs: 4, sm: 4, md: 4, lg: 3 }}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                padding: 2,
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box
                  sx={{
                    width: "100%",
                    height: "200px",
                    aspectRatio: "4/3",
                    objectFit: "contain",
                    objectPosition: "center",
                    marginBottom: 4,
                    position: "relative",
                  }}
                >
                  <Image
                    src={product.image}
                    fill={true}
                    objectFit="contain"
                    objectPosition="center"
                    alt={`product-${product.title}`}
                  />
                </Box>
                <Stack sx={{ marginBottom: 1 }} gap={1} marginBottom={1}>
                  <Chip
                    label={product.category}
                    variant="filled"
                    color="default"
                    size="small"
                    sx={{
                      width: "max-content",
                      marginBottom: 2,
                      paddingX: 1,
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: "GrayText", lineClamp: 2 }}
                  >
                    {product.title}
                  </Typography>
                  <span
                    style={{
                      fontSize: "1.4rem",
                      fontWeight: 700,
                      color: "blue",
                    }}
                  >
                    ${product.price.toFixed(2)}
                  </span>
                </Stack>
              </CardContent>
              <CardActions
                sx={{
                  marginTop: "auto",
                  "& > :not(:first-of-type)": {
                    marginLeft: 0,
                  },
                }}
              >
                <Stack gap={3} flexGrow={1}>
                  <Link href={`/products/${product.id}`}>
                    <Button variant="contained" color="primary" fullWidth>
                      View Details
                    </Button>
                  </Link>

                  <Button variant="contained" color="warning" fullWidth>
                    Add to Cart
                  </Button>
                </Stack>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;
