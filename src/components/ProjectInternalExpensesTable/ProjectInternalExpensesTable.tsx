import { useMemo, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import moment from "moment"
//redux
import { projectInternalExpensesSelector, projectFilteredInternalExpensesSelector } from "reduxFolder/selectors"
import { fetchInternalExpenses, addDocumentForInternalExpense } from "reduxFolder/slices/InternalExpensesSlice"
import { setProjectInternalExpensesFilterTerm, setProjectInternalExpensesSortTerm, setProjectInternalExpensesSearchTerm } from "reduxFolder/slices/TableFiltersSlice"
//types
import { TableListProps, RootStateType, AppDispatch } from "types/index"
//components
import ErrorMessage from "components/ErrorMessage/ErrorMessage"
import TableList from "components/TableList/TableList"
//styles
import { Container } from "./styles"
//impages
import spiner from "assets/icons/spinner.svg"


const order = ['description', 'category', 'amount', 'date', "upload", 'wiewDocument'],
    listType = "ProjectInternalExpensesTable",
    width = [178, 180, 120, 140, 140, 130]

const ProjectInternalExpensesTable = () => {
    const fetchInternalExpensesLoadingStatus = useSelector((state: RootStateType) => state.InternalExpenses.fetchInternalExpensesLoadingStatus)
    const allExpeneses = useSelector((state: RootStateType) => state.InternalExpenses.internalExpenses)
    const projectExpenses = useSelector(projectInternalExpensesSelector)
    const filteredExpenses = useSelector(projectFilteredInternalExpensesSelector)
    const searchTerm = useSelector((state: RootStateType) => state.TableFilters.projectInternalExpensesSearchTerm)
    const filterTerm = useSelector((state: RootStateType) => state.TableFilters.projectInternalExpensesFilterValue)
    const sortTerm = useSelector((state: RootStateType) => state.TableFilters.projectInternalExpensesSortValue)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (!allExpeneses.length) dispatch(fetchInternalExpenses())
        // eslint-disable-next-line
    }, [])

    const names: TableListProps['names'] = useMemo(() => {
        return [
            'Beschreibung',
            {
                name: 'Kategorie', sort: [{ name: 'Sort ascending', value: "inc" }, { name: 'Sort descending', value: "dec" }],
                keyName: 'category',
                setSort: (arg) => dispatch(setProjectInternalExpensesSortTerm(arg)),
                sortTerm,
                filterTerm,
                options: [],
                setOption: (arg) => dispatch(setProjectInternalExpensesFilterTerm(arg)),
                setSearch: (arg) => dispatch(setProjectInternalExpensesSearchTerm(arg)),
                search: true,
                searchTerm,
                placeholder: 'Geben Sie den Namen'
            },
            {
                name: 'Betrag', sort: [{ name: 'Sort ascending', value: "inc" }, { name: 'Sort descending', value: "dec" }],
                keyName: 'amount',
                setSort: (arg) => dispatch(setProjectInternalExpensesSortTerm(arg)),
                sortTerm,
                filterTerm,
                options: [],
                setOption: (arg) => dispatch(setProjectInternalExpensesFilterTerm(arg)),
                setSearch: (arg) => dispatch(setProjectInternalExpensesSearchTerm(arg)),
                search: true,
                searchTerm,
                placeholder: '1000'
            },
            {
                name: 'Datum', sort: [{ name: 'Sort ascending', value: "inc" }, { name: 'Sort descending', value: "dec" }],
                keyName: 'date',
                setSort: (arg) => dispatch(setProjectInternalExpensesSortTerm(arg)),
                sortTerm,
                filterTerm,
                options: [],
                setOption: (arg) => dispatch(setProjectInternalExpensesFilterTerm(arg)),
                setSearch: (arg) => dispatch(setProjectInternalExpensesSearchTerm(arg)),
                search: true,
                searchTerm,
                placeholder: '00/00/0000'
            },
            "Hochladen",
            "Einsehen"
        ]
        // eslint-disable-next-line
    }, [sortTerm, searchTerm, filterTerm, projectExpenses])

    const onAddDocument = (e: React.ChangeEvent<HTMLInputElement>, id: string | number | undefined) => {
        if (e.target.files && e.target.files[0]) {
            const formData = new FormData()
            if (e.target.files) {
                formData.set("document", e.target.files[0])
            }
            dispatch(addDocumentForInternalExpense({
                id: id!,
                formData: formData,
            }))
        }
    }
    const mapedData = filteredExpenses.map((item) => ({
        ...item,
        date: moment.utc(item.date).format('DD-MM-YYYY'),
        upload: {
            name: "Upload",
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => onAddDocument(e, item.id),
            disabled: false
        },
        wiewDocument: {
            name: item.pdf ?? null,
            disabled: !!!item.pdf
        }
    }))


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

export default ProjectInternalExpensesTable