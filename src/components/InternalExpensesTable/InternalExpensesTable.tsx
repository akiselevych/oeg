//components
import TableList from "components/TableList/TableList"
import ErrorMessage from "components/ErrorMessage/ErrorMessage"
import CustomSelectElement from "components/CustomSelectElement/CustomSelectElement"
//libs
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useMemo } from "react"
import moment from "moment"
//redux
import { fetchInternalExpenses, addDocumentForInternalExpense } from "reduxFolder/slices/InternalExpensesSlice"
import { internalExpensesSelector } from "reduxFolder/selectors"
import {
    setInternalExpensesTableFilterTerm,
    setInternalExpensesTableSearchTerm,
    setInternalExpensesTableSortTerm,
    setInternalExpensesGeneralSearchTerm,
    setInternalExpensesDateFilterValue
} from "reduxFolder/slices/TableFiltersSlice"
//utils
import removeDuplicates from "utils/removeDuplicates"
//styles
import { Container } from "./styles"
import { SearchInput } from "styles/global"
//types
import { SortTermType, SearchTermType, FilterTermType } from "types/index"
import { AppDispatch, RootStateType } from "types/index"
//images 
import spiner from 'assets/icons/spinner.svg'


const order = ['name', 'description', 'category', 'amount', 'date', "upload", 'wiewDocument'],
    listType = "internalExpenses",
    width = [214, 240, 180, 160, 160, 140, 130]
const timeOptions = [
    { name: "Alle Zeiten", value: "Alle Zeiten" },
    { name: "Letzte Woche", value: "week" },
    { name: "Letzter Monat", value: "month" },
    { name: "Letzte 3 Monate", value: "3 month" },
    { name: "Letzte 6 Monate", value: "6 month" },
    { name: "Letzte 9 Monate", value: "9 month" },
    { name: "Letztes Jahr", value: "year" },
]




const InternalExpensesTable = () => {
    const filteredInternalExpenses = useSelector(internalExpensesSelector)
    const internalExpenses = useSelector((state: RootStateType) => state.InternalExpenses.internalExpenses)
    const fetchInternalExpensesLoadingStatus = useSelector((state: RootStateType) => state.InternalExpenses.fetchInternalExpensesLoadingStatus)
    const searchTerm = useSelector((state: RootStateType) => state.TableFilters.internalExpensesSearchTerm)
    const generalSearchTerm = useSelector((state: RootStateType) => state.TableFilters.internalExpensesGeneralSearchTerm)
    const filterTerm = useSelector((state: RootStateType) => state.TableFilters.internalExpensesFilterValue)
    const dateFilterTerm = useSelector((state: RootStateType) => state.TableFilters.internalExpensesDateFilterValue)
    const sortTerm = useSelector((state: RootStateType) => state.TableFilters.internalExpensesSortValue)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (!internalExpenses.length) dispatch(fetchInternalExpenses())
        window.location.hash = ""
        return () => {
            window.location.hash = ""
        }
        // eslint-disable-next-line
    }, [])

    const names = useMemo(() => {
        return [
            {
                name: 'Projektname', sort: [{ name: 'Sort ascending', value: "inc" }, { name: 'Sort descending', value: "dec" }],
                keyName: 'project',
                setSort: (arg: SortTermType) => dispatch(setInternalExpensesTableSortTerm(arg)),
                sortTerm,
                options: removeDuplicates(internalExpenses.map(({ project }) => ({ name: project.name, value: project.name }))),
                setOption: (arg: FilterTermType) => dispatch(setInternalExpensesTableFilterTerm(arg)),
                filterTerm,
                searchTerm,
                setSearch: (arg: SearchTermType) => dispatch(setInternalExpensesTableSearchTerm(arg)),
                search: true,
                placeholder: 'Geben Sie den Namen'
            },
            'Beschreibung',
            {
                name: 'Kategorie', sort: [{ name: 'Sort ascending', value: "inc" }, { name: 'Sort descending', value: "dec" }],
                keyName: 'category',
                setSort: (arg: SortTermType) => dispatch(setInternalExpensesTableSortTerm(arg)),
                sortTerm,
                options: removeDuplicates(internalExpenses.map(({ category }) => ({ name: category, value: category }))),
                setOption: (arg: FilterTermType) => dispatch(setInternalExpensesTableFilterTerm(arg)),
                filterTerm,
            },
            'Betrag',
            {
                name: 'Datum', sort: [{ name: 'Sort ascending', value: "inc" }, { name: 'Sort descending', value: "dec" }],
                keyName: 'date',
                setSort: (arg: SortTermType) => dispatch(setInternalExpensesTableSortTerm(arg)),
                sortTerm,
                options: removeDuplicates(internalExpenses.map(({ date }) => ({ name: moment(date).format("DD/MM/YYYY"), value: date }))),
                setOption: (arg: FilterTermType) => dispatch(setInternalExpensesTableFilterTerm(arg)),
                filterTerm,
                searchTerm,
                setSearch: (arg: SearchTermType) => dispatch(setInternalExpensesTableSearchTerm(arg)),
                search: true,
                placeholder: '00/00/00'
            },
            "Hochladen",
            'Einsehen'
        ]
        // eslint-disable-next-line
    }, [sortTerm, searchTerm, filterTerm, internalExpenses])

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

    const mapedData = filteredInternalExpenses.map(({ project, category, description, date, amount, pdf, id }) => ({
        name: project,
        description,
        category,
        amount: amount + " €",
        date: moment(date).format("DD/MM/YYYY"),
        upload: {
            name: "Upload",
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => onAddDocument(e, id),
            disabled: false
        },
        wiewDocument: {
            name: pdf ?? null,
            disabled: !!!pdf
        }
    }))

    const content = fetchInternalExpensesLoadingStatus === "idle" ? <TableList data={mapedData} names={names} order={order} width={width} listType={listType} />
        : null
    const error = fetchInternalExpensesLoadingStatus === 'error' ? <ErrorMessage /> : null
    const loading = fetchInternalExpensesLoadingStatus === 'loading' ? <img className="spiner" src={spiner} alt="" /> : null

    return (
        <Container>
            <div className="headerWrapper">
                <SearchInput value={generalSearchTerm!.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setInternalExpensesGeneralSearchTerm({ project: e.target.value }))} placeholder="Suchen" />
                <CustomSelectElement bgColor="#fff" activeValue={{ value: dateFilterTerm!.period, name: "Alle Zeiten" }} values={timeOptions} onChange={(value => dispatch(setInternalExpensesDateFilterValue({ period: value })))} />
            </div>
            {content}
            {error}
            {loading}
        </Container>

    )
}

export default InternalExpensesTable