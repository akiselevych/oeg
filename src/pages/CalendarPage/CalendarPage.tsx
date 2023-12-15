//libs
import React, { CSSProperties, MouseEvent, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
//styles
import {
  BodyWrapper,
  CalendarToggleWrapper,
  CalendarWrapper,
  Container,
  EventsWrapper,
  Title,
} from "pages/CalendarPage/styles"
//components
import Calendar from "components/Calendar/Calendar"
import UpcomingEvents from "components/UpcomingEvents/UpcomingEvents"
import EventModal from "components/EventModal/EventModal"
//types
import { AppDispatch } from "types/index"
//redux
import { fetchEmployees } from "reduxFolder/slices/EmployeesSlice"
import { fetchEvents } from "reduxFolder/slices/EventsSlice"
import { fetchSuppliersWorkers } from "reduxFolder/slices/SuppliersSlice"
import Toggle from "components/Toggle/Toggle"

const CalendarPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [isModal, setIsModal] = useState<boolean>(false)
  const [modalPosition, setModalPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })

  const [isDisplayGridCalendar, setIsDisplayGridCalendar] = useState(true)

  useEffect(() => {
    dispatch(fetchEmployees())
    dispatch(fetchEvents())
    dispatch(fetchSuppliersWorkers())
  }, [])

  const handleClickModal = (e: MouseEvent) => {
    setModalPosition({ x: e.screenX, y: e.screenY })
    setIsModal(true)
  }

  const modalStyle: CSSProperties = {
    top: `${modalPosition.y * 0.5}px`,
    left: `${modalPosition.x * 0.5}px`,
  }

  return (
    <Container>
      <Title>Kalender</Title>

      <CalendarToggleWrapper>
        <Toggle
				currentValue={isDisplayGridCalendar}
          values={{
            valueTrue: "Monat",
            valueFalse: "Woche",
          }}
          setDisplayValue={setIsDisplayGridCalendar}
        />
      </CalendarToggleWrapper>
      <BodyWrapper>
        <CalendarWrapper>
          <Calendar
            isDisplayGridCalendar={isDisplayGridCalendar}
            handleClickModal={handleClickModal}
          />
        </CalendarWrapper>
        <EventsWrapper>
          <UpcomingEvents />
        </EventsWrapper>
      </BodyWrapper>

      {isModal && (
        <EventModal
          style={modalStyle}
          insideProject={false}
          setIsModal={setIsModal}
        />
      )}
    </Container>
  )
}

export default CalendarPage
