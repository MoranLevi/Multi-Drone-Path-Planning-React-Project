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
    removeUnderFinedFields: (obj: any) => {
      Object.keys(obj).forEach((key) => {
        if (obj[key] === undefined) {
          delete obj[key];
        }
      });
      return obj;
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
  