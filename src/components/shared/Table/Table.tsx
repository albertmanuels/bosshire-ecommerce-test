"use client";
import React from "react";

import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import Image from "next/image";

import SearchBar from "../SearchBar";

import useTable from "./Table.hook";
import { TableData, TableHeader, TableProps } from "./Table.types";

const Table = (props: TableProps) => {
  const {
    tableHeader,
    isLoading = false,
    withSearch = false,
    buttons = [],
    tableFooter,
  } = props;

  const {
    page,
    itemsPerPage,
    search,
    setSearch,
    handleChangePage,
    handleChangeItemsPerPage,
    filteredProducts,
  } = useTable(props);

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
                    {page * itemsPerPage + rowIndex + 1}
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
          count={filteredProducts?.length}
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
