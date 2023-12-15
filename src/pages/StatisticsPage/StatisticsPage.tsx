//components
import ErrorBoundary from "components/ErrorBoundary/ErrorBoundary"
import AnalyticsBlock from "components/AnalyticsBlock/AnalyticsBlock"
import BarChart from "components/BarChart/BarChart"
//styles
import { Container } from "./styles"

type Props = {}

const StatisticsPage = (props: Props) => {
    return (
        <Container>
            <ErrorBoundary>
                <AnalyticsBlock />
            </ErrorBoundary>
            <ErrorBoundary>
                <BarChart />
            </ErrorBoundary>
        </Container>
    )
}

export default StatisticsPage