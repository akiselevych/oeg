
const fiterByGeneralSearchTerm = (serchTerm: string, keys: string[], data: { [key: string]: any }[]) => {
    return data.filter(obj => {
        return keys.some(key => {
            if (
                typeof obj[key] === 'object' && obj[key] !== null &&
                'name' in obj[key] && typeof obj[key].name === 'string'
            ) {
                return obj[key].name.toLowerCase().includes(serchTerm.toLowerCase());
            } else if (obj[key] && typeof obj[key] === 'string') {
                return obj[key].toLowerCase().includes(serchTerm.toLowerCase());
            } else if (obj[key] && typeof obj[key] === 'number') {
                return (obj[key] + '').toLowerCase().includes(serchTerm.toLowerCase());
            }
            return true
        })
    })
}

export default fiterByGeneralSearchTerm