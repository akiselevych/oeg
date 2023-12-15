//libs
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useMemo } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
//components
import CentralModalWindow from "components/CentralModalWindow/CentralModalWindow"
import CreateInvoiceForm from "components/CreateInvoiceForm/CreateInvoiceForm";
import ErrorBoundary from "components/ErrorBoundary/ErrorBoundary";
//hooks
import useEmailAPI from "hooks/useEmailAPI";
//redux
import { fetchEmployees } from "reduxFolder/slices/EmployeesSlice"
import { fetchClients } from "reduxFolder/slices/ClientsSlice"
import { createProject, updateProject, fetchOneProject, uploadDocument, setErrorMessageToNull } from "reduxFolder/slices/ProjectsSlice";
import { changeProposition } from "reduxFolder/slices/ProjectPropositionSlice";
import { setProjectIsCreatePropositionOpen } from "reduxFolder/slices/PagesStateSlice";
import { generateConfirmedPropositionDocument, generateIvoices } from "reduxFolder/slices/DocumentsSlice";
import { changeGenerateConfirmedPropositionDocumentLoadingStatus } from "reduxFolder/slices/DocumentsSlice"
import { currentProjectCustomerEmail } from "reduxFolder/selectors";
//types
import { AppDispatch, RootStateType } from "types/index"
//styles
import { Container, InputBlock, Label, Input, Select } from "./styles"
import { PrimaryButton, SecondaryButton, StatusOverlay, PDFloader } from "styles/global"
//images
import plus from 'assets/icons/plus.svg'
import file from "assets/icons/file.svg"
import { baseUrl } from "services/API";
import { setIsIboxChatOpen } from "reduxFolder/slices/Inbox.slice";

const validateSelect = (value: string | number) => value !== '---';

const MOCK_POSITIONS = [
  "PV-Module",
  "Wechselrichter",
  "Unterkonstruktion",
  "Montage DC",
  "Montage AC",
  "Gerüststellung",
];

const Step1 = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate();
  const isCreatePropositionOpen = useSelector((state: RootStateType) => state.PagesStateSlice.projectIsCreatePropositionOpen)
  const currentProject = useSelector((state: RootStateType) => state.Projects.currentProject)
  const clients = useSelector((state: RootStateType) => state.Clients.clients)
  const employees = useSelector((state: RootStateType) => state.Employees.employees)
  const clientsLoadingStatus = useSelector((state: RootStateType) => state.Clients.fetchClientsLoadingStatus)
  const employeesLoadingStatus = useSelector((state: RootStateType) => state.Employees.fetchEmployeesLoadingStatus)
  const generateConfirmedPropositionLoadingStatus = useSelector((state: RootStateType) => state.Documents.generateConfirmedPropositionDocumentLoadingStatus)
  const createProjectsLoadingStatus = useSelector((state: RootStateType) => state.Projects.createProjectsLoadingStatus)
  const fetchOneProjectLoadingStatus = useSelector((state: RootStateType) => state.Projects.fetchOneProjectLoadingStatus)
  const createProjectErrorMessage = useSelector((state: RootStateType) => state.Projects.errorMessage)
  const updateProjectsLoadingStatus = useSelector((state: RootStateType) => state.Projects.updateProjectsLoadingStatus)
  const [propRequestFn, propLoadingStatus, propReqResponse, isPropSendSucces] = useEmailAPI();
  const [invoiceRequestFn, invoiceLoadingStatus, invoiceReqResponse, isInvoiceSendSucces] = useEmailAPI();
  const email = useSelector(currentProjectCustomerEmail)




  const { register, handleSubmit, reset } = useForm();
  const { id } = useParams()

  useEffect(() => {
    if (id) dispatch(fetchOneProject(id))

    return () => {
      dispatch(setProjectIsCreatePropositionOpen(false))
    }

    // eslint-disable-next-line
  }, [id])

  useEffect(() => {
    reset({
      name: currentProject?.name,
      customer: currentProject?.customer + '',
      respPerson: currentProject?.respPerson + ''
    })
    // eslint-disable-next-line
  }, [currentProject, clients, employees])

  useEffect(() => {
    if (!clients.length) dispatch(fetchClients())
    if (!employees.length) dispatch(fetchEmployees())

    return () => {
      dispatch(setErrorMessageToNull())
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (currentProject && !id) navigate(`/project/${currentProject.id}`)
    // eslint-disable-next-line
  }, [currentProject])

  //@ts-ignore
  const onSubmit = data => {
    if (currentProject && id) {
      dispatch(updateProject({
        id,
        body: {
          name: data.name,
          customer_id: data.customer,
          responsible_person_id: data.respPerson
        }
      }))
    } else {
      dispatch(createProject({
        name: data.name,
        customer_id: data.customer,
        responsible_person_id: data.respPerson
      }))
    }
  }

  const isNone = employeesLoadingStatus === "idle" && clientsLoadingStatus === 'idle'

  const onAddDocument = (e: React.ChangeEvent<HTMLInputElement>, docId: string | number | undefined, docName: string) => {
    if (e.target.files && e.target.files[0]) {
      const formData = new FormData()
      if (e.target.files) {
        formData.set("document", e.target.files[0], docName)
      }
      dispatch(uploadDocument({
        docId: docId,
        projectId: currentProject!.id,
        data: formData,
        docName
      }))
    }
  }
  const onConfirm = () => {
    dispatch(changeGenerateConfirmedPropositionDocumentLoadingStatus("loading"))
    dispatch(generateConfirmedPropositionDocument({
      projectId: currentProject!.id,
      unconfirmedPropId: currentProject!.documents?.find(doc => doc.name.includes('Proposition_to_sent'))?.id
    })).then(() => {
      dispatch(changeProposition({
        id: currentProject!.propositions[0].id,
        confirmed_by_client: true
      }))
      dispatch(generateIvoices({
        projectId: currentProject!.id,
        invoice_type: "First"
      }))
    }).then(() => {
      dispatch(changeGenerateConfirmedPropositionDocumentLoadingStatus("idle"))
    }).catch(() => {
      dispatch(changeGenerateConfirmedPropositionDocumentLoadingStatus("error"))
    })
  }
  const onPropSend = () => {
    propRequestFn(`${baseUrl}/api/v1/sent-invoice-to-email/`, "POST", {
      email,
      document_id: currentProject?.documents.find(doc => doc.type === "proposition_confirmed")?.id
    })
  }
  const onInvoiceSend = () => {
    invoiceRequestFn(`${baseUrl}/api/v1/sent-invoice-to-email/`, "POST", {
      email,
      document_id: currentProject?.documents.find(doc => doc.type === "First_invoice")?.id
    })
  }

  const disabledLogic = !!!currentProject

  const isConfirmBtnDisabled = useMemo(() => {
    return currentProject &&
      currentProject.propositions &&
      currentProject.propositions[0] &&
      !currentProject.propositions[0].confirmed_by_client &&
      !currentProject?.propositions[0]?.positions?.every(pos => {
        return pos.position_items.every(({ buying_price, client_price, amount, vat, units, }) => {
          return buying_price && client_price && amount && typeof vat === 'number' && units
        })
      })
  }, [currentProject])


  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)} className="createPrjectForm">
        <div className="inputs">
          <StatusOverlay $isNone={isNone} />
          <InputBlock>
            <Label>Projektname<span>*</span></Label>
            <Input disabled={!!currentProject?.propositions[0]?.confirmed_by_client} {...register("name", { required: true, validate: validateSelect })} className="position" placeholder='Name' />
          </InputBlock>
          <InputBlock>
            <Label>Verantwortliche Person<span>*</span></Label>
            <Select disabled={!!currentProject?.propositions[0]?.confirmed_by_client} {...register("respPerson", { required: true, validate: validateSelect })} className="customerSelect">
              <option className='option' value=''>----</option>
              {[...employees].sort((a, b) => a.name.localeCompare(b.name)).map(item => <option value={item.id} className='option' key={item.id}>{item.name}</option>)}
            </Select>
          </InputBlock>
          <InputBlock>
            <Label>Kunde<span>*</span></Label>
            <Select disabled={!!currentProject?.propositions[0]?.confirmed_by_client} {...register("customer", { required: true, validate: validateSelect })} className="customerSelect">
              <option className='option' value=''>----</option>
              {[...clients].sort((a, b) => a.name.localeCompare(b.name)).map(item => <option value={item.id} className='option' key={item.id}>{item.name}</option>)}
            </Select>
          </InputBlock>
        </div>
        <input disabled={!!currentProject?.propositions[0]?.confirmed_by_client} className="submit" type="submit" value="Speichern" onClick={() => dispatch(setIsIboxChatOpen(false))} />
        <div className="messages">
          {createProjectErrorMessage && <span style={{ color: 'red' }}>{createProjectErrorMessage}</span>}
          {createProjectsLoadingStatus !== 'idle' && createProjectsLoadingStatus}
          {fetchOneProjectLoadingStatus !== 'idle' && fetchOneProjectLoadingStatus}
          {updateProjectsLoadingStatus !== 'idle' && updateProjectsLoadingStatus}
        </div>
      </form>
      <div className="propositonBlock">
        <div className="title">Angebot</div>
        <PrimaryButton onClick={() => dispatch(setProjectIsCreatePropositionOpen(true))} $disabled={!!currentProject?.propositions.length || !currentProject} className="create"><img src={plus} alt="" /> Erstellen</PrimaryButton>
        <div className="propositionsListWrapper">
          <div className="propositionsList">
            {!!!currentProject?.propositions.length && <p className="placeholder">Bis jetzt kein Angebot erstellt</p>}
            {currentProject?.propositions.map(({ name }) => (
              <div key={name} className="proposition">
                <div className="name"><p className={"nameValue"}>{name}</p></div>
                <div className="btnContainer">
                  <SecondaryButton $disabled={!!currentProject?.propositions[0]?.confirmed_by_client} onClick={() => dispatch(setProjectIsCreatePropositionOpen(true))}>Bearbeiten</SecondaryButton>
                  <PrimaryButton
                    $disabled={isConfirmBtnDisabled
                      || !!currentProject?.propositions[0]?.confirmed_by_client
                      || generateConfirmedPropositionLoadingStatus === "loading"}
                    onClick={onConfirm}>
                    {
                      generateConfirmedPropositionLoadingStatus === "loading" ? "Laden" : "Bestätigen"
                    }
                  </PrimaryButton>
                </div>
              </div>
            ))[0]}
          </div>
          {isConfirmBtnDisabled && <p>Um den Vorschlag zu bestätigen, müssen <span style={{ color: "red" }}>Sie einige Positionselemente bearbeiten/ löschen</span></p>}
        </div>
      </div>
      {
        currentProject?.propositions[0] &&
        <div className=" confirmedBlock">
          <div className="title">Bestätigte Angebote</div>
          <div className="propositionsList">
            {!(currentProject.propositions[0].confirmed_by_client) && <p className="placeholder">Keine Angebote bestätigt</p>}
            {currentProject.propositions[0].confirmed_by_client && currentProject.propositions.map(item =>
              <div key={item.id} className="proposition">
                <div className="name"><img src={file} alt="" />
                  <p className={"nameValue"}>{item.name}</p>
                </div>
                <div className="btnContainer">
                  <div>
                    <PrimaryButton $disabled={propLoadingStatus === 'loading'} onClick={onPropSend}>Senden</PrimaryButton>
                    {propLoadingStatus === 'error' && <p className="btnStatus" style={{ color: "red" }} >Fehler</p>}
                    {propLoadingStatus === 'loading' && <p className="btnStatus"  >Laden...</p>}
                    {isPropSendSucces && <p className="btnStatus" style={{ color: "#6A994E" }}>Erfolg</p>}
                    {propReqResponse?.error && <p className="btnStatus" style={{ color: "red" }} >{propReqResponse.error}</p>}
                  </div>
                  <a
                    href={currentProject?.documents.find(doc => doc.type === "proposition_confirmed")?.document}
                    target="_blank"
                    rel="noopener noreferrer">
                    <PrimaryButton $disabled={disabledLogic}>Einsehen</PrimaryButton>
                  </a>
                </div>
              </div>)[0]}
          </div>
        </div >
      }
      < div className="documentsBlock" >
        <div className="title">Dokumente</div>
        <div className="documentsList">
          {currentProject?.documents.some(doc => doc.type === "First_invoice") &&
            <div className="document">
              <div className="name"><img src={file} alt="" /><p className={"nameValue"}>First invoice</p></div>
              <div className="btnContainer">
                <div>
                  <PrimaryButton $disabled={invoiceLoadingStatus === 'loading'} onClick={onInvoiceSend}>Senden</PrimaryButton>
                  {invoiceLoadingStatus === 'error' && <p className="btnStatus" style={{ color: "red" }} >Fehler</p>}
                  {invoiceLoadingStatus === 'loading' && <p className="btnStatus"  >Laden...</p>}
                  {isInvoiceSendSucces && <p style={{ color: "#6A994E" }}>Erfolg</p>}
                  {invoiceReqResponse?.error && <p className="btnStatus" style={{ color: "red" }} >{propReqResponse.error}</p>}
                </div>
                <a
                  href={currentProject?.documents.find(doc => doc.type === "First_invoice")?.document}
                  target="_blank"
                  rel="noopener noreferrer">
                  <PrimaryButton $disabled={disabledLogic}>Einsehen</PrimaryButton>
                </a>
              </div>
            </div>}
          <div className="document">
            <div className="name"><img src={file} alt="" /><p className={"nameValue"}>Montageplan</p></div>
            <div className="btnContainer">
              <PDFloader $disabled={disabledLogic} className="custom-file-upload">
                <input onChange={e => onAddDocument(e, currentProject!.documents.find(doc => doc.name.includes('Montageplan'))?.id, "Montageplan.pdf")} type="file" />
                Hochladen
              </PDFloader>
              <a
                href={currentProject?.documents.find(doc => doc.name.includes('Montageplan'))?.document}
                target="_blank"
                rel="noopener noreferrer">
                <PrimaryButton $disabled={!currentProject || (!!currentProject && !currentProject.documents.find(doc => doc.name.includes('Montageplan'))) || disabledLogic}>Einsehen</PrimaryButton>
              </a>
            </div>
          </div>
          <div className="document">
            <div className="name"><img src={file} alt="" /><p className={"nameValue"}>Stringplan</p></div>
            <div className="btnContainer">
              <PDFloader $disabled={disabledLogic || !currentProject} className="custom-file-upload">
                <input onChange={e => onAddDocument(e, currentProject!.documents.find(doc => doc.name.includes('Stringplan'))?.id, "Stringplan.pdf")} type="file" />
                Hochladen
              </PDFloader>
              <a
                href={currentProject?.documents.find(doc => doc.name.includes('Stringplan'))?.document}
                target="_blank"
                rel="noopener noreferrer">
                <PrimaryButton $disabled={!currentProject || (!!currentProject && !currentProject.documents.find(doc => doc.name.includes('Stringplan'))) || disabledLogic}>Einsehen</PrimaryButton>
              </a>
            </div>
          </div>
          <div className="document">
            <div className="name"><img src={file} alt="" /><p className={"nameValue"}>Lageplan</p></div>
            <div className="btnContainer">
              <PDFloader $disabled={disabledLogic || !currentProject} className="custom-file-upload">
                <input onChange={e => onAddDocument(e, currentProject!.documents.find(doc => doc.name.includes('Lageplan'))?.id, "Lageplan.pdf")} type="file" />
                Hochladen
              </PDFloader>
              <a
                href={currentProject?.documents.find(doc => doc.name.includes('Lageplan'))?.document}
                target="_blank"
                rel="noopener noreferrer">
                <PrimaryButton $disabled={!currentProject || (!!currentProject && !currentProject.documents.find(doc => doc.name.includes('Lageplan'))) || disabledLogic}>Einsehen</PrimaryButton>
              </a>
            </div>
          </div>
        </div>
      </ div>
      {isCreatePropositionOpen &&
        <CentralModalWindow
          title="Angebot erstellen"
          isOpen={isCreatePropositionOpen}
          closeModal={() => dispatch(setProjectIsCreatePropositionOpen(false))}>
          <ErrorBoundary>
            <CreateInvoiceForm insideProject={true} templateOfPositions={MOCK_POSITIONS} customerProp={currentProject?.customer} />
          </ErrorBoundary>
        </CentralModalWindow>
      }
    </Container >
  )
}

export default Step1