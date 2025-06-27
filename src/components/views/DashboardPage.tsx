"use client";
import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useGetAllProducts from "@/services/useGetAllProducts";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import { Visibility, AddShoppingCart } from "@mui/icons-material";

const DashboardPage = () => {
  const { data: products } = useGetAllProducts();

  const tableData = useMemo(
    () =>
      products?.map((product) => ({
        ...product,
        category: product.category,
        image: product.image,
        title: product.title,
        id: product.id,
        price: product.price,
      })),
    [products]
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" fontWeight={500} marginBottom={3}>
        Dashboard
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell align="right">ID</TableCell>
              <TableCell align="right">Product name</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Image
                    src={row.image}
                    width={40}
                    height={40}
                    alt={`product-${row.title}`}
                  />
                </TableCell>
                <TableCell align="right">{row.id}</TableCell>
                <TableCell align="right" sx={{ lineClamp: 40 }}>
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.category}</TableCell>
                <TableCell align="right">${row.price.toFixed(2)}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" gap={2}>
                    <IconButton color="primary">
                      <Visibility />
                    </IconButton>
                    <IconButton color="success">
                      <AddShoppingCart />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DashboardPage;
