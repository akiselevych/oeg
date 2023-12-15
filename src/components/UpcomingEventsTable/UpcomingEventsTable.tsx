//libs
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
//components
//redux
import { fetchUpcomingEvents } from "reduxFolder/slices/EventsSlice"
import { fetchEmployees } from "reduxFolder/slices/EmployeesSlice"
import { fetchProjects } from "reduxFolder/slices/ProjectsSlice"
import { upcomingEventsSelector } from "reduxFolder/selectors"
//components
import TableList from "components/TableList/TableList"
import ErrorMessage from "components/ErrorMessage/ErrorMessage"
//utils
//types
import { RootStateType, AppDispatch } from "types/index"
//styles
import { Container, H3 } from "./styles"
//images
import spiner from "assets/icons/spinner.svg"


const names = [{ name: 'Name des Ereignisses', keyName: 'name' }, { name: 'Projekt', keyName: 'project' }, { name: 'Startdatum', keyName: 'start_date' }, { name: 'Enddatum', keyName: 'end_date' }, { name: 'Verantwortlicher', keyName: 'employee' }],
    order = ['name', 'project', 'start_date', 'end_date', 'employees'],
    listType = "Upcoming events",
    width = [190, 198, 120, 120, 240]


const UpcomingEventsTable = () => {
    const filteredEvents = useSelector(upcomingEventsSelector)
    const eventLoadingStatus = useSelector((state: RootStateType) => state.Events.fetchUpcomingEventsLoadingStatus)
    const employees = useSelector((state: RootStateType) => state.Employees.employees)
    const events = useSelector((state: RootStateType) => state.Events.upcomingEvents)
    const projects = useSelector((state: RootStateType) => state.Projects.projects)
    const dispatch = useDispatch<AppDispatch>()



    useEffect(() => {
        if (!events.length) dispatch(fetchUpcomingEvents())
        if (!employees.length) dispatch(fetchEmployees())
        if (!projects.length) dispatch(fetchProjects())
        //eslint-disable-next-line
    }, [])



    const content = eventLoadingStatus === "idle" ? <TableList width={width} names={names} order={order} listType={listType} data={filteredEvents} />
        : null
    const error = eventLoadingStatus === 'error' ? <ErrorMessage /> : null
    const loading = eventLoadingStatus === 'loading' ? <img className="spiner" src={spiner} alt="" /> : null
    return (
        <Container>
            <div className="header">
                <H3>Kommende Ereignisse</H3>
            </div>
            {content}
            {error}
            {loading}
        </Container>
    )
}

export default UpcomingEventsTable