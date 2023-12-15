//libs
import { FC, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
//redux
import { createPositionItem } from "reduxFolder/slices/ProjectPropositionSlice";
import { updateProject } from "reduxFolder/slices/ProjectsSlice";
//types
import { AppDispatch, RootStateType } from "types/index"
//styles
import { Container, Form, Input, SubmitButton } from "./styles"

const CreateMaterialInProjectForm: FC<{ position_id: number | string | undefined, isOpen: boolean; close: () => void }> = ({ position_id, isOpen, close }) => {
  const dispatch = useDispatch<AppDispatch>()
  const changePropositionLoadingStatus = useSelector((state: RootStateType) => state.ProjectProposition.changePropositionLoadingStatus)
  const currentProject = useSelector((state: RootStateType) => state.Projects.currentProject)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm();
  const [wasSubmited, setWasSubmited] = useState<boolean>(false)
  // @ts-ignore
  const onSubmit = (data) => {
    const { name, price, amount } = data
    setWasSubmited(true)
    dispatch(createPositionItem({ position_id: position_id!, name, buying_price: price, amount }))
  }


  useEffect(() => {
    if (changePropositionLoadingStatus === "idle" && wasSubmited) {
      setWasSubmited(false)
      reset()
      close()
      dispatch(updateProject({
        id: currentProject?.id!,
        body: {
          step_status: 2
        }
      }))
    }
    //eslint-disable-next-line
  }, [changePropositionLoadingStatus])

  return (
    <Container style={{ display: isOpen ? "block" : "none" }}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputWrapper">
          <p>Name</p>
          <Input {...register("name", { required: true })} style={{ width: '180px' }} placeholder='Material eingeben' type='text' />
        </div>
        <div className="inputWrapper">
          <p>Preis</p>
          <Input step={0.01} {...register("price")} style={{ width: '180px' }} placeholder='0' type='number' />
        </div>
        <div className="inputWrapper">
          <p>Anzahl</p>
          <Input step={0.1} {...register("amount", { required: true })} style={{ width: '105px' }} placeholder='0' type='number' />
        </div>
        <SubmitButton style={{ width: '105px' }} $disabled={(!isValid || Object.keys(errors).length > 0)} type="submit" value={'Hinzufügen'} disabled={!isValid || Object.keys(errors).length > 0} />
      </Form>
      <div className="errorsBlock">
        {errors[`name`] && <span style={{ color: 'red' }}>Name field is required</span>}
        {errors[`amount`] && <span style={{ color: 'red' }}>Article field is required</span>}
        {errors[`price`] && <span style={{ color: 'red' }}>Supplier field is required</span>}
        {changePropositionLoadingStatus === 'error' && <span style={{ color: 'red' }}>Etwas falsch, versuchen Sie es erneut oder später</span>}
      </div>
    </Container >
  )
}

export default CreateMaterialInProjectForm