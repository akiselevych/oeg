//libs
import { FC, useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import moment from "moment"
//components
import TableList from "components/TableList/TableList"
import ErrorMessage from "components/ErrorMessage/ErrorMessage"
//utils
import { filterBySearchTerm } from "utils/filterBySearchTerm"
import removeDuplicates from "utils/removeDuplicates"
//redux
import { fetchInvoicesWithProject } from "reduxFolder/slices/InvoicesSlice"
import { fetchProjects } from "reduxFolder/slices/ProjectsSlice"
import { filteredProjectInvoicesSelector } from "reduxFolder/selectors"
import { setProjectsInvoicesTableFilterTerm, toggleProjectInvoicesProjectIDs, setProjectsInvoicesTableSearchTerm, setProjectsInvoicesTableSortTerm } from "reduxFolder/slices/TableFiltersSlice"
//styles
import { Container } from "./styles"
//types
import { RootStateType, ProjectType, AppDispatch, SortTermType, FilterTermType, SearchTermType } from "types/index"
//impages
import spiner from "assets/icons/spinner.svg"


const order = ['name', 'customer', 'date', 'amount', "viewLink"],
  listType = "projectInvoices",
  width = [165, 165, 165, 144, 180]

const ProjectInvoices = () => {
  const invoices = useSelector((state: RootStateType) => state.Invoices.invoicesWithProject)
  const filteredInvoices = useSelector(filteredProjectInvoicesSelector)
  const projects = useSelector((state: RootStateType) => state.Projects.projects)
  const fetchInvoicesLoadingStatus = useSelector((state: RootStateType) => state.Invoices.fetchInvoicesWithProjectLoadingStatus)
  const dispatch = useDispatch<AppDispatch>()
  const searchTerm = useSelector((state: RootStateType) => state.TableFilters.projectInvoicesSearchTerm)
  const filterTerm = useSelector((state: RootStateType) => state.TableFilters.projectInvoicesFilterValue)
  const sortTerm = useSelector((state: RootStateType) => state.TableFilters.projectInvoicesSortValue)
  const [projectsSearchTerm, setProjectsSearchTerm] = useState('')


  useEffect(() => {
    dispatch(fetchInvoicesWithProject())
    dispatch(fetchProjects())
    // eslint-disable-next-line
  }, [])

  const names = [
    {
      keyName: 'name',
      name: 'Rechnung', sort: [{ name: 'Sort ascending', value: "inc" }, { name: 'Sort descending', value: "dec" }],
      setSort: (arg: SortTermType) => dispatch(setProjectsInvoicesTableSortTerm(arg)),
      sortTerm,
      options: removeDuplicates(invoices.map(({ name }) => ({ name: name, value: name }))),
      setOption: (arg: FilterTermType) => dispatch(setProjectsInvoicesTableFilterTerm(arg)),
      filterTerm,
      searchTerm,
      setSearch: (arg: SearchTermType) => dispatch(setProjectsInvoicesTableSearchTerm(arg)),
      search: true,
      placeholder: 'Geben Sie den Namen'
    },
    {
      keyName: 'customer',
      name: 'Zahlung von', sort: [{ name: 'Sort ascending', value: "inc" }, { name: 'Sort descending', value: "dec" }],
      setSort: (arg: SortTermType) => dispatch(setProjectsInvoicesTableSortTerm(arg)),
      sortTerm,
      options: removeDuplicates(invoices.filter(item => !!item.proposition).map(({ proposition }) => ({ name: proposition!.client.name, value: proposition!.client.name }))),
      setOption: (arg: FilterTermType) => dispatch(setProjectsInvoicesTableFilterTerm(arg)),
      filterTerm,
      searchTerm,
      setSearch: (arg: SearchTermType) => dispatch(setProjectsInvoicesTableSearchTerm(arg)),
      search: true,
      placeholder: 'Geben Sie den Namen'
    },
    {
      keyName: 'date',
      name: 'Erstelldatum', sort: [{ name: 'Sort ascending', value: "inc" }, { name: 'Sort descending', value: "dec" }],
      setSort: (arg: SortTermType) => dispatch(setProjectsInvoicesTableSortTerm(arg)),
      sortTerm,
      options: removeDuplicates(invoices.filter(item => !!item.proposition).map(({ proposition }) => ({ name: proposition!.created_at, value: proposition!.created_at }))),
      setOption: (arg: FilterTermType) => dispatch(setProjectsInvoicesTableFilterTerm(arg)),
      filterTerm,
      searchTerm,
      setSearch: (arg: SearchTermType) => dispatch(setProjectsInvoicesTableSearchTerm(arg)),
      search: true,
      placeholder: '00/00/00'
    },
    'Betrag',
    "Herunterladen",
  ]

  const mapedData = filteredInvoices.map(invoice => ({
    ...invoice,
    viewLink: {
      name: invoice.document,
    },
    customer: invoice.proposition.client.name,
    amount: invoice.revenue + " €",
    date: moment(invoice.proposition.created_at).format("DD/MM/YYYY")
  }))

  const content = <TableList width={width} order={order} listType={listType} names={names} data={mapedData} />
  const error = fetchInvoicesLoadingStatus === 'error' ? <ErrorMessage /> : null
  const loading = fetchInvoicesLoadingStatus === 'loading' ? <img className="spiner" src={spiner} alt="" /> : null
  return (
    <Container>
      <div className="projectPicker">
        <div className="header">
          <div className="titleWrapper">
            <p className="projectPickerTitle">Projekte</p>
          </div>
          <input className="projectSearch" value={projectsSearchTerm} onChange={e => setProjectsSearchTerm(e.target.value)} type="text" placeholder="Suche" />
        </div>
        <div className="main">
          {
            //@ts-ignore
            filterBySearchTerm(projects, { name: projectsSearchTerm }).map((project, i) => <ProjectCard key={i} project={project} />)
          }
        </div>
      </div>
      <div className="tableWrapper">
        {content}
        {error}
        {loading}
      </div>

    </Container>
  )
}

export default ProjectInvoices

const ProjectCard: FC<{ project: ProjectType }> = ({ project }) => {
  const dispatch = useDispatch<AppDispatch>()
  const IDs = useSelector((state: RootStateType) => state.TableFilters.projectInvoicesProjectIDs)

  const isPicked = IDs.some(item => item === project.id)

  return (
    <div className="project" key={project.id}>
      <input onChange={() => dispatch(toggleProjectInvoicesProjectIDs(project.id))} checked={isPicked} type="checkbox" />
      <div className="nameAndStatus">
        <p className="projectName">{project.name}</p>
      </div>
    </div>
  )
}