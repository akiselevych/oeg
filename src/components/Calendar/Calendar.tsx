//libs
import { FC, useEffect } from "react"
//components
import CalendarRow from "components/Calendar/CalendarRow/CalendarRow"
import CalendarHeader from "components/Calendar/CalendarHeader/CalendarHeader"
import { useDispatch } from "react-redux"
import { getCustomers } from "reduxFolder/slices/Calendar.slice"
import { AppDispatch } from "types"
import CalendarGrid from "./CalendarGrid/CalendarGrid"

type PropsType = {
  isDisplayGridCalendar: boolean
  handleClickModal: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const Calendar: FC<PropsType> = ({ isDisplayGridCalendar, handleClickModal }) => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getCustomers())
  }, [])

  return (
    <>
      <CalendarHeader />
      {isDisplayGridCalendar ? (
        <CalendarGrid handleClickModal={handleClickModal}/>
      ) : (
        <CalendarRow handleClickModal={handleClickModal} />
      )}
    </>
  )
}

export default Calendar
