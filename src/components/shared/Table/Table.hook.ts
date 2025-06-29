import { useEffect, useMemo, useState } from "react";
import { TableProps } from "./Table.types";
import { deepSearchByKey } from "@/helpers/global";

const useTable = (props: TableProps) => {
  const {
    tableData,
    itemsPerPage: _itemPerPage = 5,
    searchOptions = { searchBy: "title" },
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

  const filteredProducts = useMemo(() => {
    if (!!search) {
      return tableData.filter((data) =>
        deepSearchByKey(data, searchOptions?.searchBy, search)
      );
    } else {
      return tableData;
    }
  }, [search, searchOptions?.searchBy, tableData]);

  useEffect(() => {
    setPage(0);
  }, [search, searchOptions?.searchBy]);

  useEffect(() => {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    if (page >= totalPages && totalPages > 0) {
      setPage(totalPages - 1);
    }
  }, [filteredProducts.length, itemsPerPage, page]);

  return {
    page,
    itemsPerPage,
    search,
    setSearch,
    handleChangePage,
    handleChangeItemsPerPage,
    filteredProducts,
  };
};

export default useTable;
