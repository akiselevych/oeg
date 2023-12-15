//libs
import { useSelector, useDispatch } from "react-redux"
//redux
import { setDashboardIsCreateInvoiceOpen } from "reduxFolder/slices/PagesStateSlice"
//components
import ErrorBoundary from "components/ErrorBoundary/ErrorBoundary"
import WelcomeUserBanner from "components/WelcomeUserBanner/WelcomeUserBanner"
import AnalyticsOverview from "components/AnalyticsOverview/AnalyticsOverview"
import UpcomingEventsTable from "components/UpcomingEventsTable/UpcomingEventsTable"
import CentralModalWindow from "components/CentralModalWindow/CentralModalWindow"
import CreateInvoiceForm from "components/CreateInvoiceForm/CreateInvoiceForm"
//types
import { AppDispatch, RootStateType } from "types/index"
//styles
import { Container, LeftSideWrapper } from "./styles"
import { useEffect } from "react"
import { fetchInboxChats, fetchInboxProjectChats, resetCurrentInboxChat } from "reduxFolder/slices/Inbox.slice";
import { resetCurrentProjectChat } from "reduxFolder/slices/ProjectsChats.slice";
import { deleteProposition } from "reduxFolder/slices/ProjectPropositionSlice";

const DashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const isCreateInvoiceOpen = useSelector(
    (state: RootStateType) => state.PagesStateSlice.dashboardIsCreateInvoiceOpen
  )
  const user = useSelector((state: RootStateType) => state.Login.user);
  const proposition = useSelector((state: RootStateType) => state.ProjectProposition.proposition);
  const currentProject = useSelector((state: RootStateType) => state.Projects.currentProject);

  useEffect(() => {
    if (user) {
      dispatch(fetchInboxChats())
      dispatch(fetchInboxProjectChats())
    }
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    return () => {
      dispatch(setDashboardIsCreateInvoiceOpen(false))
      dispatch(resetCurrentInboxChat());
      dispatch(resetCurrentProjectChat());
    }
    // eslint-disable-next-line
  }, [])




  return (
    <Container>
      <LeftSideWrapper>
        <WelcomeUserBanner />
        <AnalyticsOverview />
        <ErrorBoundary>
          <UpcomingEventsTable />
        </ErrorBoundary>
      </LeftSideWrapper>

      {isCreateInvoiceOpen && (
        <CentralModalWindow
          title="Rechnung erstellen"
          isOpen={isCreateInvoiceOpen}
          closeModal={() => {
            dispatch(setDashboardIsCreateInvoiceOpen(false));
            if (proposition && !currentProject) {
              dispatch(deleteProposition({ proposition_id: Number(proposition.id) }))
            }
          }}
        >
          <CreateInvoiceForm insideProject={false} />
        </CentralModalWindow>
      )}
    </Container>
  )
}

export default DashboardPage
