//libs
import { useSelector } from "react-redux"
//types
import { RootStateType } from "types/index"
//styles
import { Container, H3, CardContainer, CardValue, CardName, Card } from "./styles"



const AnalyticsOverview = () => {
    const projects = useSelector((state: RootStateType) => state.Projects.projects)

    const completed = projects.filter(project => project.status === 'Completed').length
    const current = projects.filter(project => project.status === 'In progress').length
    const planned = projects.filter(project => project.status === 'Planned').length
    return (
        <Container>
            <H3>Übersicht Analytik</H3>
            <CardContainer>
                <Card $bgColor='#DBF7CB'>
                    <CardValue>{completed}</CardValue>
                    <CardName>
                        <span>abgeschlossene</span>
                        <span>Projekte</span>
                    </CardName>
                </Card>
                <Card $bgColor="#ECECEC">
                    <CardValue>{current}</CardValue>
                    <CardName>
                        <span>aktuelle</span>
                        <span>Projekte</span>
                    </CardName>
                </Card>
                <Card $bgColor='#DBF7CB'>
                    <CardValue>{planned}</CardValue>
                    <CardName>
                        <span>geplant</span>
                        <span>Projekte</span>
                    </CardName>
                </Card>
            </CardContainer>
        </Container >
    )
}

export default AnalyticsOverview