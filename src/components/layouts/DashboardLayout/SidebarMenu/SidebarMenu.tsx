"use client";
import React from "react";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Badge, Divider, List } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import { usePathname } from "next/navigation";

import SidebarFooter from "./components/SidebarFooter";
import useSidebarMenu from "./SidebarMenu.hook";
import { SidebarMenuProps } from "./SidebarMenu.types";

const SidebarMenu = (props: SidebarMenuProps) => {
  const { open, handleDrawerClose, username, sidebarItems } = props;
  const theme = useTheme();
  const pathname = usePathname();

  const { Drawer, DrawerHeader, totalItemsInCart, handleLogout } =
    useSidebarMenu();

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {sidebarItems.map((item) => (
          <ListItem key={item.key} disablePadding sx={{ display: "block" }}>
            <Link href={item.href}>
              <ListItemButton
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                    backgroundColor:
                      pathname === item.href ? "Highlight" : "transparent",
                    ":hover": {
                      backgroundColor:
                        pathname === item.href ? "Highlight" : "",
                    },
                  },
                  open
                    ? {
                        justifyContent: "initial",
                      }
                    : {
                        justifyContent: "center",
                      },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: "center",
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: "auto",
                        },
                  ]}
                >
                  {item.key === "cart" ? (
                    <Badge badgeContent={totalItemsInCart} color="primary">
                      <item.icon />
                    </Badge>
                  ) : (
                    <item.icon />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={[
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <SidebarFooter logout={handleLogout} username={username} open={open} />
    </Drawer>
  );
};

export default SidebarMenu;
