import React from "react";
import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { SidebarFooterProps } from "./SidebarFooter.types";
import { AccountCircle, Logout } from "@mui/icons-material";

const SidebarFooter = (props: SidebarFooterProps) => {
  const { logout, open, username } = props;

  return (
    <Box sx={{ marginTop: "auto" }}>
      <ListItem key="logout" disablePadding sx={{ display: "block" }}>
        <ListItemButton
          sx={[
            {
              minHeight: 48,
              px: 2.5,
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
            <AccountCircle />
          </ListItemIcon>
          <ListItemText
            primary={`Hi ${username}`}
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
        <ListItemButton
          onClick={logout}
          sx={[
            {
              minHeight: 48,
              px: 2.5,
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
            <Logout />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
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
      </ListItem>
    </Box>
  );
};

export default SidebarFooter;
