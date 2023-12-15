import { useEffect, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import moment from "moment"
//redux
import { projectFilteredInternalExpensesOn5StepSelector, projectInternalExpensesSelector } from "reduxFolder/selectors"
import { setProjectInternalExpensesOn5StepFilterTerm, setProjectInternalExpensesOn5StepSearchTerm, setProjectInternalExpensesOn5StepSortTerm } from "reduxFolder/slices/TableFiltersSlice"
import { fetchInternalExpenses } from "reduxFolder/slices/InternalExpensesSlice"
//types
import { TableListProps, RootStateType, AppDispatch } from "types/index"
//utils
import removeDuplicates from "utils/removeDuplicates"
//components
import ErrorMessage from "components/ErrorMessage/ErrorMessage"
import TableList from "components/TableList/TableList"
//styles
import { Container } from "./styles"
//impages
import spiner from "assets/icons/spinner.svg"

const order = ['description', 'amount', 'date'],
    listType = "ProjectInternalExpensesTable",
    width = [178, 180, 120, 140]

const ProjectExpendituresOverviewTable = () => {
    const fetchInternalExpensesLoadingStatus = useSelector((state: RootStateType) => state.InternalExpenses.fetchInternalExpensesLoadingStatus)
    const filteredExpenses = useSelector(projectFilteredInternalExpensesOn5StepSelector)
    const projectExpenses = useSelector(projectInternalExpensesSelector)
    const allExpenses = useSelector((state: RootStateType) => state.InternalExpenses.internalExpenses)
    const searchTerm = useSelector((state: RootStateType) => state.TableFilters.projectInternalExpensesOn5StepSearchTerm)
    const filterTerm = useSelector((state: RootStateType) => state.TableFilters.projectInternalExpensesOn5StepFilterValue)
    const sortTerm = useSelector((state: RootStateType) => state.TableFilters.projectInternalExpensesOn5StepSortValue)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (!allExpenses.length) dispatch(fetchInternalExpenses())
        // eslint-disable-next-line
    }, [])


    const names: TableListProps['names'] = useMemo(() => {
        return [
            'Ausgaben',
            'Betrag',
            {
                name: 'Datum', sort: [{ name: 'Sort ascending', value: "inc" }, { name: 'Sort descending', value: "dec" }],
                keyName: 'date',
                setSort: (arg) => dispatch(setProjectInternalExpensesOn5StepSortTerm(arg)),
                options: removeDuplicates(projectExpenses.map(expense => ({ name: expense.date, value: expense.date }))),
                setOption: (arg) => dispatch(setProjectInternalExpensesOn5StepFilterTerm(arg)),
                setSearch: (arg) => dispatch(setProjectInternalExpensesOn5StepSearchTerm(arg)),
                search: true,
                searchTerm,
                sortTerm,
                filterTerm,
                placeholder: 'Geben Sie den Namen'
            },
        ]
        // eslint-disable-next-line
    }, [searchTerm, filterTerm, sortTerm, allExpenses])

    const mapedData = filteredExpenses.map(item => ({ ...item, date: moment(item.date).format("DD/MM/YYYY") }))


    const content = fetchInternalExpensesLoadingStatus === "idle" ? <TableList listType={listType} order={order} names={names} width={width} data={mapedData} /> : null
    const error = fetchInternalExpensesLoadingStatus === 'error' ? <ErrorMessage /> : null
    const loading = fetchInternalExpensesLoadingStatus === 'loading' ? <img className="spiner" src={spiner} alt="" /> : null

    return (
        <Container>
            {content}
            {error}
            {loading}
        </Container>
    )
}

export default ProjectExpendituresOverviewTable