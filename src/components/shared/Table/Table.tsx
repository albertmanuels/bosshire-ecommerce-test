/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { ComponentType, JSX, useMemo, useState } from "react";
import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  SvgIconOwnProps,
  SvgIconProps,
  SxProps,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Theme,
} from "@mui/material";
import SearchBar from "../SearchBar";
import Image from "next/image";

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
  type?: "action" | "image";
  sx?: TableCellProps["sx"];
  actionOptions?: ActionOptions;
  align?: TableCellProps["align"];
  render?: (row?: TableData) => JSX.Element | JSX.Element;
}

export type TableData = Partial<Record<TableHeader["key"], any>>;

type TableProps = {
  tableData: TableData[];
  tableHeader: TableHeader[];
  itemsPerPage?: number;
  isLoading: boolean;
  withSearch?: boolean;
};

const Table = (props: TableProps) => {
  const {
    tableData,
    tableHeader,
    isLoading,
    withSearch = false,
    itemsPerPage: _itemPerPage = 5,
  } = props;
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(_itemPerPage);
  const [search, setSearch] = useState("");

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeItemsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setItemsPerPage(Number(event.target.value));
    setPage(0);
  };

  const renderHeader = () => {
    return (
      <TableRow>
        {tableHeader.map(({ align = "center", sx, ...column }) => {
          return (
            <TableCell
              key={column.key}
              align={align}
              sx={{
                ...sx,
                minWidth: "fit-content",
                maxWidth: "300px",
                width: column.hasOwnProperty("render")
                  ? "fit-content"
                  : typeof sx === "object" && sx !== null && "width" in sx
                  ? (sx as { width?: string | number }).width
                  : undefined,
              }}
            >
              {column.label}
            </TableCell>
          );
        })}
      </TableRow>
    );
  };

  const filteredProducts = useMemo(() => {
    if (!!search) {
      return tableData.filter((data) =>
        data.product?.toLowerCase().includes(search.toLowerCase())
      );
    } else {
      return tableData;
    }
  }, [search, tableData]);

  const renderBody = (tableData: TableData[], tableHeader: TableHeader[]) => {
    const slicedData = tableData.slice(
      page * itemsPerPage,
      page * itemsPerPage + itemsPerPage
    );

    return (
      <>
        {slicedData?.map((row) => (
          <TableRow key={row.id}>
            {tableHeader.map(({ align = "center", ...column }) => {
              const value = row[column.key];
              const colRender =
                typeof column.render === "function"
                  ? column.render(row)
                  : column.render;

              const options =
                typeof column.actionOptions === "function"
                  ? column.actionOptions(row)
                  : column.actionOptions;

              if (column.type === "image") {
                return (
                  <TableCell key={column.key} align="left">
                    <Image
                      src={value}
                      alt={`image-${value}-${row.id}`}
                      width={60}
                      height={60}
                      priority
                      style={{ objectFit: "contain" }}
                    />
                  </TableCell>
                );
              }

              if (column.type === "action") {
                return (
                  <TableCell key={column.key} align="left">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      {options?.map((option, idx) => (
                        <IconButton
                          key={idx}
                          onClick={() => {
                            option.onClick(row);
                          }}
                        >
                          <option.icon color={option.color} />
                        </IconButton>
                      ))}
                    </Stack>
                  </TableCell>
                );
              }

              if (column.hasOwnProperty("render")) {
                return (
                  <TableCell key={column.key} sx={column.sx}>
                    {colRender}
                  </TableCell>
                );
              }

              return (
                <TableCell key={column.key} align={align}>
                  {value}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </>
    );
  };

  const renderLoadingRow = (colSpan: number) => {
    <TableRow>
      <TableCell colSpan={colSpan}>
        <Box display="flex" justifyContent="center" py={2}>
          <CircularProgress size={24} />
        </Box>
      </TableCell>
    </TableRow>;
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", padding: 4 }}>
      {withSearch && (
        <Box width="26vw" marginBottom={3}>
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search products..."
          />
        </Box>
      )}
      <TableContainer sx={{ maxHeight: 440 }}>
        <MuiTable stickyHeader>
          <TableHead>{renderHeader()}</TableHead>
          <TableBody>
            {isLoading ? (
              <>{renderLoadingRow(tableHeader.length)}</>
            ) : (
              <>{renderBody(filteredProducts, tableHeader)}</>
            )}
          </TableBody>
        </MuiTable>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={tableData?.length}
        rowsPerPage={itemsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeItemsPerPage}
      />
    </Paper>
  );
};

export default Table;
