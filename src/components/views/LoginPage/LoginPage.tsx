"use client";
import React, { useActionState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { login } from "./actions";

const LoginPage = () => {
  const [state, action] = useActionState(login, undefined);

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
          <form action={action}>
            <Stack gap={3}>
              <div>
                <TextField
                  type="text"
                  placeholder="username"
                  label="Username"
                  name="username"
                />
              </div>
              <div>
                <TextField
                  type="password"
                  placeholder="password"
                  label="Password"
                  name="password"
                />
              </div>
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
