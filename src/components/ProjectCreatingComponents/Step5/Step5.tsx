//libs
import { FC, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { baseUrl } from "services/API"
//redux
import { fetchOneProject, fetchProjectStatistic, uploadDocument } from "reduxFolder/slices/ProjectsSlice"
import { currentProjectCustomerEmail } from "reduxFolder/selectors"
import { generateIvoices, setIsAdditionalInvoiceSubmitted } from "reduxFolder/slices/DocumentsSlice"
import { deleteProposition } from "reduxFolder/slices/ProjectPropositionSlice";
//hooks
import useEmailAPI from "hooks/useEmailAPI"
//types
import { AppDispatch, RootStateType } from "types/index"
//components
import ProjectExpendituresOverviewTable from "components/ProjectExpendituresOverviewTable/ProjectExpendituresOverviewTable"
import ErrorBoundary from "components/ErrorBoundary/ErrorBoundary";
//styles
import { Container } from "./styles"
import { PrimaryButton, SecondaryButton, PDFloader } from "styles/global"
//images
import file from "assets/icons/file.svg"
import CentralModalWindow from "components/CentralModalWindow/CentralModalWindow";
import CreateInvoiceForm from "components/CreateInvoiceForm/CreateInvoiceForm";

const Step5 = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams()
  const currentProject = useSelector((state: RootStateType) => state.Projects.currentProject)
  const updateProjectsLoadingStatus = useSelector((state: RootStateType) => state.Projects.updateProjectsLoadingStatus)
  const [invoiceRequestFn,
    invoiceLoadingStatus,
    emailResponse,
    emailIsSucces] = useEmailAPI();
  const email = useSelector(currentProjectCustomerEmail)
  const generateInvoicesLoadingStatus = useSelector((state: RootStateType) => state.Documents.generateInvoicesLoadingStatus);
  const isAdditionalInvoiceSubmitted = useSelector((state: RootStateType) => state.Documents.isAdditionalInvoiceSubmitted);
  const [isCreateAdditionalInvoice, setIsCreateAdditionalInvoice] = useState<boolean>(false);
  const additionalProposition = useSelector((state: RootStateType) => state.ProjectProposition.additionalProposition);


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
  const disabledLogic = !!currentProject && currentProject.status === "Completed"


  useEffect(() => {
    if (id) dispatch(fetchOneProject(id))
      .then(res => dispatch(fetchProjectStatistic(res.payload.id)))
    // eslint-disable-next-line
  }, [id])

  const onInvoiceSend = () => {
    invoiceRequestFn(`${baseUrl}/api/v1/sent-invoice-to-email/`, "POST", {
      email,
      document_id: currentProject?.documents.find(doc => doc.type === "Third_invoice")?.id
    })
  }


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
  const generateInvoice = () => {
    dispatch(generateIvoices({
      projectId: currentProject!.id,
      invoice_type: "Third"
    }))
  }
  const thirdInvoice = currentProject?.documents.find(doc => doc.type === "Third_invoice")


  return (
    <Container>
      < div className="documentsBlock" >
        <div className="blockTitle">Dokumentation</div>
        <div className="documentsList">
          <div className="document">
            <div className="name"><img src={file} alt="" /><p className={"nameValue"}>Messprotokoll</p></div>
            <div className="btnContainer">
              <PDFloader $disabled={disabledLogic || !currentProject} className="custom-file-upload">
                <input onChange={e => onAddDocument(e, currentProject!.documents.find(doc => doc.name.includes('Measurement_protocol'))?.id, "Measurement_protocol.pdf")} type="file" />
                Hochladen
              </PDFloader>
              <a
                href={currentProject?.documents.find(doc => doc.name.includes('Measurement_protocol'))?.document}
                target="_blank"
                rel="noopener noreferrer">
                <PrimaryButton $disabled={!currentProject || (!!currentProject && !currentProject.documents.find(doc => doc.name.includes('Measurement_protocol'))) || disabledLogic}>Einsehen</PrimaryButton>
              </a>
            </div>
          </div>
          <div className="document">
            <div className="name"><img src={file} alt="" />
              <p className={"nameValue"}>Abnahmeprotokoll</p>
            </div>
            <div className="btnContainer">
              <PDFloader $disabled={disabledLogic || !currentProject} className="custom-file-upload">
                <input onChange={e => onAddDocument(e, currentProject!.documents.find(doc => doc.name.includes('Acceptance_protocol'))?.id, "Acceptance_protocol.pdf")} type="file" />
                Hochladen
              </PDFloader>
              <a
                href={currentProject?.documents.find(doc => doc.name.includes('Acceptance_protocol'))?.document}
                target="_blank"
                rel="noopener noreferrer">
                <PrimaryButton $disabled={!currentProject || (!!currentProject && !currentProject.documents.find(doc => doc.name.includes('Acceptance_protocol'))) || disabledLogic}>Einsehen</PrimaryButton>
              </a>
            </div>
          </div>
          {
            !hidenLogic &&
            <div className="document">
              <div className="name"><img src={file} alt="" /><p className={"nameValue"}>Schlussrechnung</p></div>
              <div className="btnContainer">
                <div>
                  <PrimaryButton onClick={generateInvoice} $disabled={!!thirdInvoice}>Generieren</PrimaryButton>
                  {generateInvoicesLoadingStatus === 'error' && generateInvoicesLoadingStatus}
                  {generateInvoicesLoadingStatus === 'loading' && generateInvoicesLoadingStatus}
                </div>
                <div>
                  <SecondaryButton $disabled={!thirdInvoice || invoiceLoadingStatus === 'loading'} onClick={onInvoiceSend}>Senden</SecondaryButton>
                  {invoiceLoadingStatus === 'error' && <p className="btnStatus" style={{ color: "red" }} >Fehler</p>}
                  {invoiceLoadingStatus === 'loading' && <p className="btnStatus"  >Laden...</p>}
                  {emailIsSucces && <p style={{ color: "#6A994E" }}>Erfolg</p>}
                  {emailResponse?.error && <p className="btnStatus" style={{ color: "red" }} >{emailResponse.error}</p>}
                </div>
                <a
                  href={thirdInvoice?.document ?? ''}
                  target="_blank"
                  rel="noopener noreferrer">
                  <PrimaryButton $disabled={disabledLogic || !thirdInvoice}>Einsehen</PrimaryButton>
                </a>
              </div>
            </div>
          }
          {
            hidenLogic &&
            <p>Einige Funktionen sind in diesem Schritt nicht verfügbar, da sie von Daten abhängen, die Sie im vorherigen Schritt nicht hinzugefügt haben</p>
          }
          {currentProject?.documents.filter(doc => doc.additional_invoice_for_project).map((doc) => (
            <AdditionalInvoiceContainer
              key={doc.id}
              doc={doc}
              disabledLogic={disabledLogic}
            />
          ))}                </div>
        <div className="add">
          {!disabledLogic && <SecondaryButton onClick={() => {
            setIsCreateAdditionalInvoice(true);
            dispatch(setIsAdditionalInvoiceSubmitted(false));
          }}>Zusätzliche Rechnung erstellen</SecondaryButton>}
        </div>
      </ div>
      <div className="statisticBlock">
        <div className="blockTitle">Statistik</div>
        <div className="statisticCards">
          <div className="card">
            <div className="textBlock">
              <p className="name revenue">Einnahmen</p>
              <p className="total">Insgesamt</p>
            </div>
            <div className="value">
              {updateProjectsLoadingStatus === 'error' ? "Error" : Math.round(currentProject?.revenue ?? 0)} €
            </div>
          </div>
          <div className="card">
            <div className="textBlock">
              <p className="name expenditures">Ausgaben</p>
              <p className="total">Insgesamt</p>
            </div>
            <div className="value">
              {updateProjectsLoadingStatus === 'error' ? "Error" : Math.round(currentProject?.expenditures ?? 0)} €
            </div>
          </div>
          <div className="card">
            <div className="textBlock">
              <p className="name profit">Gewinn</p>
              <p className="total">Insgesamt</p>
            </div>
            <div className="value">
              {updateProjectsLoadingStatus === 'error' ? "Error" : Math.round((currentProject?.revenue ?? 0) - (currentProject?.expenditures ?? 0))} €
            </div>
          </div>
        </div>
        {isCreateAdditionalInvoice && (
          <CentralModalWindow
            title="Rechnung erstellen"
            isOpen={isCreateAdditionalInvoice}
            closeModal={() => {
              setIsCreateAdditionalInvoice(false)
              if (additionalProposition && !isAdditionalInvoiceSubmitted) {
                dispatch(deleteProposition({ proposition_id: Number(additionalProposition.id), isAdditional: true }))
              }
            }}
          >
            <CreateInvoiceForm insideProject={false} customerProp={currentProject?.customer} isAdditional={true} />
          </CentralModalWindow>
        )}
        <ErrorBoundary>
          <ProjectExpendituresOverviewTable />
        </ErrorBoundary>
      </div>
    </Container>
  )
}

export default Step5

const AdditionalInvoiceContainer: FC<{
  doc: {
    "id": string | number,
    document: string,
    "name": string,
  },
  disabledLogic: boolean
}> = ({ doc, disabledLogic }) => {
  const [invoiceRequestFn,
    invoiceLoadingStatus,
    emailResponse,
    emailIsSucces] = useEmailAPI();
  const currentProject = useSelector((state: RootStateType) => state.Projects.currentProject)
  const email = useSelector(currentProjectCustomerEmail)

  const onInvoiceSend = (name: string) => {
    invoiceRequestFn(`${baseUrl}/api/v1/sent-invoice-to-email/`, "POST", {
      email,
      document_id: currentProject?.documents.find(doc => doc.name.includes(name))?.id
    })
  }

  return (
    <div className="document">
      <div className="name"><img src={file} alt="" /><p className={"nameValue"}>{doc.name}</p></div>
      <div className="btnContainer">
        <div>
          <SecondaryButton $disabled={disabledLogic || invoiceLoadingStatus === 'loading'} onClick={() => onInvoiceSend(doc.name)}>Senden</SecondaryButton>
          {invoiceLoadingStatus === 'error' && <p className="btnStatus" style={{ color: "red" }} >Fehler</p>}
          {invoiceLoadingStatus === 'loading' && <p className="btnStatus"  >Laden...</p>}
          {emailIsSucces && <p style={{ color: "#6A994E" }}>Erfolg</p>}
          {emailResponse?.error && <p className="btnStatus" style={{ color: "red" }} >{emailResponse.error}</p>}
        </div>
        <a
          href={doc.document}
          target="_blank"
          rel="noopener noreferrer">
          <PrimaryButton>Einsehen</PrimaryButton>
        </a>
      </div>
    </div>
  )

}