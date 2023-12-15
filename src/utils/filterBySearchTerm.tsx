import { SearchTermType } from "types/index"

export const filterBySearchTerm = (data: { [key: string]: any }[], searchTerm: SearchTermType) => {
    if (searchTerm === null) return data;
    const [searchKey, searchValue] = Object.entries(searchTerm)[0];

    return data.filter((item) => {
        const itemValue = item[searchKey];
        if (
            typeof itemValue === 'object' && itemValue !== null &&
            'name' in itemValue && typeof itemValue.name === 'string'
        ) {
            return itemValue.name.toLowerCase().includes(searchValue.toLowerCase());
        } else if (itemValue && typeof itemValue === 'string') {
            return itemValue.toLowerCase().includes(searchValue.toLowerCase());
        } else if (itemValue && typeof itemValue === 'number') {
            return (itemValue + '').toLowerCase().includes(searchValue.toLowerCase());
        }
        if (itemValue === null) {
            return "N/A".toLowerCase().includes(searchValue.toLowerCase());
        };

        return true;
    });
};
