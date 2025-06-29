"use client";
import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Controller } from "react-hook-form";

import { ADMIN } from "@/constants/user";
import { ContentCopy } from "@mui/icons-material";
import { Typography } from "@mui/material";
import useLogin from "./Login.hook";

const LoginPage = () => {
  const { control, handleSubmit, onSubmit } = useLogin();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ minWidth: "25vw" }}>
        <CardHeader
          title="Bosshire Store Dashboard"
          subheader="Sign In"
          sx={{ textAlign: "center" }}
        />
        <CardContent>
          <Stack gap={3}>
            <Controller
              name="username"
              control={control}
              render={({ field, fieldState: { invalid, error, isDirty } }) => (
                <Stack>
                  <TextField
                    {...field}
                    type="text"
                    placeholder="username"
                    label="Username"
                    error={isDirty && invalid && !!error?.message}
                  />
                  {error && (
                    <Typography variant="caption" color="error">
                      {error.message}
                    </Typography>
                  )}
                </Stack>
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState: { error, invalid, isDirty } }) => (
                <Stack>
                  <TextField
                    {...field}
                    type="password"
                    placeholder="password"
                    label="Password"
                    error={isDirty && invalid && !!error?.message}
                  />
                  {error && (
                    <Typography variant="caption" color="error">
                      {error.message}
                    </Typography>
                  )}
                </Stack>
              )}
            />
            <Button variant="contained" onClick={handleSubmit(onSubmit)}>
              Login
            </Button>
            <Stack gap={1}>
              <Typography>Demo admin account:</Typography>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(ADMIN.username);
                }}
              >
                Username: {ADMIN.username}
                <ContentCopy />
              </Button>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(ADMIN.password);
                }}
              >
                <p>Password: {ADMIN.password}</p>
                <ContentCopy />
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
