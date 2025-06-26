import React from "react";
import { InputAdornment, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";

type SearchBarProps = {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

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
