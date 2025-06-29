import { ComponentType } from "react";

import { SvgIconProps } from "@mui/material";

type SidebarItem = {
  key: string;
  href: string;
  label: string;
  icon: ComponentType<SvgIconProps>;
};

export type SidebarMenuProps = {
  sidebarItems: SidebarItem[];
  open: boolean;
  handleDrawerClose: () => void;
  username: string;
};

