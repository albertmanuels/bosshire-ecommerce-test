export type NumberStepperProps = {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
};