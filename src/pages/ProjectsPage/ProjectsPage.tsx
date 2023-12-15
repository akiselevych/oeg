//libs
import { Link } from "react-router-dom"
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
//redux
import { fetchOneProject, setCurrentProject } from "reduxFolder/slices/ProjectsSlice";
//types
import { RootStateType, AppDispatch } from "types/index";
//styles
import { Container } from "./styles"
import { PageTitle } from "styles/global"
//components
import ProjectsTable from "components/ProjectsTable/ProjectsTable"
import ErrorBoundary from "components/ErrorBoundary/ErrorBoundary";


const ProjectsPage = () => {
    const totalProjects = useSelector((state: RootStateType) => state.Projects.projects).length
    const dispatch = useDispatch<AppDispatch>()
    const { id } = useParams()

    useEffect(() => {
        if (id) dispatch(fetchOneProject(id))
        // eslint-disable-next-line
    }, [])

    return (
        <Container>
            <PageTitle>Projekte gefunden {totalProjects} </PageTitle>
            <div className="btnGroup">
                <Link onClick={() => dispatch(setCurrentProject(null))} to={`/project`} className="createProject" >Projekt erstellen</Link>
            </div>
            <ErrorBoundary>
                <ProjectsTable />
            </ErrorBoundary>
        </Container>
    )
}

export default ProjectsPage