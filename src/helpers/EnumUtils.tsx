export const EnumUtils = 
{
    getByValue: <T extends { value: number }>(map: Map<string, T>, value?: number) => 
    {
        const res = Object.entries(map).filter(([key, val]) => val.value === value);
        return res.length > 0 ? res[0][0] : undefined; 
    }
}