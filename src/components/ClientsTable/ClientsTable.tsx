//libs
import { useEffect, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
//utils
import removeDuplicates from "utils/removeDuplicates"
//components
import TableList from "components/TableList/TableList"
import ErrorMessage from "components/ErrorMessage/ErrorMessage"
//redux
import { fetchClients, deleteClient } from "reduxFolder/slices/ClientsSlice"
import { fetchProjects } from "reduxFolder/slices/ProjectsSlice"
import { setEditClient } from "reduxFolder/slices/PagesStateSlice"
import { setClientsTableSearchTerm, setClientsTableFilterTerm, setClientsTableSortTerm } from "reduxFolder/slices/TableFiltersSlice"
import { clientsSelector } from "reduxFolder/selectors"
//types
import { RootStateType, AppDispatch, TableListProps, SearchTermType, FilterTermType, SortTermType } from "types/index"
//styles
import { Container } from "./styles"
//images
import spiner from "assets/icons/spinner.svg"
import deleteIcon from "assets/icons/deleteIcon.svg"


const order = ['name', 'project', 'status', 'phone', 'email', 'role', 'edit', 'delete'],
    listType = "clients",
    width = [180, 198, 180, 180, 198, 198, 150, 80]

const ClientsTable = () => {
    const filteredClients = useSelector(clientsSelector)
    const clients = useSelector((state: RootStateType) => state.Clients.clients)
    const projects = useSelector((state: RootStateType) => state.Projects.projects)
    const clientsLoadingStatus = useSelector((state: RootStateType) => state.Clients.fetchClientsLoadingStatus)
    const searchTerm = useSelector((state: RootStateType) => state.TableFilters.clientsSearchTerm)
    const filterTerm = useSelector((state: RootStateType) => state.TableFilters.clientsFilterValue)
    const sortTerm = useSelector((state: RootStateType) => state.TableFilters.clientsSortValue)
    const dispatch = useDispatch<AppDispatch>()


    const names: TableListProps['names'] = useMemo(() => {
        return [
            {
                name: 'Kundenname',
                sort: [{ name: 'Sort ascending', value: "inc" }, { name: 'Sort descending', value: "dec" }],
                setSort: (arg: SortTermType) => dispatch(setClientsTableSortTerm(arg)),
                sortTerm,
                keyName: 'name',
                search: true,
                searchTerm,
                setSearch: (arg: SearchTermType) => dispatch(setClientsTableSearchTerm(arg)),
                options: removeDuplicates(clients.map(({ name }) => ({ name: name, value: name }))),
                setOption: (arg: FilterTermType) => dispatch(setClientsTableFilterTerm(arg)),
                filterTerm,
                placeholder: 'Geben Sie den Namen'
            }, {
                name: 'Projektname',
                keyName: 'project',
                sort: [{ name: 'Sort ascending', value: "inc" }, { name: 'Sort descending', value: "dec" }],
                setSort: (arg: SortTermType) => dispatch(setClientsTableSortTerm(arg)),
                sortTerm,
                options: removeDuplicates([...projects.map(({ name }) => ({
                    name: name ? name : "N/A",
                    value: name ? name : "N/A",
                })), { name: "N/A", value: "N/A" }]),
                setOption: (arg: FilterTermType) => dispatch(setClientsTableFilterTerm(arg)),
                filterTerm,
                search: true,
                searchTerm,
                setSearch: (arg: SearchTermType) => dispatch(setClientsTableSearchTerm(arg)),
                placeholder: 'Geben Sie den Namen'
            }, {
                keyName: 'status',
                name: 'Projektstatus',
                sort: [{ name: 'Sort ascending', value: "inc" }, { name: 'Sort descending', value: "dec" }],
                setSort: (arg: SortTermType) => dispatch(setClientsTableSortTerm(arg)),
                sortTerm,
                setOption: (arg: FilterTermType) => dispatch(setClientsTableFilterTerm(arg)),
                filterTerm,
                options: [{ name: "Abgeschlossen", value: 'Abgeschlossen' }, { name: "In Arbeit", value: 'In Arbeit' }, { name: "Geplant", value: 'Geplant' }],
            }, {
                name: 'Rufnummer',
                keyName: 'phone',
                options: removeDuplicates(clients.map(({ phone }) => ({ name: phone, value: phone }))),
                setOption: (arg: FilterTermType) => dispatch(setClientsTableFilterTerm(arg)),
                filterTerm,
                search: true,
                searchTerm,
                setSearch: (arg: SearchTermType) => dispatch(setClientsTableSearchTerm(arg)),
                placeholder: '+49 30 8888 8888'
            }, {
                name: 'Email',
                keyName: 'email',
                sort: [{ name: 'Sort ascending', value: "inc" }, { name: 'Sort descending', value: "dec" }],
                setSort: (arg: SortTermType) => dispatch(setClientsTableSortTerm(arg)),
                sortTerm,
                options: removeDuplicates(clients.map(({ email }) => ({ name: email, value: email }))),
                setOption: (arg: FilterTermType) => dispatch(setClientsTableFilterTerm(arg)),
                filterTerm,
                search: true,
                searchTerm,
                setSearch: (arg: SearchTermType) => dispatch(setClientsTableSearchTerm(arg)),
                placeholder: 'example@gmail.com'
            }, {
                name: 'Rolle', sort: [{ name: 'Sort ascending', value: "inc" }, { name: 'Sort descending', value: "dec" }],
                setSort: (arg: SortTermType) => dispatch(setClientsTableSortTerm(arg)),
                sortTerm,
                options: removeDuplicates(clients.map(({ role }) => ({ name: role, value: role }))),
                setOption: (arg: FilterTermType) => dispatch(setClientsTableFilterTerm(arg)),
                filterTerm,
                keyName: 'role',
                search: true,
                searchTerm,
                setSearch: (arg: SearchTermType) => dispatch(setClientsTableSearchTerm(arg)),
                placeholder: 'Manager'
            },
            "Bearbeiten",
            "Löschen"]
        // eslint-disable-next-line
    }, [clients, searchTerm, filterTerm, sortTerm, projects])

    useEffect(() => {
        if (!clients.length) dispatch(fetchClients())
        if (!projects.length) dispatch(fetchProjects())
        // eslint-disable-next-line
    }, [])

    const mapedData = filteredClients.map(item => ({
        ...item,
        edit: {
            name: "Edit",
            onChange: () => {
                dispatch(setEditClient(item.id))
            }
        },
        delete: {
            name: deleteIcon,
            onChange: () => dispatch(deleteClient(item.id))
        }
    }))

    const content = clientsLoadingStatus === "idle" ? <TableList listType={listType} order={order} names={names} width={width} data={mapedData} /> : null
    const error = clientsLoadingStatus === 'error' ? <ErrorMessage /> : null
    const loading = clientsLoadingStatus === 'loading' ? <img className="spiner" src={spiner} alt="" /> : null

    return (
        <Container>
            {content}
            {error}
            {loading}
        </Container>
    )
}

export default ClientsTable