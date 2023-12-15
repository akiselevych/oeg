import { SortTermType } from "types/index";


export const sortBySortTerm = (data: { [key: string]: any }[], searchTerm: SortTermType) => {
    const [sortKey, sortOrder] = Object.entries(searchTerm)[0];

    return [...data].sort((a, b) => {
        const valueA = a[sortKey];
        const valueB = b[sortKey];

        if (typeof valueA === 'number' && typeof valueB === 'number') {
            return sortOrder === 'inc' ? valueA - valueB : valueB - valueA;
        } else if (typeof valueA === 'string' && typeof valueB === 'string') {
            return sortOrder === 'inc'
                ? valueA.localeCompare(valueB)
                : valueB.localeCompare(valueA);
        } else if (
            typeof valueA === 'object' && valueA !== null &&
            typeof valueB === 'object' && valueB !== null &&
            'name' in valueA && 'name' in valueB
        ) {
            const nameA = valueA.name.toString();
            const nameB = valueB.name.toString();
            return sortOrder === 'inc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
        }
        else {
            return 0;
        }
    });
};

