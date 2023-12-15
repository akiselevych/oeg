
function filterByTimePeriod(data: { [key: string]: string }[], period: string, date: Date) {
    switch (period) {
        case "all":
            return data
        case "week":
            return data.filter(obj => new Date(obj.date) <= date && new Date(obj.date) >= new Date(date.getTime() - 604800000))
        case "month":
            return data.filter(obj => new Date(obj.date) <= date && new Date(obj.date) >= new Date(date.getTime() - 2629800000))
        case "3 month":
            return data.filter(obj => new Date(obj.date) <= date && new Date(obj.date) >= new Date(date.getTime() - (2629800000 * 3)))
        case "6 month":
            return data.filter(obj => new Date(obj.date) <= date && new Date(obj.date) >= new Date(date.getTime() - (2629800000 * 6)))
        case "9 month":
            return data.filter(obj => new Date(obj.date) <= date && new Date(obj.date) >= new Date(date.getTime() - (2629800000 * 9)))
        case "year":
            return data.filter(obj => new Date(obj.date) <= date && new Date(obj.date) >= new Date(date.getTime() - 31557600000))
        default:
            return data

    }

}

export default filterByTimePeriod