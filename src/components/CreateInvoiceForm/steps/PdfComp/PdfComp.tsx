import { PrimaryButton, SecondaryButton } from "styles/global";
import { PreviewWrapper } from "components/CreateInvoiceForm/steps/PdfComp/styles";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootStateType } from "types/index";
import useEmailAPI from "hooks/useEmailAPI";
import { baseUrl } from "services/API";
import { currentProjectCustomerEmail, dashboardCustomerEmail } from "reduxFolder/selectors";
import { setDashboardIsCreateInvoiceOpen, setProjectIsCreatePropositionOpen } from "reduxFolder/slices/PagesStateSlice";


interface PdfProps {
  activeIndex: number,
  invoiceLink?: string,
  invoiceId?: number,
  reset?: (values?: any) => void,
}
const PdfComp: FC<PdfProps> = ({ activeIndex, invoiceLink, invoiceId, reset }) => {
  const document = useSelector((state: RootStateType) => state.Projects.currentProject)?.documents?.find(doc => doc.name.includes('Proposition_to_sent'))
  const generatePropositionDocumentLoadingStatus = useSelector((state: RootStateType) => state.Documents.generatePropositionDocumentLoadingStatus)
  const emailFromProject = useSelector(currentProjectCustomerEmail)
  const emailFromDashboard = useSelector(dashboardCustomerEmail)
  const dispatch = useDispatch<AppDispatch>();
  const [requestFn,
    loadingStatus,
    //eslint-disable-next-line
    emailResponse,
    emailIsSucces] = useEmailAPI();
  // const [isSpinner, setIsSpinner] = useState<boolean>(true);


  ///we add this, because sometimes when we already ahe link for document, 
  /// this document was not craeted in database yet, so we need to wait for it
  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsSpinner(false)
  //   }, 1000)
  // }, [])

  const onSend = () => {
    requestFn(`${baseUrl}/api/v1/sent-invoice-to-email/`, "POST", {
      email: emailFromDashboard != null ? emailFromDashboard : emailFromProject,
      document_id: invoiceId || document?.id
    })
    dispatch(setDashboardIsCreateInvoiceOpen(false));
    dispatch(setProjectIsCreatePropositionOpen(false));
  }


  return (
    <PreviewWrapper className={`${activeIndex === 3 && "active"}`}>
      <div className="documentWrapper">
        {invoiceLink &&
          < iframe title="1" src={invoiceLink} width="800" height="400" style={{ border: 'border: 1px solid black' }} />
        }
        {/* {isSpinner && <img className="spiner" src={spiner} alt="" />} */}
      </div>
      <div className="buttonsWrapper">
        <a
          href={invoiceLink}
          target="_blank"
          rel="noopener noreferrer">
          <SecondaryButton $disabled={generatePropositionDocumentLoadingStatus !== 'idle'}>PDF anzeigen</SecondaryButton>
        </a>
        <div>
          <PrimaryButton $disabled={loadingStatus === 'loading'} onClick={onSend}>An den Kunden senden</PrimaryButton>
          {loadingStatus === 'loading' && 'lade'}
          {loadingStatus === 'error' && 'fehler'}
          {emailIsSucces && <p style={{ color: "#6A994E" }}>Erfolg</p>}
        </div>
      </div>
    </PreviewWrapper>
  )
}

export default PdfComp;