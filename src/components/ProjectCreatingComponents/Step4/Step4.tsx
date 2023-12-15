//libs
import { useParams } from "react-router-dom"
import { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { baseUrl } from "services/API"
//redux
import { fetchOneProject } from "reduxFolder/slices/ProjectsSlice"
import { currentProjectCustomerEmail } from "reduxFolder/selectors"
import { generateIvoices } from "reduxFolder/slices/DocumentsSlice"
//types
import { AppDispatch, RootStateType } from "types/index"
//components
import ProjectInternalExpensesTable from "components/ProjectInternalExpensesTable/ProjectInternalExpensesTable"
import ProjectСonstructionTable from "components/ProjectСonstructionTable/ProjectСonstructionTable"
import WorkersProjectTimeOverviewTable from "components/WorkersProjectTimeOverviewTable/WorkersProjectTimeOverviewTable"
import CreateProjectExpense from "components/CreateProjectExpense/CreateProjectExpense"
import CreateSupplierWorkerForm from "components/CreateSupplierWorkerForm/CreateSupplierWorkerForm"
import ErrorBoundary from "components/ErrorBoundary/ErrorBoundary";
//hooks
import useEmailAPI from "hooks/useEmailAPI"
//styles
import { Container, EventButton, HeaderWrapper } from "./styles"
import { SecondaryButton, PrimaryButton } from "styles/global"
//images
import file from 'assets/icons/file.svg'
import { fetchSuppliersWorkers } from "reduxFolder/slices/SuppliersSlice";




const Step4: FC<{ setIsModalOpen: (a: boolean) => void }> = ({ setIsModalOpen }) => {
  const [isExpensesFormOpen, setIsExpensesFormOpen] = useState<boolean>(false);
  const [isWorkerFormOpen, setIsWorkerIsFormOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams()
  const currentProject = useSelector((state: RootStateType) => state.Projects.currentProject)
  const generateInvoicesLoadingStatus = useSelector((state: RootStateType) => state.Documents.generateInvoicesLoadingStatus)
  const [invoiceRequestFn,
    invoiceLoadingStatus,
    emailResponse,
    emailIsSucces] = useEmailAPI();
  const email = useSelector(currentProjectCustomerEmail)

  //it is using when we have not all data and user shouldn't see it
  const hidenLogic = !!!currentProject
    || !!!currentProject.propositions
    || !!!currentProject.propositions[0]
    || !!!currentProject.propositions[0].confirmed_by_client
    || (
      !currentProject?.propositions[0]?.positions?.every(pos => {
        return pos.position_items.every(({ buying_price, client_price, amount, units, material }) => {
          return buying_price && client_price && amount && units && material
        })
      }) && !!!currentProject.propositions[0].confirmed_by_client
    )
    || (
      !currentProject?.propositions[0]?.positions?.every(pos => {
        return pos.position_items.every(({ amount, material }) => {
          return amount && material
        })
      })
    )
    || !currentProject?.propositions[0]?.positions?.some(pos => {
      return !!pos.position_items.length
    })
  //it is using when we have all data but user shouldn't change it
  const disabledLogic = !(+currentProject!.stepStatus > 2 || currentProject?.status !== 'Completed')


  useEffect(() => {
    if (id) dispatch(fetchOneProject(id))
    // eslint-disable-next-line
  }, [id])

  useEffect(() => {
    dispatch(fetchSuppliersWorkers());
    // eslint-disable-next-line
  }, []);

  const onInvoiceSend = () => {
    invoiceRequestFn(`${baseUrl}/api/v1/sent-invoice-to-email/`, "POST", {
      email,
      document_id: currentProject?.documents.find(doc => doc.type === "Second_invoice")?.id
    })
  }

  const generateInvoice = () => {
    dispatch(generateIvoices({
      projectId: currentProject!.id,
      invoice_type: "Second"
    }))
  }
  const secondInvoice = currentProject?.documents.find(doc => doc.type === "Second_invoice")





  return (
    <Container>
      <div className={`tableBlock ${disabledLogic && "disableLogic"}`}>
        <HeaderWrapper>
          <div className="tableTitle">
            Baustelle
          </div>
          {!disabledLogic && <EventButton onClick={() => setIsModalOpen(true)}>Ereignis erstellen</EventButton>}
        </HeaderWrapper>
        <ErrorBoundary>
          <ProjectСonstructionTable />
        </ErrorBoundary>
      </div>
      {
        !hidenLogic &&
        <div className="invoice">
          <div className="invoiceBlock">
            <div className="invoice">
              <img src={file} alt="" />
              <p className={"nameValue"}>  Zweite Rechnung</p>
            </div>
            <div className="btnGroup">
              <div>
                <PrimaryButton onClick={generateInvoice} $disabled={!!secondInvoice}>Generieren</PrimaryButton>
                {generateInvoicesLoadingStatus === 'error' && generateInvoicesLoadingStatus}
                {generateInvoicesLoadingStatus === 'loading' && generateInvoicesLoadingStatus}
              </div>
              <div>
                <SecondaryButton $disabled={!secondInvoice || invoiceLoadingStatus === 'loading'} onClick={onInvoiceSend}>Senden </SecondaryButton>
                {invoiceLoadingStatus === 'error' && <p className="btnStatus" style={{ color: "red" }} >Fehler</p>}
                {invoiceLoadingStatus === 'loading' && <p className="btnStatus"  >Laden...</p>}
                {emailIsSucces && <p className="btnStatus" style={{ color: "#6A994E" }}>Erfolg</p>}
                {emailResponse?.error && <p className="btnStatus" style={{ color: "red" }} >{emailResponse.error}</p>}
              </div>
              <a
                href={secondInvoice?.document ?? ''}
                target="_blank"
                rel="noopener noreferrer">
                <PrimaryButton $disabled={!secondInvoice}>Einsehen</PrimaryButton>
              </a>
            </div>
          </div>
        </div>
      }
      {
        hidenLogic &&
        <p>Einige Funktionen sind in diesem Schritt nicht verfügbar, da sie von Daten abhängen, die Sie im vorherigen Schritt nicht hinzugefügt haben</p>
      }
      <div className="tableBlock">
        <div className="tableTitle">
          Arbeitskosten
        </div>
        <ErrorBoundary>
          <WorkersProjectTimeOverviewTable />
        </ErrorBoundary>
        <ErrorBoundary>
          {isWorkerFormOpen && <CreateSupplierWorkerForm project_id={currentProject?.id!} isOpen={isWorkerFormOpen} close={() => setIsWorkerIsFormOpen(false)} />}
        </ErrorBoundary>
        {!disabledLogic && <SecondaryButton onClick={() => setIsWorkerIsFormOpen(prev => !prev)} className="add">{isWorkerFormOpen ? "Nein" : "Person hinzufügen"}</SecondaryButton>}
      </div>
      <div className="tableBlock">
        <div className="tableTitle">
          Interne Reisekosten
        </div>
        <ErrorBoundary>
          <ProjectInternalExpensesTable />
        </ErrorBoundary>
        <ErrorBoundary>
          {isExpensesFormOpen && <CreateProjectExpense project_id={currentProject?.id!} isOpen={isExpensesFormOpen} close={() => setIsExpensesFormOpen(false)} />}
        </ErrorBoundary>
        {!disabledLogic && <SecondaryButton onClick={() => setIsExpensesFormOpen(prev => !prev)} className="add">{isExpensesFormOpen ? "Nein" : "Kosten hinzufügen"}</SecondaryButton>}
      </div>
    </Container >
  )
}

export default Step4