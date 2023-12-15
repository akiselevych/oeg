//libs
import { useSelector, useDispatch, } from "react-redux"
import { useEffect, useMemo } from "react"
//utils
import removeDuplicates from "utils/removeDuplicates"
//components
import ErrorMessage from "components/ErrorMessage/ErrorMessage"
import TableList from "components/TableList/TableList"
//redux
import { fetchProjects, updateProject } from "reduxFolder/slices/ProjectsSlice"
import { projectsSelector } from "reduxFolder/selectors"
import { setProjectsTableSearchTerm, setProjectsTableSortTerm, setProjectsTableFilterTerm } from "reduxFolder/slices/TableFiltersSlice"
//styles
import { Container } from "./styles"
//types
import { RootStateType, AppDispatch, TableListProps, SortTermType, FilterTermType, SearchTermType } from "types/index"
//impages
import spiner from "assets/icons/spinner.svg"



const order = ['name', 'status', 'respPerson', 'phoneNumber', 'timeline', 'open', 'when'],
  listType = "projects",
  width = [280, 180, 200, 180, 140, 140, 180]

const ProjectsTable = () => {
  const filterdPojects = useSelector(projectsSelector)
  const projects = useSelector((state: RootStateType) => state.Projects.projects)
  const projectsLoadingStatus = useSelector((state: RootStateType) => state.Projects.fetchProjectsLoadingStatus)
  const dispatch = useDispatch<AppDispatch>()
  const searchTerm = useSelector((state: RootStateType) => state.TableFilters.projectsSearchTerm)
  const filterTerm = useSelector((state: RootStateType) => state.TableFilters.projectsFilterValue)
  const sortTerm = useSelector((state: RootStateType) => state.TableFilters.projectsSortValue)


  useEffect(() => {
    if (!projects.length) dispatch(fetchProjects())
    // eslint-disable-next-line
  }, [])

  const names: TableListProps['names'] = useMemo(() => {
    return [
      {
        name: 'Projektname', sort: [{ name: 'Sort ascending', value: "inc" }, { name: 'Sort descending', value: "dec" }],
        keyName: 'name',
        setSort: (arg: SortTermType) => dispatch(setProjectsTableSortTerm(arg)),
        sortTerm,
        options: projects.map(({ name }) => ({ name: name, value: name })),
        setOption: (arg: FilterTermType) => dispatch(setProjectsTableFilterTerm(arg)),
        filterTerm,
        searchTerm,
        setSearch: (arg: SearchTermType) => dispatch(setProjectsTableSearchTerm(arg)),
        search: true,
        placeholder: 'Geben Sie den Namen'
      },
      {
        name: 'Projektstatus', sort: [{ name: 'Sort ascending', value: "inc" }, { name: 'Sort descending', value: "dec" }],
        keyName: 'status',
        setSort: (arg: SortTermType) => dispatch(setProjectsTableSortTerm(arg)),
        sortTerm,
        options: [{ name: "Abgeschlossen", value: 'Abgeschlossen' }, { name: "In Arbeit", value: 'In Arbeit' }, { name: "Geplant", value: 'Geplant' }],
        setOption: (arg: FilterTermType) => dispatch(setProjectsTableFilterTerm(arg)),
        filterTerm,
      },
      {
        name: 'Verantwortlicher', sort: [{ name: 'Sort ascending', value: "inc" }, { name: 'Sort descending', value: "dec" }],
        keyName: 'respPerson',
        setSort: (arg: SortTermType) => dispatch(setProjectsTableSortTerm(arg)),
        sortTerm,
        options: removeDuplicates(projects.map(({ respPerson }) => ({ name: respPerson.name, value: respPerson.name }))),
        setOption: (arg: FilterTermType) => dispatch(setProjectsTableFilterTerm(arg)),
        filterTerm,
        searchTerm,
        setSearch: (arg: SearchTermType) => dispatch(setProjectsTableSearchTerm(arg)),
        search: true,
        placeholder: 'Geben Sie den Namen'
      },
      {
        name: 'Rufnummer',
        keyName: 'phoneNumber',
        options: removeDuplicates(projects.map(({ phoneNumber }) => ({ name: phoneNumber, value: phoneNumber }))),
        setOption: (arg: FilterTermType) => dispatch(setProjectsTableFilterTerm(arg)),
        filterTerm,
        searchTerm,
        setSearch: (arg: SearchTermType) => dispatch(setProjectsTableSearchTerm(arg)),
        search: true,
        placeholder: '+49 30 8888 8888'
      },
      'Zeitleiste',
      "Offen",
      "Erw. Inbetriebnahme"
    ]
    // eslint-disable-next-line
  }, [projects, searchTerm, filterTerm, sortTerm])


  const mapedData = filterdPojects.map((project) => ({
    ...project,
    when: {
      //@ts-ignore
      name: project.finish_notes ? project.finish_notes : '00-00-00',
      onChange: (arg: string) => dispatch(updateProject({
        //@ts-ignore
        id: project.id,
        body: {
          finish_notes: arg
        }
      }))
    }
  }))





  const content = projectsLoadingStatus === "idle" ? <TableList listType={listType} order={order} names={names} width={width} data={mapedData} /> : null
  const error = projectsLoadingStatus === 'error' ? <ErrorMessage /> : null
  const loading = projectsLoadingStatus === 'loading' ? <img className="spiner" src={spiner} alt="" /> : null

  return (
    <Container>
      {content}
      {error}
      {loading}
    </Container>
  )
}

export default ProjectsTable