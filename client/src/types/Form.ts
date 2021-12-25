export type Validator = (inputValue: string, inputLabel: string) => { isValid: boolean; message: string };

export interface Input {
  id: string;
  value: string;
  isValid: boolean;
  isTouched: boolean;
  errorMessage: string;
}

export interface InputsMap {
  [key: string]: Input;
}

export interface Form {
  inputs: InputsMap;
  isValid: boolean;
}
