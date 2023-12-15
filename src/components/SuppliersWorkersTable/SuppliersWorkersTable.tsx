//libs
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useMemo } from "react"
//components
import ErrorMessage from "components/ErrorMessage/ErrorMessage"
import TableList from "components/TableList/TableList"
//utils
import removeDuplicates from "utils/removeDuplicates"
//redux
import { setEditSupplier } from "reduxFolder/slices/PagesStateSlice"
import { fetchSuppliersWorkers } from "reduxFolder/slices/SuppliersSlice"
import {
    setSuppliersWorkesTableSearchTerm,
    setSuppliersWorkesTableFilterTerm,
    setSuppliersWorkesTableSortTerm,
} from "reduxFolder/slices/TableFiltersSlice"
import { suppliersWorkersSelector } from "reduxFolder/selectors"
//styles
import { Container } from "./styles"
//types
import { TableListProps, RootStateType, AppDispatch, SearchTermType, FilterTermType, SortTermType } from "types/index"
//impages
import spiner from "assets/icons/spinner.svg"



const order = ['name', 'contactPerson', 'phone', 'email', 'wage', 'role', 'edit'],
    listType = "suppliers",
    width = [180, 180, 180, 198, 160, 198, 140]

const SuppliersWorkersTable = () => {
    const filtredSuppliers = useSelector(suppliersWorkersSelector) as { [key: string]: any }[]
    const suppliers = useSelector((state: RootStateType) => state.Suppliers.suppliersWorkers)
    const clientsLoadingStatus = useSelector((state: RootStateType) => state.Suppliers.fetchSuppliersWorkersLoadingStatus)
    const dispatch = useDispatch<AppDispatch>()
    const searchTerm = useSelector((state: RootStateType) => state.TableFilters.suppliersWorkersSearchTerm)
    const filterTerm = useSelector((state: RootStateType) => state.TableFilters.suppliersWorkersFilterValue)
    const sortTerm = useSelector((state: RootStateType) => state.TableFilters.suppliersWorkersSortValue)

    useEffect(() => {
        dispatch(fetchSuppliersWorkers())
        // eslint-disable-next-line
    }, [])

    const names: TableListProps['names'] = useMemo(() => {
        return [
            {
                name: 'Firmenname', sort: [{ name: 'Sort ascending', value: "inc" }, { name: 'Sort descending', value: "dec" }],
                keyName: 'name',
                setSort: (arg: SortTermType) => dispatch(setSuppliersWorkesTableSortTerm(arg)),
                sortTerm,
                options: removeDuplicates(suppliers.map(({ name }) => ({ name: name, value: name }))),
                setOption: (arg: FilterTermType) => dispatch(setSuppliersWorkesTableFilterTerm(arg)),
                filterTerm,
                searchTerm,
                setSearch: (arg: SearchTermType) => dispatch(setSuppliersWorkesTableSearchTerm(arg)),
                search: true,
                placeholder: 'Geben Sie den Namen'
            },
            {
                name: 'Kontaktperson', sort: [{ name: 'Sort ascending', value: "inc" }, { name: 'Sort descending', value: "dec" }],
                keyName: 'contactPerson',
                setSort: (arg: SortTermType) => dispatch(setSuppliersWorkesTableSortTerm(arg)),
                sortTerm,
                options: removeDuplicates(suppliers.map(({ contactPerson }) => ({ name: contactPerson, value: contactPerson }))),
                setOption: (arg: FilterTermType) => dispatch(setSuppliersWorkesTableFilterTerm(arg)),
                filterTerm,
                searchTerm,
                setSearch: (arg: SearchTermType) => dispatch(setSuppliersWorkesTableSearchTerm(arg)),
                search: true,
                placeholder: 'Geben Sie den Namen'
            },
            {
                name: 'Rufnummer',
                keyName: 'phoneNumber',
                options: removeDuplicates(suppliers.map(({ phone }) => ({ name: phone, value: phone }))),
                setOption: (arg: FilterTermType) => dispatch(setSuppliersWorkesTableFilterTerm(arg)),
                filterTerm,
                searchTerm,
                setSearch: (arg: SearchTermType) => dispatch(setSuppliersWorkesTableSearchTerm(arg)),
                search: true,
                placeholder: '+49 30 8888 8888'
            },
            {
                name: 'Email', sort: [{ name: 'Sort ascending', value: "inc" }, { name: 'Sort descending', value: "dec" }],
                keyName: 'email',
                setSort: (arg: SortTermType) => dispatch(setSuppliersWorkesTableSortTerm(arg)),
                sortTerm,
                options: removeDuplicates(suppliers.map(({ email }) => ({ name: email, value: email }))),
                setOption: (arg: FilterTermType) => dispatch(setSuppliersWorkesTableFilterTerm(arg)),
                filterTerm,
                searchTerm,
                setSearch: (arg: SearchTermType) => dispatch(setSuppliersWorkesTableSearchTerm(arg)),
                search: true,
                placeholder: 'example@gmail.com'
            },
            {
                name: 'Stundenlohn', sort: [{ name: 'Sort ascending', value: "inc" }, { name: 'Sort descending', value: "dec" }],
                keyName: 'wage',
                setSort: (arg: SortTermType) => dispatch(setSuppliersWorkesTableSortTerm(arg)),
                sortTerm,
                options: removeDuplicates(suppliers.map(({ wage }) => ({ name: wage, value: wage }))),
                setOption: (arg: FilterTermType) => dispatch(setSuppliersWorkesTableFilterTerm(arg)),
                filterTerm,
                searchTerm,
                setSearch: (arg: SearchTermType) => dispatch(setSuppliersWorkesTableSearchTerm(arg)),
                search: true,
                placeholder: '10'
            },
            {
                name: 'Role', sort: [{ name: 'Sort ascending', value: "inc" }, { name: 'Sort descending', value: "dec" }],
                keyName: 'role',
                setSort: (arg: SortTermType) => dispatch(setSuppliersWorkesTableSortTerm(arg)),
                sortTerm,
                options: removeDuplicates(suppliers.map(({ role }) => ({ name: role, value: role }))),
                setOption: (arg: FilterTermType) => dispatch(setSuppliersWorkesTableFilterTerm(arg)),
                filterTerm,
                searchTerm,
                setSearch: (arg: SearchTermType) => dispatch(setSuppliersWorkesTableSearchTerm(arg)),
                search: true,
                placeholder: 'Manager'
            },
            "Bearbeiten"
        ]
        // eslint-disable-next-line
    }, [suppliers, searchTerm, filterTerm, sortTerm])

    const mapedData = filtredSuppliers.map(item => ({
        ...item,
        edit: {
            name: "Edit",
            onChange: () => dispatch(setEditSupplier(item.id))
        },
        wage: item.wage + ' €'
    }))

    const content = clientsLoadingStatus === "idle" ? <TableList
        listType={listType}
        order={order}
        names={names}
        width={width}
        data={mapedData} /> : null
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

export default SuppliersWorkersTable