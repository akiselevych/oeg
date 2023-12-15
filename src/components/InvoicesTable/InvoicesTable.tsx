//libs
import { useSelector, useDispatch, } from "react-redux"
import { useEffect, useMemo } from "react"
import moment from "moment"
//utils
import removeDuplicates from "utils/removeDuplicates"
//components
import ErrorMessage from "components/ErrorMessage/ErrorMessage"
import TableList from "components/TableList/TableList"
//redux
import { fetchInvoicesNoProject, fetchAllInvoices } from "reduxFolder/slices/InvoicesSlice"
import { noProjectInvoicesSelector, filteredAllInvoicesSelector } from "reduxFolder/selectors"
import {
  setNoProjectsInvoicesTableSearchTerm, setNoProjectsInvoicesTableFilterTerm, setNoProjectsInvoicesTableSortTerm
} from "reduxFolder/slices/TableFiltersSlice"
//styles
import { Container } from "./styles"
//types
import { RootStateType, AppDispatch, TableListProps, SortTermType, FilterTermType, SearchTermType } from "types/index"
//impages
import spiner from "assets/icons/spinner.svg"



const order = ['name', 'customer', 'date', 'amount', 'viewLink'],
  listType = "invoices",
  width = [280, 198, 180, 180, 180]

const InvoicesTable = () => {
  const invoices = useSelector(noProjectInvoicesSelector)
  const filterdInvoices = useSelector(filteredAllInvoicesSelector)
  const fetchInvoicesLoadingStatus = useSelector((state: RootStateType) => state.Invoices.fetchAllImvoicesLoadingStatus)
  const dispatch = useDispatch<AppDispatch>()
  const searchTerm = useSelector((state: RootStateType) => state.TableFilters.allInvoicesSearchTerm)
  const filterTerm = useSelector((state: RootStateType) => state.TableFilters.allInvoicesFilterValue)
  const sortTerm = useSelector((state: RootStateType) => state.TableFilters.allInvoicesSortValue)



  useEffect(() => {
    dispatch(fetchAllInvoices())
    // eslint-disable-next-line
  }, [])

  const names: TableListProps['names'] = useMemo(() => {
    return [
      {
        name: 'Rechnung Name', sort: [{ name: 'Sort ascending', value: "inc" }, { name: 'Sort descending', value: "dec" }],
        keyName: 'name',
        setSort: (arg: SortTermType) => dispatch(setNoProjectsInvoicesTableSortTerm(arg)),
        sortTerm,
        options: removeDuplicates(invoices.map(({ name }) => ({ name: name, value: name }))),
        setOption: (arg: FilterTermType) => dispatch(setNoProjectsInvoicesTableFilterTerm(arg)),
        filterTerm,
        searchTerm,
        setSearch: (arg: SearchTermType) => dispatch(setNoProjectsInvoicesTableSearchTerm(arg)),
        search: true,
        placeholder: 'Geben Sie den Namen'
      },
      {
        name: 'Kundenname', sort: [{ name: 'Sort ascending', value: "inc" }, { name: 'Sort descending', value: "dec" }],
        keyName: 'customer',
        setSort: (arg: SortTermType) => dispatch(setNoProjectsInvoicesTableSortTerm(arg)),
        sortTerm,
        options: removeDuplicates(invoices.filter(item => !!item.proposition).map(item => ({ name: item.proposition!.client?.name, value: item.proposition!.client?.name }))),
        setOption: (arg: FilterTermType) => dispatch(setNoProjectsInvoicesTableFilterTerm(arg)), filterTerm,
        setSearch: (arg: SearchTermType) => dispatch(setNoProjectsInvoicesTableSearchTerm(arg)),
        searchTerm,
        search: true,
        placeholder: 'Geben Sie den Namen'
      },
      {
        name: 'Erstelldatum', sort: [{ name: 'Sort ascending', value: "inc" }, { name: 'Sort descending', value: "dec" }],
        keyName: 'date',
        setSort: (arg: SortTermType) => dispatch(setNoProjectsInvoicesTableSortTerm(arg)),
        sortTerm,
        options: removeDuplicates(invoices.filter(item => !!item.proposition).map(item => ({ name: moment(item.proposition!.created_at).format("DD/MM/YYYY"), value: moment(item.proposition!.created_at).format("DD/MM/YYYY") }))),
        setOption: (arg: FilterTermType) => dispatch(setNoProjectsInvoicesTableFilterTerm(arg)), filterTerm,
        searchTerm,
        setSearch: (arg: SearchTermType) => dispatch(setNoProjectsInvoicesTableSearchTerm(arg)),
        search: true,
        placeholder: '00/00/00'
      },
      "Betrag",
      'Herunterladen',
    ]
    // eslint-disable-next-line
  }, [invoices, searchTerm, filterTerm, sortTerm])




  const content = <TableList listType={listType} order={order} names={names} width={width} data={filterdInvoices} />
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

export default InvoicesTable