
const getStatusOnGerman = (arg: string) => {
    switch (arg) {
        case 'Completed':
            return 'Abgeschlossen'
        case 'In progress':
            return 'In Arbeit'
        case 'Planned':
            return 'Geplant'
        default:
            return 'Geplant'
    }
}

export default getStatusOnGerman