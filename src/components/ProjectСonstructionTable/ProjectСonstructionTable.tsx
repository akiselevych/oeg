import { useMemo, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
//redux
import { filteredProjectСonstructionSelector, projectEventsSelector } from "reduxFolder/selectors"
import { fetchEmployees } from "reduxFolder/slices/EmployeesSlice"
import { changeEvent, fetchEvents, fetchProjectEvent } from "reduxFolder/slices/EventsSlice"
import {
    setProjectConstructionTableSortTerm,
    setProjectConstructionTableSearchTerm,
    setProjectConstructionTableFilterTerm
} from "reduxFolder/slices/TableFiltersSlice"
//utils
import removeDuplicates from "utils/removeDuplicates"
//types
import { TableListProps, RootStateType, AppDispatch, EmployeeType } from "types/index"
//components
import ErrorMessage from "components/ErrorMessage/ErrorMessage"
import TableList from "components/TableList/TableList"
//styles
import { Container } from "./styles"
//impages
import spiner from "assets/icons/spinner.svg"

const order = ['name', 'start_date', 'description', 'timeline'],
    listType = "ProjectСonstructionTable",
    width = [198, 110, 140, 135, 180, 140]

const ProjectСonstructionTable = () => {
    const currentProject = useSelector((state: RootStateType) => state.Projects.currentProject)
    const fetchInvoicesLoadingStatus = useSelector((state: RootStateType) => state.Events.fetchSpecialProjectEventssLoadingStatus)
    const filteredEvents = useSelector(filteredProjectСonstructionSelector) as { [key: string]: any }[]
    const projectEvents = useSelector((state: RootStateType) => state.Events.specialProjectEvents).events
    const allEvents = useSelector((state: RootStateType) => state.Events.events)
    const searchTerm = useSelector((state: RootStateType) => state.TableFilters.ProjectConstructionTableSearchTerm)
    const filterTerm = useSelector((state: RootStateType) => state.TableFilters.ProjectConstructionTableFilterValue)
    const sortTerm = useSelector((state: RootStateType) => state.TableFilters.ProjectConstructionTableSortValue)
    const employees = useSelector((state: RootStateType) => state.Employees.employees)
    const dispatch = useDispatch<AppDispatch>()


    useEffect(() => {
        if (!allEvents.length) dispatch(fetchProjectEvent(currentProject!.id))
        if (!employees.length) dispatch(fetchEmployees())
        // eslint-disable-next-line
    }, [])

    const names: TableListProps['names'] = useMemo(() => {
        return [
            {
                name: 'Name der Ereignis', sort: [{ name: 'Sort ascending', value: "inc" }, { name: 'Sort descending', value: "dec" }],
                keyName: 'name',
                setSort: (arg) => dispatch(setProjectConstructionTableSortTerm(arg)),
                sortTerm,
                options: projectEvents.map(({ name }) => ({ name: name, value: name })),
                filterTerm,
                setOption: (arg) => dispatch(setProjectConstructionTableFilterTerm(arg)),
                setSearch: (arg) => dispatch(setProjectConstructionTableSearchTerm(arg)),
                search: true,
                searchTerm,
                placeholder: 'Geben Sie den Namen'
            },
            {
                name: 'Datum', sort: [{ name: 'Sort ascending', value: "inc" }, { name: 'Sort descending', value: "dec" }],
                keyName: 'start_date',
                setSort: (arg) => dispatch(setProjectConstructionTableSortTerm(arg)),
                sortTerm,
                options: removeDuplicates(projectEvents.map(({ start_date }) => ({ name: start_date, value: start_date }))),
                filterTerm,
                setOption: (arg) => dispatch(setProjectConstructionTableFilterTerm(arg)),
                setSearch: (arg) => dispatch(setProjectConstructionTableSearchTerm(arg)),
                search: true,
                searchTerm,
                placeholder: '00/00/0000'
            },
            'Noten',
            "Zum Kalender"
        ]
        // eslint-disable-next-line
    }, [sortTerm, searchTerm, filterTerm, projectEvents])

    const mapedEvents = filteredEvents.map(event => ({
        ...event,
        description: {
            name: event.description,
            onChange: (arg: string) => dispatch(changeEvent({
                id: event.id,
                description: arg
            }))
        }
    }))


    const content = fetchInvoicesLoadingStatus === "idle" ? <TableList listType={listType} order={order} names={names} width={width} data={mapedEvents} /> : null
    const error = fetchInvoicesLoadingStatus === 'error' ? <ErrorMessage /> : null
    const loading = fetchInvoicesLoadingStatus === 'loading' ? <img className="spiner" src={spiner} alt="" /> : null

    return (
        <Container>
            {content}
            {error}
            {loading}
        </Container>
    )
}

export default ProjectСonstructionTable