"use client";
import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { loginActions } from "./actions";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ADMIN } from "@/constants/user";
import { ContentCopy } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type FormValues = {
  username: string;
  password: string;
};

const LoginSchema = yup.object().shape({
  username: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const LoginPage = () => {
  const router = useRouter();
  const {
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(LoginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: FormValues) => {
    if (errors.username || errors.password) {
      return;
    }

    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);

    const result = await loginActions(null, formData);

    if (result?.fieldErrors) {
      for (const key in result.fieldErrors) {
        setError(key as keyof FormValues, {
          type: "server",
          message: result.fieldErrors[key],
        });
      }

      toast.error(result?.error);
      return;
    }

    if (result?.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Login successful!");
    router.push("/");
  };

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
