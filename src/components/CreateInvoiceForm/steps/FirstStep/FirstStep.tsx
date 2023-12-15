//libs
import { useSelector, useDispatch } from "react-redux";
import { FC, useEffect } from "react";
//redux
import {
  createProposition,
  changeProposition,
  createPosition,
  createPositionItem,
  createAdditionalProposition,
  createAdditionalPosition,
  createAdditionalPositionItem,
  setFetchPropositionLoadingStatus
} from "reduxFolder/slices/ProjectPropositionSlice";
//components
import { Input, NextButton } from "components/CreateInvoiceForm/styles";
import { UseFormGetValues, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
//types
import { AppDispatch, InvoiceFormInputs, RootStateType } from "types/index";
//hooks
import { useDebounce } from "hooks/useDebounce";



interface FirstStepProps {
  activeIndex: number,
  register: UseFormRegister<InvoiceFormInputs>,
  watch: UseFormWatch<InvoiceFormInputs>,
  reset?: (values?: any) => void;
  handleNextButton: () => void,
  insideProject: boolean,
  getValues: UseFormGetValues<InvoiceFormInputs>,
  isAdditional?: boolean,
  setValue: UseFormSetValue<InvoiceFormInputs>
}

const FirstStep: FC<FirstStepProps> = ({ activeIndex, register, watch, handleNextButton, reset, insideProject, getValues, isAdditional, setValue }) => {
  const projectId = useSelector((state: RootStateType) => state.Projects.currentProject)?.id
  // @ts-ignore
  const proposition = useSelector((state: RootStateType) => state.ProjectProposition.proposition)
  const fetchPropositionLoadingStatus = useSelector((state: RootStateType) => state.ProjectProposition.fetchPropositionLoadingStatus)
  const debouncedName = useDebounce(watch()?.name, 300)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (projectId && isAdditional) dispatch(setFetchPropositionLoadingStatus("loading"));

    if (debouncedName?.length && projectId && insideProject) {
      if (proposition) {
        dispatch(changeProposition({ name: debouncedName, id: proposition.id }))
      } else {
        dispatch(createProposition(
          [
            { name: debouncedName, project_id: projectId },
            { name: "first", project_id: projectId },
            { name: "second", project_id: projectId }
          ]
        ))
      }
    }

    if (debouncedName?.length && isAdditional && !insideProject) {
      dispatch(createAdditionalProposition({ name: getValues(`name`), project_id: projectId, additional_invoice_for_project: true }))
        .then(({ payload }) => {
          dispatch(createAdditionalPosition({ proposition_id: payload.id, title: "Position" }))
            .then(({ payload }) => {
              dispatch(createAdditionalPositionItem({ position_id: payload.id, name: "" }));
              dispatch(setFetchPropositionLoadingStatus("idle"))
            })
        })
    }
    // eslint-disable-next-line
  }, [debouncedName])

  useEffect(() => {
    if (proposition && proposition.name && reset && insideProject) {
      setValue(`name`, proposition.name)
    }
    // eslint-disable-next-line
  }, [])



  return (
    <div className={`inputWrapper ${activeIndex === 0 && "active"}`}>
      <p>Name</p>
      <Input
        type="text"
        placeholder="Bitte benennen Sie das Angebot"
        {...register("name", {
          required: true,
        })}
      />
      <NextButton
        onClick={() => {
          if (!insideProject && !isAdditional) {
            dispatch(createProposition({ name: getValues(`name`) }))
              .then(({ payload }) => {
                dispatch(createPosition({ proposition_id: payload.id, title: "Position" }))
                  .then(({ payload }) => {
                    dispatch(createPositionItem({ position_id: payload.id, name: "" }));
                  })
              })
          }
          handleNextButton();
        }}
        disabled={!(watch("name")?.length > 0) || (fetchPropositionLoadingStatus !== 'idle')}
        type="button"
      >
        Weiter
      </NextButton>
    </div>
  )
}

export default FirstStep;