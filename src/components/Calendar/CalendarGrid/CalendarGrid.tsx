import {FC} from "react"
import Days from "./Days"
import {CalendarGridWrapper} from "./styles"

const CalendarGrid: FC<{
    handleClickModal: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}> = ({handleClickModal}) => {
    return (
        <CalendarGridWrapper>
            <Days handleClickModal={handleClickModal} />
        </CalendarGridWrapper>
    )
}

export default CalendarGrid
