import moment from "moment"
import { FC, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootStateType } from "types/index"
import { generateDaysArray } from "utils/generateDaysArray"
import { eventIndicatorColor } from "../CalendarEvent"
import { handleStatus } from "../CalendarRow/CalendarRow"
import { fetchEventByID, setIsEdit } from "reduxFolder/slices/EventsSlice"

const daysOfWeek = {
  0: "Montag",
  1: "Dienstag",
  2: "Mittwoch",
  3: "Donnerstag",
  4: "Freitag",
  5: "Samstag",
  6: "Sonntag",
}

const Days: FC<{
  handleClickModal: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}> = ({ handleClickModal }) => {
  const dispatch = useDispatch<AppDispatch>()

  const currentDate = useSelector(
    (state: RootStateType) => state.Calendar.currentDate
  )

  const search = useSelector((state: RootStateType) => state.Calendar.search)
  const customersFilter = useSelector(
    (state: RootStateType) => state.Calendar.customersFilter
  )
  const events = useSelector((state: RootStateType) => state.Events.events)

  const daysArray = useMemo(() => generateDaysArray(currentDate), [currentDate])

	const filteredEvents = events.filter((e) => {
    if (customersFilter.length === 0) {
      return moment(e.start_date).isBetween(
        daysArray[0],
        daysArray[daysArray.length - 1],
        undefined,
        "[]"
      )
    }
    return (
      // eslint-disable-next-line
      customersFilter.some((c) => c == String(e.project.customer)) &&
      moment(e.start_date).isBetween(
        daysArray[0],
        daysArray[daysArray.length - 1],
        undefined,
        "[]"
      )
    )
  })
  const searchEvents = filteredEvents.filter((e) => {
    return e.name.toLowerCase().startsWith(search.trim().toLowerCase())
  })

  const Days = daysArray.map((d, i) => {
    const EventsForDay = searchEvents
      .filter((e) => moment(e.start_date).isSame(d, "day"))
      .map((e) => (
        <div
          key={e.id}
          className="event"
          onClick={() => {
            dispatch(setIsEdit(true))
            dispatch(fetchEventByID(e.id))
          }}
        >
          <div
            className="bar"
            style={{
              backgroundColor:
                eventIndicatorColor[
                  handleStatus(e)
                    .toLocaleLowerCase()
                    .replace(/\s+/g, "") as keyof typeof eventIndicatorColor
                ],
            }}
          />
          <div className="field">{e.name}</div>
        </div>
      ))

    return (
      <div key={i} className="day" onClick={handleClickModal}>
        {i < 7 && (
          <div className="dayOfWeek">{daysOfWeek[i as keyof typeof daysOfWeek]}</div>
        )}
        <div className="events">{EventsForDay}</div>
        <span
          className={
            !d.isSame(moment(), "month")
              ? "notCurrentMonth"
              : d.format("YYYY-MM-DD") === moment().format("YYYY-MM-DD")
              ? "today"
              : ""
          }
        >
          {+d.format("D") === 1 ? d.format("D MMM.") : d.format("D")}
        </span>
      </div>
    )
  })

  return <>{Days}</>
}

export default Days
