/* ObjectUtils defines functions that are used on objects */
export const ObjectUtils = {
    isNumber(obj: any): boolean {
      return typeof obj === 'number';
    },
    isPositiveNumber(obj: any): boolean {
      return this.isNumber(obj) && obj > 0;
    },
    isZeroOrPositiveNumber(obj: any): boolean {
      return typeof obj === 'number' && obj >= 0;
    },
    isBoolean(obj: any): boolean {
      return typeof obj === 'boolean';
    },
    isString(obj: any): boolean {
      return typeof obj === 'string';
    },
    parseJson: (
      text: string,
      reviver?: ((this: any, key: string, value: any) => any) | undefined,
    ) => {
      try {
        return JSON.parse(text, reviver);
      } catch (error) {
        return undefined;
      }
    },
};
  