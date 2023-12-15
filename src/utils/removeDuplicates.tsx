
const removeDuplicates = (data: { name: string | number, value: string | number }[]) => {
    const uniqueNames: { [name: string | number]: boolean } = {};
    const result: { name: string | number; value: string | number }[] = [];

    for (const item of data) {
        if (!uniqueNames[item.name]) {
            uniqueNames[item.name] = true;
            result.push(item);
        }
    }

    return result;
}

export default removeDuplicates