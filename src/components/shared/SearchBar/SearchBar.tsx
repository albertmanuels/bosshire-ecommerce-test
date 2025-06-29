import React from "react";

import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";

import { SearchBarProps } from "./SearchBar.types";

const SearchBar = (props: SearchBarProps) => {
  const {
    value,
    onChange,
    placeholder = "Search items...",
    ...delegated
  } = props;
  return (
    <TextField
      fullWidth
      size="small"
      variant="outlined"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
      {...delegated}
    />
  );
};

export default SearchBar;
