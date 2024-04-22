export const MULTIPLICATION = '×';
export const DIVISION = '÷';
export const SUBTRACTION = '-';
export const ADDITION = '+';
export const EQUALS = '=';
export const SQUARE_ROOT = '√x';
export const SQUARED = 'x²';
export const FRACTION = '1/x';
export const PERCENTAGE = '%';
export const CLEAR_ENTRY = 'CE';
export const CLEAR_ALL = 'C';
export const BACK_SPACE = '<=';
export const DECIMAL_POINT = '.';
export const CHANGE_SIGN = "+/-";

/* Memory functions */
export const MEMORY_CLEAR = 'MC';
export const MEMORY_RECALL = 'MR';
export const MEMORY_STORE = 'MS';
export const MEMORY_ADD = 'M+';
export const MEMORY_SUBTRACT = 'M-';

export const isMemoryFunction = (button: string): boolean => {
    return [MEMORY_CLEAR, MEMORY_RECALL, MEMORY_STORE, MEMORY_ADD, MEMORY_SUBTRACT].includes(button)
}