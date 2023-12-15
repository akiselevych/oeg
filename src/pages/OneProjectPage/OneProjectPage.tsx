//components
import Step1 from "components/ProjectCreatingComponents/Step1/Step1"
import Step2 from "components/ProjectCreatingComponents/Step2/Step2"
import Step3 from "components/ProjectCreatingComponents/Step3/Step3"
import Step4 from "components/ProjectCreatingComponents/Step4/Step4"
import Step5 from "components/ProjectCreatingComponents/Step5/Step5"
import Chat from "components/ProjectCreatingComponents/Chat/Chat";
import CentralModalWindow from "components/CentralModalWindow/CentralModalWindow"
import ErrorBoundary from "components/ErrorBoundary/ErrorBoundary"
//libs
import { useState, useMemo, useEffect, CSSProperties } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import moment from "moment"
//redux
import { setCurrentProject, fetchOneProject, updateProject } from "reduxFolder/slices/ProjectsSlice"
import {
  changeMaterialValues,
  resetPropositions
} from "reduxFolder/slices/ProjectPropositionSlice"
import { fetchCurrentChat, resetCurrentProjectChat } from "reduxFolder/slices/ProjectsChats.slice";
//types 
import { RootStateType, PositionItemType, PosItemChangeMaterialType, AppDispatch, ProjectDetails } from "types/index"
//styles
import { Container } from "./styles"
import { PrimaryButton, SecondaryButton } from "styles/global"
//images
import grennChek from 'assets/icons/greenChek.svg'
import spiner from "assets/icons/spinner.svg"
import EventModal from "components/EventModal/EventModal";
import { fetchInboxProjectChats, setIsIboxChatOpen } from "reduxFolder/slices/Inbox.slice";



const modalStyle: CSSProperties = {
  top: `2%`,
  right: `52%`
}

const OneProjectPage = () => {
  const currentProject = useSelector((state: RootStateType) => state.Projects.currentProject)
  const fetchOneProjectLoadingStatus = useSelector((state: RootStateType) => state.Projects.fetchOneProjectLoadingStatus)
  const user = useSelector((state: RootStateType) => state.Login.user);
  const userChats = useSelector((state: RootStateType) => state.InboxChats.projectChats);

  const [currentStep, setCurrentStep] = useState<null | number>(null);
  const [isProblemsWindowOpen, setIsProblemsWindowOpen] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isShowChat, setIsShowChat] = useState<boolean>(true);

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

  useEffect(() => {
    if (id) dispatch(fetchOneProject(id))
      .then((res) => {
        setCurrentStep(+res.payload.step_status)
        if (user && !currentChat) {
          dispatch(fetchInboxProjectChats());
        }
      })
    // eslint-disable-next-line
  }, [id])


  useEffect(() => {
    setCurrentStep(null)
    if (userChats.length === 0) {
      dispatch(fetchInboxProjectChats());
    }
    // eslint-disable-next-line
  }, [id])





  const currentChat = useMemo(() => {
    // @ts-ignore
    return userChats.find(chat => currentProject && chat.project === parseInt(currentProject.id));
  }, [currentProject, userChats])

  useEffect(() => {
    if (!!currentChat && currentChat.id) {
      dispatch(fetchCurrentChat(currentChat.id));
      setIsShowChat(true);
    }
    // eslint-disable-next-line
  }, [currentChat]);

  useEffect(() => {
    dispatch(setIsIboxChatOpen(false));
    return () => {
      dispatch(resetCurrentProjectChat());
      dispatch(resetPropositions());
    }
    // eslint-disable-next-line
  }, []);

  const closePage = () => {
    dispatch(setCurrentProject(null))
    navigate('/projects')
  }

  const step5Data = useMemo(() => {
    let res: {
      data: PosItemChangeMaterialType,
      materialId: string | number,
      positionId: string | number
    }[] | null = null
    if (hidenLogic) return []
    if (currentStep === 5 && currentProject?.status !== 'Completed') {
      const positionItems: PositionItemType[] = []

      currentProject?.propositions[0].positions.forEach(position => {
        position.position_items.forEach(item => positionItems.push(item))
      })

      res = positionItems.map(item => ({
        materialId: item.material?.id,
        positionId: item.position,
        data: {
          position_item_id: item.id!,
          reserved_count: -item.amount!,
          add_ordered_for_item: false
        }
      }))
    }
    return res
    // eslint-disable-next-line
  }, [currentStep, currentProject])

  const onNextButtonClick = () => {
    if (currentStep === 1) {
      if (currentProject?.stepStatus === "1") {
        dispatch(updateProject({
          id: currentProject!.id,
          body: {
            step_status: 2,
            project_status: "In progress"
          }
        }))
      }
      setCurrentStep(prev => (prev ?? 1) + 1)
    }
    if (currentStep === 2) {
      if (currentProject?.stepStatus === "2") {
        dispatch(updateProject({
          id: currentProject!.id,
          body: {
            step_status: 3
          }
        }))
      }
      setCurrentStep(prev => (prev ?? 1) + 1)
    }
    if (currentStep === 3) {
      if (currentProject?.stepStatus === "3") {
        dispatch(updateProject({
          id: currentProject!.id,
          body: {
            step_status: 4
          }
        }))
      }
      setCurrentStep(prev => (prev ?? 1) + 1)
    }
    if (currentStep === 4) {
      if (currentProject?.stepStatus === "4") {
        dispatch(updateProject({
          id: currentProject!.id,
          body: {
            step_status: 5
          }
        }))
      }
      setCurrentStep(prev => (prev ?? 1) + 1)
    }
    if (currentStep === 5) {
      if (disabledArr.find((item) => item.step === 5)?.disabled) {
        setIsProblemsWindowOpen(true)
      } else {
        dispatch(updateProject({
          id: currentProject!.id,
          body: {
            project_status: "Completed",
            finished_at: moment().format('YYYY-MM-DDTHH:mm:ss[Z]')
          }
        }))
        dispatch(changeMaterialValues(step5Data!))

      }
    }
  }



  const disabledArr = useMemo(() => {
    const arr: { step: number, disabled: boolean }[] = [{ step: 1, disabled: false }, {
      step: 2,
      disabled: false
    }, { step: 3, disabled: false }, { step: 4, disabled: false }, { step: 5, disabled: false }]

    const positionItems: PositionItemType[] = []


    currentProject?.propositions[0]?.positions.forEach(position => {
      position.position_items.forEach(item => positionItems.push(item))
    })

    if (currentStep === 1) {
      arr[arr.findIndex(item => item.step === 1)].disabled = !!!currentProject?.propositions[0] || !currentProject?.propositions[0].confirmed_by_client!
      //for step2
      arr[arr.findIndex(item => item.step === 2)].disabled = positionItems.some(item => !item.material) || !!!positionItems.length
    }
    //for step2
    arr[arr.findIndex(item => item.step === 2)].disabled = positionItems.some(item => !item.material) || !!!positionItems.length


    if (currentStep === 5) {
      arr[arr.findIndex(item => item.step === 5)].disabled = !!getProblems(currentProject!, hidenLogic).length
    }


    return arr
    // eslint-disable-next-line
  }, [currentProject, currentStep])



  const steps = [
    {
      step: 1,
      content: <Step1 />,
      pickOtherStep: false
    }, {
      step: 2,
      content: <Step2 />,
      pickOtherStep: false
    }, {
      step: 3,
      content: <Step3 />,
      pickOtherStep: true
    }, {
      step: 4,
      content: <Step4 setIsModalOpen={setIsModalOpen} />,
      pickOtherStep: true
    }, {
      step: 5,
      content: <Step5 />,
      pickOtherStep: true
    }
  ]

  return (
    <Container>
      <div className="project">
        {(!!id && currentStep === null) &&
          <div className="spinerOverlay">
            <img className="spiner" src={spiner} alt="" />
          </div>
        }
        <div className="progressBlock">
          {
            steps.map((step, i) => {
              return (
                <div
                  key={i}
                  className={`stepContainer ${i + 1 === currentStep ? 'activeStepContainer' : ""} ${(currentProject && currentProject.status === "Completed")
                    || (currentProject && +currentProject.stepStatus > 2 && (step.step === 1 || step.step === 2)) ? 'completedContainer' : ""} `}
                  onClick={() => {
                    if (currentProject) {
                      setCurrentStep(step.step)
                    }
                  }}
                >
                  <div className="step">
                    <div className="stepValue">
                      {
                        (currentProject && currentProject.status === "Completed")
                          || (currentProject && +currentProject.stepStatus > 2 && (step.step === 1 || step.step === 2))
                          ?
                          <img src={grennChek} alt="" />
                          : step.step}
                    </div>
                    <div className="stepName">
                      {'Schritt' + step.step}
                    </div>
                  </div>
                  {i !== steps.length - 1 && <span className="line"></span>}
                </div>
              )
            })}
        </div>
        <div className="main">
          <ErrorBoundary>
            {steps.find(item => item.step === (currentStep ?? 1))?.content}
          </ErrorBoundary>
        </div>
        <div className="btnGroup">
          <SecondaryButton
            onClick={() => currentStep === 1 ? closePage() : setCurrentStep(prev => +(prev ?? 1) - 1)}>
            Zurück
          </SecondaryButton>
          <PrimaryButton
            $disabled={currentStep === 5 && currentProject?.status === 'Completed' ? true : currentStep === 5 ? false : disabledArr[disabledArr.findIndex(item => item.step === currentStep)]?.disabled}
            onClick={onNextButtonClick}>
            {currentStep === steps.length ? "Projekt abschließen" : "Weiter"}
          </PrimaryButton>
        </div>
      </div>

      {(!!id && currentStep !== null && isShowChat) && <div className="chat" style={{ zIndex: "998" }}>
        <Chat insideProject={true} />
      </div>}

      {fetchOneProjectLoadingStatus === 'error' &&
        <CentralModalWindow closeModal={() => setIsModalOpen(false)} height="300px"
          isOpen={fetchOneProjectLoadingStatus === 'error'} title="Error message">
          Etwas ging schief, oder das Projekt existiert nicht,
          <br /> oder es gibt Verbindungsprobleme. Bitte aktualisieren Sie die Seite oder versuchen Sie es später erneut

        </CentralModalWindow>}
      {
        isProblemsWindowOpen &&
        <CentralModalWindow closeModal={() => setIsProblemsWindowOpen(false)} height="250px"
          isOpen={isProblemsWindowOpen} title="Probleme">
          <div className="problemsWrapper">
            {getProblems(currentProject!, hidenLogic).map((item, i) => <p key={i}>{i + 1}) {item}</p>)}
          </div>
        </CentralModalWindow>

      }
      {isModalOpen && <EventModal setIsModal={setIsModalOpen} insideProject={true} style={modalStyle} />}
    </Container>
  )
}

export default OneProjectPage

const getProblems = (project: ProjectDetails, hiddenLogic: boolean) => {
  const problems: string[] = []
  const positionItems: PositionItemType[] = []

  if (hiddenLogic) {
    problems.push("Sie haben die vorherigen Schritte nicht abgeschlossen, bitte tun Sie dies, um das Projekt abzuschließen")
    return problems
  }

  project?.propositions[0].positions.forEach(position => {
    position.position_items.forEach(item => positionItems.push(item))
  })
  if (project.status === 'Completed') {
    problems.push("Project is already finished")
    return problems
  }
  if (!project.documents.some(doc => doc.name.includes("Montageplan"))) {
    problems.push("Hochladen das Montageplan.pdf herunter (Schritt 1)");
  }
  if (!project.documents.some(doc => doc.name.includes("Stringplan"))) {
    problems.push("Hochladen das Stringplan.pdf herunter (Schritt 1)");
  }
  if (!project.documents.some(doc => doc.name.includes("Lageplan"))) {
    problems.push("Hochladen das Lageplan.pdf herunter (Schritt 1)");
  }
  if (!project.propositions[0].network_requested) {
    problems.push("Sie sollten eine Netzwerkanfrage stellen (Schritt 2)");
  }
  if (positionItems.some(({ paid }) => !paid)) {
    problems.push("Einige Positionen sind nicht bezahlt (Schritt 2)");
  }
  if (positionItems.some(({ reserved }) => !reserved)) {
    problems.push("Einige Positionen sind nicht reserviert (Schritt 3)");
  }
  if (positionItems.some(({ reserved }) => !reserved)) {
    problems.push("Einige Positionen sind nicht reserviert (Schritt 3)");
  }
  if (!project.documents.some(doc => doc.type === "Second_invoice")) {
    problems.push("Sie sollten die zweite Rechnung generieren und senden (Schritt 4)");
  }
  if (!project.documents.some(doc => doc.name.includes("Measurement_protocol"))) {
    problems.push("Hochladen das Messprotokoll.pdf herunter (Schritt 5)");
  }
  if (!project.documents.some(doc => doc.name.includes("Acceptance_protocol"))) {
    problems.push("Hochladen das Abnahmeprotokoll.pdf herunter (Schritt 5)");
  }
  if (!project.documents.some(doc => doc.type === "Third_invoice")) {
    problems.push("Sie sollten die Schlussrechnung generieren und senden (Schritt 5)");
  }
  return problems
}


