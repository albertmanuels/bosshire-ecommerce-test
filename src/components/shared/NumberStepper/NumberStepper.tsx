import React, { ChangeEvent } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

type NumberStepperProps = {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
};

const NumberStepper = (props: NumberStepperProps) => {
  const { value, onChange, min = 1, max = 99 } = props;

  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

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
