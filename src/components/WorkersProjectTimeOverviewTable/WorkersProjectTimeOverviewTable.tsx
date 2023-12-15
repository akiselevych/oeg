import { useMemo, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
//redux
import { fetchLabors, updateLabor, deleteLabor } from "reduxFolder/slices/Labors.slice"
import { step4LaborsTableFilteredSelector } from "reduxFolder/selectors"
import { fetchSuppliersForWorkersByProject } from "reduxFolder/slices/SuppliersSlice"
import {
  setStep4LaborsTableSearchTerm,
  setStep4LaborsTableFilterTerm,
  setStep4LaborsTableSortTerm
} from "reduxFolder/slices/TableFiltersSlice"
//types
import { RootStateType, AppDispatch } from "types/index"
//components
import ErrorMessage from "components/ErrorMessage/ErrorMessage"
import TableList from "components/TableList/TableList"
//styles
import { Container } from "./styles"
//types 
import { TableListProps } from "types/index"
//helpers
import removeDuplicates from "utils/removeDuplicates"
//impages
import spiner from "assets/icons/spinner.svg"
import deleteIcon from "assets/icons/deleteIcon.svg"


const order = ['name', 'company', 'hours', 'date', "delete"],
  listType = "WorkersProjectTimeOverviewTable",
  width = [180, 180, 150, 130, 80]

const WorkersProjectTimeOverviewTable = () => {
  const fetchLborsLoadingStatus = useSelector((state: RootStateType) => state.Labors.fetchLaborLoadingStatus)
  const currentProject = useSelector((state: RootStateType) => state.Projects.currentProject)
  const projectEvents = useSelector((state: RootStateType) => state.Events.specialProjectEvents)
  const labors = useSelector((state: RootStateType) => state.Labors.labors)
  const suppliers = useSelector((state: RootStateType) => state.Suppliers.suppliersWorkersByProject)
  const filteredLabors = useSelector(step4LaborsTableFilteredSelector)
  const searchTerm = useSelector((state: RootStateType) => state.TableFilters.step4laborsTableSearchTerm)
  const filterTerm = useSelector((state: RootStateType) => state.TableFilters.step4laborsTableFilterValue)
  const sortTerm = useSelector((state: RootStateType) => state.TableFilters.step4laborsTableSortValue)

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchLabors(currentProject!.id))
    // eslint-disable-next-line
  }, [projectEvents])

  useEffect(() => {
    if (!suppliers.data.length) dispatch(fetchSuppliersForWorkersByProject(currentProject!.id))
    //eslint-disable-next-line
  }, [])

  const names: TableListProps['names'] = useMemo(() => {
    return [
      "Name",
      {
        name: 'Firma',
        sort: [{ name: 'Sort ascending', value: "inc" }, { name: 'Sort descending', value: "dec" }],
        keyName: 'company',
        setSort: (arg) => dispatch(setStep4LaborsTableSortTerm(arg)),
        sortTerm,
        options: [{ name: "Keine", value: "Keine" }, ...removeDuplicates(suppliers.data.map(({ company }) => ({ name: company, value: company })))],
        filterTerm,
        setOption: (arg) => dispatch(setStep4LaborsTableFilterTerm(arg)),
        setSearch: (arg) => dispatch(setStep4LaborsTableSearchTerm(arg)),
        search: true,
        searchTerm,
        placeholder: 'Name'
      },
      {
        name: 'Stunden',
        sort: [{ name: 'Sort ascending', value: "inc" }, { name: 'Sort descending', value: "dec" }],
        keyName: 'hours',
        setSort: (arg) => dispatch(setStep4LaborsTableSortTerm(arg)),
      },
      'Datum',
      "Löschen"
    ]
    // eslint-disable-next-line
  }, [labors, searchTerm, sortTerm, filterTerm])


  const mapedData = useMemo(() => {
    return filteredLabors.map((labor) => ({
      ...labor,
      hours: {
        name: labor.hours,
        onChange: (arg: number) => dispatch(updateLabor({ data: { hours: arg }, id: labor.id })),
        disabled: !!labor.supplier
      },
      date: {
        name: labor.date,
      },
      ...(labor.supplier ? {
        delete: {
          name: deleteIcon,
          onChange: () => dispatch(deleteLabor(labor.id))
        }
      } : {})
    }))
    // eslint-disable-next-line
  }, [labors, searchTerm, sortTerm, filterTerm])


  const content = fetchLborsLoadingStatus === "idle" || (fetchLborsLoadingStatus === 'loading' && labors.length) ? <TableList listType={listType} order={order} names={names} width={width} data={mapedData} /> : null
  const error = fetchLborsLoadingStatus === 'error' ? <ErrorMessage /> : null
  const loading = fetchLborsLoadingStatus === 'loading' ? <img className="spiner" src={spiner} alt="" /> : null

  return (
    <Container>
      {content}
      {error}
      {loading}
    </Container>
  )
}

export default WorkersProjectTimeOverviewTable