import { ChangeEvent } from 'react'
import { NumberStepperProps } from './NumberStepper.types';

const useNumberStepper = (props: NumberStepperProps) => {
  const {onChange, value, max = 99, min = 1} = props

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

  return {
    handleDecrease,
    handleIncrease,
    handleInputChange,
    min,
    max
  }
}

export default useNumberStepper
