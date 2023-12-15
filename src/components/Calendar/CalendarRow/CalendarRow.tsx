//libs
import { FC, useMemo } from "react"
import moment from "moment"
import { v1 } from "uuid"
//components
import CalendarEvent from "../CalendarEvent"
//styles
import {
  Calendar,
  Day,
  DayEventsWrapper,
  DayEvent,
} from "components/Calendar/CalendarRow/styles"
//redux
import { useSelector } from "react-redux"
//types
import { EventType, RootStateType } from "types"
//hooksZz
import { useActions } from "hooks/useActions"
import "moment/locale/de"

export const handleStatus = (event: EventType) => {
	if (moment(event.end_date).isBefore(moment())) {
		return "Abgeschlossen"
	} else if (moment(event.start_date).isSameOrBefore(moment())) {
		return "In Arbeit"
	}
	return "Geplant"
}

const CalendarRow: FC<{
  handleClickModal: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}> = ({ handleClickModal }) => {
  const currentDate = useSelector(
    (state: RootStateType) => state.Calendar.currentDate
  )
  const search = useSelector((state: RootStateType) => state.Calendar.search)
  const rawEvents = useSelector((state: RootStateType) => state.Events.events)
  const customersFilter = useSelector(
    (state: RootStateType) => state.Calendar.customersFilter
  )

  const { setCurrentDate } = useActions()

  const startDay = moment(currentDate).subtract(5, "day")
  const day = startDay.clone()
  const daysArray = useMemo(
    () => [...Array(7)].map(() => day.add(1, "day").clone()),
    //eslint-disable-next-line
    [currentDate]
  )

  const filteredEvents = rawEvents.filter((e) => {
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

  const sortedEvents = searchEvents.sort((a, b) =>
    moment(a.start_date).diff(moment(b.start_date))
  )

  const topOffset = 110
  let maxCount = 0
  const AdjustedEvents = useMemo(() => {
    const layers: EventType[][] = []
    return sortedEvents.map((event) => {
      const eventStart = moment(event.start_date)
      const eventEnd = moment(event.end_date).add(1, "day")

      let assignedLayer = -1

      for (let i = 0; i < layers.length; i++) {
        const isOverlapping = layers[i].some((processedEvent) => {
          const processedStart = moment(processedEvent.start_date)
          const processedEnd = moment(processedEvent.end_date).add(1, "day")

          return (
            eventStart.isBefore(processedEnd) && eventEnd.isAfter(processedStart)
          )
        })

        if (!isOverlapping) {
          assignedLayer = i
          layers[i].push(event)
          break
        }
      }

      if (assignedLayer === -1) {
        layers.push([event])
        assignedLayer = layers.length - 1
      }
      //eslint-disable-next-line
      maxCount = layers.length

      return { ...event, topPosition: topOffset * assignedLayer }
    })
  }, [sortedEvents])

  const Days = daysArray.map((day) => {
    const dayEvents = AdjustedEvents.filter(
      (event) => event.start_date === day.format("YYYY-MM-DD")
    )

    const DayEvents = dayEvents.map((event) => {
      const status = handleStatus(event)
      return <CalendarEvent key={v1()} {...event} status={status} />
    })

    return (
      <Day key={v1()}>
        <div
          className="day-wrapper"
          onClick={() => setCurrentDate(moment(day).format("YYYY-MM-DD"))}
        >
          <span className={moment(day).isSame(currentDate, "date") ? "today" : ""}>
            {day.locale("de").format("MMM, D").replaceAll(".", "")}
          </span>
        </div>

        <DayEventsWrapper
          $additionalHeight={topOffset * (maxCount >= 5 ? maxCount - 4 : 0)}
          onClick={handleClickModal}
        >
          <DayEvent>{DayEvents}</DayEvent>
        </DayEventsWrapper>
      </Day>
    )
  })

  return <Calendar>{Days}</Calendar>
}

export default CalendarRow
