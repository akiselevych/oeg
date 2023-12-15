import { LoadingStatusType } from "types/index"

export const handleStatus = (status: LoadingStatusType, text: string | number | any[]) => {
    switch (status) {
        case "error":
            return "error"
        case 'loading':
            return "loading..."
        default:
            return text
    }
}