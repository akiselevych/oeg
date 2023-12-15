import { FC, useEffect, useMemo } from "react"
import {
    Container,
    DayEventsWrapper,
    EventTitle,
    EventWrapper,
    StartedDate,
    SubTitle,
    Title,
} from "components/UpcomingEvents/styles"
import moment from "moment"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootStateType } from "types/index";
import { fetchUpcomingEvents } from "reduxFolder/slices/EventsSlice";

const UpcomingEvents: FC = () => {
    const events = useSelector((state: RootStateType) => state.Events.events);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        if (events.length === 0) {
            dispatch(fetchUpcomingEvents());
        }
        // eslint-disable-next-line
    }, []);

    const sortedEvents = useMemo(() => {
        return [...events].filter(e => moment(e.end_date).isAfter(moment())).sort((a, b) => moment(a.end_date).diff(moment(b.end_date)))
    }, [events])

    const startedDateFormat = (date: string) => {
        return moment(date, "YYYY-MM-DD").format("MMM, DD")
    }

    const handleSubTitle = (endDate: string) => {
        const today = moment().format("YYYY-MM-DD")
        const tomorrow = moment().add(1, "day").format("YYYY-MM-DD")
        if (moment(endDate).format("YYYY-MM-DD") === today) {
            return "Heute"
        } else if (moment(endDate).format("YYYY-MM-DD") === tomorrow) {
            return "Morgen"
        } else {
            return moment(endDate).format("MMM, DD")
        }
    }

    return (
        <Container>
            <Title>Kommende Aufgaben</Title>
            {sortedEvents.map(({ end_date }, index) => {
                if (sortedEvents[index].end_date === sortedEvents[index - 1]?.end_date) {
                    return null
                }
                return (
                    <div key={index}>
                        <SubTitle>{handleSubTitle(end_date)}</SubTitle>
                        <DayEventsWrapper>
                            {sortedEvents
                                .filter((eventInOneDay) => eventInOneDay.end_date === end_date)
                                .map((eventInOneDay) => (
                                    <EventWrapper key={eventInOneDay.id}>
                                        <EventTitle>{eventInOneDay.name}</EventTitle>
                                        <StartedDate>
                                            Datum des Beginns: {startedDateFormat(eventInOneDay.start_date)}
                                        </StartedDate>
                                    </EventWrapper>
                                ))}
                        </DayEventsWrapper>
                    </div>
                )
            })}
        </Container>
    )
}

export default UpcomingEvents
