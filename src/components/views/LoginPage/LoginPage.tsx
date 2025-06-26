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
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type FormValues = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const { register, handleSubmit, setError } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
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

      toast.error("Error!");
      return;
    }

    if (result?.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Login success!");

    setTimeout(() => {
      router.push("/");
    }, 1000);
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
        <CardHeader>
          <h2>Sign In</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={3}>
              <TextField
                type="text"
                placeholder="username"
                label="Username"
                {...register("username")}
              />
              <TextField
                type="password"
                placeholder="password"
                label="Password"
                {...register("password")}
              />
              <Button variant="contained" type="submit">
                Login
              </Button>
              <p>Username: hopkins</p>
              <p>Password: William56$hj</p>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
