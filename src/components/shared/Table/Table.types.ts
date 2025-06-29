/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ComponentType, JSX} from "react";
import {
  SvgIconOwnProps,
  SvgIconProps,
  SxProps,
  TableCellProps,
  Theme,
  ButtonProps,
} from "@mui/material";

type Action = {
  onClick: (row?: TableData) => void;
  icon: ComponentType<SvgIconProps>;
  color?: SvgIconOwnProps["color"];
  sx?: SxProps<Theme>;
};

type ActionOptions = (row?: TableData) => Action[] | Action[];

export interface TableHeader {
  key: string;
  label: string;
  type?: "action" | "image" | "index";
  sx?: TableCellProps["sx"];
  actionOptions?: ActionOptions;
  align?: TableCellProps["align"];
  render?: (row?: TableData) => JSX.Element
}

export type TableData = Partial<Record<TableHeader["key"], any>>;

type TopButton = ButtonProps & {
  onClick: () => void;
  label: string;
};

export type TableProps = {
  tableData: TableData[];
  tableHeader: TableHeader[];
  itemsPerPage?: number;
  isLoading: boolean;
  withSearch?: boolean;
  buttons?: TopButton[];
  searchOptions?: {
    searchBy: "title";
  };
  tableFooter?: JSX.Element
};