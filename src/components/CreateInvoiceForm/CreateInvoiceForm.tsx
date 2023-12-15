//libs
import {FC, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {
    generateInvoicesWithoutProject,
    generateAdditionalInvoice,
    generateUnconfirmedPropositionDocument,
    updateUnconfirmedPropositionDocument, setIsAdditionalInvoiceSubmitted
} from "reduxFolder/slices/DocumentsSlice";
import {SubmitHandler, useForm} from "react-hook-form";
//components
import FirstStep from "components/CreateInvoiceForm/steps/FirstStep/FirstStep";
import SecondStep from "components/CreateInvoiceForm/steps/SecondStep/SecondStep";
import ThirdStep from "components/CreateInvoiceForm/steps/ThirdStep/ThirdStep";
import PdfComp from "components/CreateInvoiceForm/steps/PdfComp/PdfComp";
//styles
import {
    Container,
    Form,
    FormSteps,
    NextButton,
    StepName,
} from "components/CreateInvoiceForm/styles";
//types
import {AppDispatch, InvoiceFormInputs, RootStateType} from "types/index";
import {baseUrl} from "../../services/API";


interface CreateInvoiceFormProps {
    customerProp?: string | number | undefined,
    templateOfPositions?: string[],
    insideProject: boolean,
    isAdditional?: boolean
}

const CreateInvoiceForm: FC<CreateInvoiceFormProps> = ({
                                                           customerProp,
                                                           templateOfPositions,
                                                           insideProject,
                                                           isAdditional
                                                       }) => {
    const dispatch = useDispatch<AppDispatch>()
    const currentProject = useSelector((state: RootStateType) => state.Projects.currentProject)
    const proposition = useSelector((state: RootStateType) => state.ProjectProposition.proposition)
    const additionalProposition = useSelector((state: RootStateType) => state.ProjectProposition.additionalProposition);
    const generateInvoiceWithoutProjectLoadingStatus = useSelector((state: RootStateType) => state.Documents.generateInvoiceWithoutProjectLoadingStatus);
    const generateAdditionalInvoiceLoadingStatus = useSelector((state: RootStateType) => state.Documents.generateAdditionalInvoiceLoadingStatus);
    const generatePropositionDocumentLoadingStatus = useSelector((state: RootStateType) => state.Documents.generatePropositionDocumentLoadingStatus);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [wasSubmitted, setWasSubmitted] = useState<boolean>(false);
    const [completed, setCompleted] = useState<number[]>([0]);
    const [pdfLink, setPdfLink] = useState<string | null>(null);
    const [pdfId, setPdfId] = useState<number | null>(null);
    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
        setValue,
        getValues,
        watch,
        control,
        trigger,
        reset
    } = useForm<InvoiceFormInputs>({
        mode: "onTouched",
        defaultValues: {
            name: "",
            customer: customerProp,
            options: {
                positions: [
                    {
                        position: null,
                        position_items: [
                            {
                                name: null,
                                amount: null,
                                buying_price: null,
                                units: null,
                                client_price: null,
                                vat: null,
                                total: null,
                            }
                        ]
                    },
                ],
                notes: "",
                title: "Die Tragfähigkeit des Dachs für den zusätzlichen Ballast ist bauseits zu prüfen. Ggf. ist die Einbindung der PV-Anlage in den Blitzschutz erforderlich, diese erfolgt bauseits. Die ÖEG kann in Abhängigkeit der Liefersituation Komponenten durch ähnliche ersetzen. Es kann derzeit kein Liefer/Montagetermin garantiert werden. Das Angebot ist 14 Tage gültig. Die Liefersituation lässt momentan leider keine längeren Preiszusagen zu. Preiserhöhungen unserer Lieferanten geben wir an den Kunden weiter. Dies kann auch nach Auftragsbestätigung erfolgen. Der Auftrag kommt erst nach gesonderter Bestätigung durch uns zu Stande.",
                price: "0.00 €",
                vat: "0 €",
                totalAmount: "0.00 €",
            }
        }
    });


    const handleNextButton = () => {
        setCompleted((prevState) => [...prevState, activeIndex + 1]);
        setActiveIndex((prevState) => prevState + 1);
    }


    const onSubmit: SubmitHandler<InvoiceFormInputs> = async (data) => {
        if (insideProject) {
            if (!currentProject?.documents.some(doc => doc.name.includes('Proposition_to_sent'))) {
                const {payload} = await dispatch(generateUnconfirmedPropositionDocument({projectId: currentProject?.id!}))
                setPdfLink(baseUrl + payload.url);
                setPdfId(payload.id);
            } else {
                const {payload} = await dispatch(updateUnconfirmedPropositionDocument({
                    projectId: currentProject?.id!,
                    docId: currentProject.documents.find(doc => doc.name.includes('Proposition_to_sent'))!.id
                }))
                setPdfLink(baseUrl + payload.url);
                setPdfId(payload.id);
            }
            setWasSubmitted(true);
            setCompleted((prevState) => [...prevState, activeIndex + 1])
            setActiveIndex(activeIndex + 1);
        } else if (!insideProject && proposition && !isAdditional) {
            const {payload} = await dispatch(generateInvoicesWithoutProject({proposition_id: proposition.id}));
            setPdfLink(baseUrl + payload.url);
            setPdfId(payload.id)
            setWasSubmitted(true);
            setCompleted((prevState) => [...prevState, activeIndex + 1])
            setActiveIndex(activeIndex + 1);
        } else if (!insideProject && isAdditional && additionalProposition) {
            const {payload} = await dispatch(generateAdditionalInvoice({
                proposition_id: additionalProposition.id,
                project_id: currentProject!.id
            }));
            setPdfLink(baseUrl + payload.url);
            setPdfId(payload.id);
            setWasSubmitted(true);
            setCompleted((prevState) => [...prevState, activeIndex + 1])
            setActiveIndex(activeIndex + 1);
            dispatch(setIsAdditionalInvoiceSubmitted(true));
        }

    }

    const handleClassNameForStepPoint = (stepIndex: number): string => {
        let className
        if (activeIndex === stepIndex) {
            className = "active";
        } else if (completed.includes(stepIndex)) {
            className = "previous";
        } else {
            className = "";
        }
        return className;
    }
    const handleBackToPrevStep = (index: number) => {
        if (completed.includes(index)) {
            setActiveIndex(index)
        }
    }

    return (
        <Container>
            <FormSteps>
                <StepName
                    className={handleClassNameForStepPoint(0)}
                    onClick={() => handleBackToPrevStep(0)}>Projekt Bezeichnung</StepName>
                {!customerProp && <StepName
                    className={handleClassNameForStepPoint(1)}
                    onClick={() => handleBackToPrevStep(1)}>Kunde wählen</StepName>}
                <StepName
                    className={handleClassNameForStepPoint(customerProp ? 1 : 2)}
                    onClick={() => handleBackToPrevStep(customerProp ? 1 : 2)}>Optionen auswählen</StepName>
                <StepName
                    className={handleClassNameForStepPoint(customerProp ? 2 : 3)}
                    onClick={() => handleBackToPrevStep(customerProp ? 2 : 3)}>Dokumentenvorschau</StepName>
            </FormSteps>
            <Form onSubmit={handleSubmit(onSubmit)}>
                {activeIndex === 0 &&
                    <FirstStep reset={reset} activeIndex={activeIndex} register={register} watch={watch}
                               handleNextButton={handleNextButton}
                               insideProject={insideProject}
                               getValues={getValues}
                               isAdditional={isAdditional}
                               setValue={setValue}
                    />}

                {!customerProp && activeIndex === 1 &&
                    <SecondStep activeIndex={activeIndex} errors={errors} register={register} watch={watch}
                                handleNextButton={handleNextButton} insideProject={insideProject}
                                getValues={getValues}
                                isAdditional={isAdditional}
                    />
                }

                {((customerProp && activeIndex === 1) || (!customerProp && activeIndex === 2)) &&
                    <ThirdStep
                        trigger={trigger}
                        templateOfPositions={templateOfPositions}
                        activeIndex={activeIndex}
                        register={register}
                        watch={watch}
                        control={control}
                        setValue={setValue}
                        getValues={getValues}
                        reset={reset}
                        insideProject={insideProject}
                        isAdditional={isAdditional}
                    />
                }

                {wasSubmitted && ((customerProp && activeIndex === 2) || (!customerProp && activeIndex === 3)) &&
                    <PdfComp
                        activeIndex={activeIndex}
                        invoiceLink={pdfLink !== null ? pdfLink : undefined}
                        invoiceId={pdfId !== null ? pdfId : undefined}
                        reset={reset}
                    />
                }

                {((customerProp && activeIndex === 1) || (!customerProp && activeIndex === 2)) &&
                    <NextButton
                        disabled={!isValid || (generateInvoiceWithoutProjectLoadingStatus !== "idle" || generateAdditionalInvoiceLoadingStatus !== 'idle' || generatePropositionDocumentLoadingStatus !== "idle")}
                        type="submit"
                    >
                        {(generateInvoiceWithoutProjectLoadingStatus === "loading" || generatePropositionDocumentLoadingStatus === "loading" || generateAdditionalInvoiceLoadingStatus === "loading")
                            ?
                            "Laden..."
                            :
                            "Weiter"
                        }
                    </NextButton>}
            </Form>
        </Container>
    )
}

export default CreateInvoiceForm;