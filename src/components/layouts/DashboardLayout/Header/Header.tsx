"use client";
import React from "react";

import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { drawerWidth } from "../DashboardLayout.constants";

import { AppBarProps, HeaderProps } from "./Header.types";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Header = (props: HeaderProps) => {
  const { handleDrawerOpen, open } = props;

  return (
    <AppBar position="fixed" open={open} color="primary">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open ? { display: "none" } : {}),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="h2">
          BOSSHIRE STORE
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
