"use client";
import React from "react";
import { Box, IconButton, TextField } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import useNumberStepper from "./NumberStepper.hook";
import { NumberStepperProps } from "./NumberStepper.types";

const NumberStepper = (props: NumberStepperProps) => {
  const { value } = props;

  const { handleDecrease, handleIncrease, handleInputChange, min, max } =
    useNumberStepper(props);

  return (
    <Box display="flex" alignItems="center" gap={1} width="fit-content">
      <IconButton onClick={handleDecrease} disabled={value <= min}>
        <Remove />
      </IconButton>
      <TextField
        type="number"
        value={value}
        size="small"
        onChange={handleInputChange}
        slotProps={{
          htmlInput: { min, max, style: { textAlign: "center", width: 50 } },
        }}
      />
      <IconButton onClick={handleIncrease} disabled={value >= max}>
        <Add />
      </IconButton>
    </Box>
  );
};

export default NumberStepper;
