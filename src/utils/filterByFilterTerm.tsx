import { FilterTermType } from "types/index"

export const filterByFilterTerm = (data: { [key: string]: any }[], filterTerm: FilterTermType) => {
    if (filterTerm === null) return data;
    const [filterKey, filterValue] = Object.entries(filterTerm)[0];

    return data.filter((item) => {
        const itemValue = item[filterKey];
        if (
            typeof itemValue === 'object' && itemValue !== null &&
            'name' in itemValue && typeof itemValue.name === 'string'
        ) {
            return itemValue.name === filterValue;
        } else {
            return itemValue === filterValue;
        }

    });
};
