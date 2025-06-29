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
  Button,
  ButtonProps,
} from "@mui/material";
import SearchBar from "../SearchBar";
import Image from "next/image";
import { deepSearchByKey } from "@/helpers/global";

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
  render?: (row?: TableData) => JSX.Element | JSX.Element;
}

export type TableData = Partial<Record<TableHeader["key"], any>>;

type TopButton = ButtonProps & {
  onClick: () => void;
  label: string;
};

type TableProps = {
  tableData: TableData[];
  tableHeader: TableHeader[];
  itemsPerPage?: number;
  isLoading: boolean;
  withSearch?: boolean;
  buttons?: TopButton[];
  searchOptions?: {
    searchBy: "title";
  };
  tableFooter?: any;
};

const Table = (props: TableProps) => {
  const {
    tableData,
    tableHeader,
    isLoading = false,
    withSearch = false,
    buttons = [],
    searchOptions = {
      searchBy: "title",
    },
    tableFooter,
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

  const renderBody = (tableData: TableData[], tableHeader: TableHeader[]) => {
    const slicedData = tableData.slice(
      page * itemsPerPage,
      page * itemsPerPage + itemsPerPage
    );

    return (
      <>
        {slicedData?.map((row, rowIndex) => (
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

              if (column.type === "index") {
                return (
                  <TableCell key={column.key} align="center">
                    {rowIndex + 1}
                  </TableCell>
                );
              }

              if (column.type === "image") {
                return (
                  <TableCell key={column.key}>
                    <Image
                      src={value}
                      alt={`image-${value}-${row.id}`}
                      width={60}
                      height={60}
                      priority
                      style={{ objectFit: "contain", margin: "auto" }}
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
    return (
      <TableRow>
        <TableCell colSpan={colSpan}>
          <Box display="flex" justifyContent="center" py={2}>
            <CircularProgress size={30} />
          </Box>
        </TableCell>
      </TableRow>
    );
  };

  const filteredProducts = useMemo(() => {
    if (!!search) {
      return tableData.filter((data) =>
        deepSearchByKey(data, searchOptions?.searchBy, search)
      );
    } else {
      return tableData;
    }
  }, [search, searchOptions?.searchBy, tableData]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", padding: 4 }}>
      <Stack
        direction="row"
        alignItems="center"
        marginBottom={3}
        justifyContent={withSearch ? "space-between" : "flex-end"}
      >
        {withSearch && (
          <Box width="26vw">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search by product name"
            />
          </Box>
        )}
        <Box>
          {buttons &&
            buttons.map((btn, idx) => (
              <Button
                key={idx}
                {...btn}
                sx={{ marginLeft: !withSearch ? "auto" : "" }}
              >
                {btn.label}
              </Button>
            ))}
        </Box>
      </Stack>

      <TableContainer sx={{ maxHeight: 440, marginBottom: 2 }}>
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
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={tableFooter ? "space-between" : "flex-end"}
      >
        {tableFooter && <Box>{tableFooter}</Box>}
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={tableData?.length}
          rowsPerPage={itemsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeItemsPerPage}
        />
      </Stack>
    </Paper>
  );
};

export default Table;
