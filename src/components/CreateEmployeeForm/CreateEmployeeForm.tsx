//libs
import { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm, Controller } from "react-hook-form"
import { v4 as uuidv4 } from 'uuid';
//components
import ImgUpload from "components/ImgUpload/ImgUpload";
import ChangePasswordForm from "components/ChangePasswordForm/ChangePasswordForm";
//redux
import { createEmployee, changeEmployee, setErrorMessageToNull } from "reduxFolder/slices/EmployeesSlice";
import { setEditEmployee } from "reduxFolder/slices/PagesStateSlice";
//types
import { FormProps, AppDispatch, RootStateType, BackEndEmployeeType } from "types/index"
//styles
import { Container, InputBlock, Label, Input, Form, SubmitButton, Select } from "./styles"



const CreateEmployeeForm: FC<FormProps> = ({ closeModal }) => {
  const editEmployee = useSelector((state: RootStateType) => state.PagesStateSlice.editEmployee)
  const dispatch = useDispatch<AppDispatch>()
  const createAndCgangeEmployeeLoadingStatus = useSelector((state: RootStateType) => state.Employees.createAndCgangeEmployeeLoadingStatus)
  const errorMessage = useSelector((state: RootStateType) => state.Employees.errorMessage);
  const [isPasswordForm, setIsPasswordForm] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm();
  const [wasSubmited, setWasSubmited] = useState<boolean>(false)


  // @ts-ignore
  const onSubmit = async (data) => {
    const { email, name, phone, role, wage, jobType, photo } = data
    const newEmployee: BackEndEmployeeType = {
      name,
      email,
      phone,
      role,
      hourly_wage: wage,
      job_type: jobType,
      id: editEmployee ? editEmployee.id : uuidv4()
    }
    const formData = new FormData()

    if (photo && typeof photo !== "string") {
      formData.set('image', photo)
    }
    if (editEmployee) {
      dispatch(changeEmployee({
        data: newEmployee,
        image: photo && typeof photo !== "string" ? formData : photo
      }))
    } else {
      newEmployee.password = data.password
      dispatch(createEmployee({
        data: newEmployee,
        image: photo && typeof photo !== "string" ? formData : photo
      }))
    }
    setWasSubmited(true)
  }

  useEffect(() => {
    if (editEmployee !== null) {
      reset({
        name: editEmployee?.name,
        phone: editEmployee?.phone,
        email: editEmployee?.email,
        role: editEmployee?.role,
        jobType: editEmployee?.jobType,
        wage: editEmployee?.wage,
        photo: editEmployee?.image || ''
      })
    }
    // eslint-disable-next-line
  }, [])


  useEffect(() => {
    if (createAndCgangeEmployeeLoadingStatus === "idle" && wasSubmited && !errorMessage) {
      setWasSubmited(false)
      reset()
      dispatch(setErrorMessageToNull())
      closeModal()
      dispatch(setEditEmployee(null))
    }
    //eslint-disable-next-line
  }, [createAndCgangeEmployeeLoadingStatus])

  return (
    <Container id="EmployeeFormContainer">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputBlock>
          <Controller
            name="photo"
            control={control}
            defaultValue={editEmployee?.image || ''}
            render={({ field }) => (
              <>
                <ImgUpload
                  size={100}
                  onChange={(e) => {
                    const file = e.target.files && e.target.files[0];
                    if (file) {
                      field.onChange(file);
                    }
                  }}
                  src={field.value instanceof Blob ? URL.createObjectURL(field.value) : (editEmployee?.image || '')}
                />
              </>
            )}
          />
        </InputBlock>
        <div className="textInputsBlock">
          <InputBlock>
            <Label>Name<span>*</span></Label>
            <Input {...register("name", { required: true })} className="position" placeholder='Jane Andersen' />
            {errors[`name`] && <span style={{ color: 'red' }}>Dieses Feld muss ausgefüllt werden</span>}
          </InputBlock>
          <InputBlock>
            <Label>Telefon<span>*</span></Label>
            <Input {...register("phone", { required: true })} className="position" placeholder='+49 30 8888 8888' />
            {errors[`phone`] && <span style={{ color: 'red' }}>Dieses Feld muss ausgefüllt werden</span>}
          </InputBlock>
          <InputBlock>
            <Label>Email<span>*</span></Label>
            <Input {...register("email", { required: true })} className="position" placeholder='janeandersen@gmail.com' type="email" />
            {errors[`email`] && <span style={{ color: 'red' }}>Dieses Feld muss ausgefüllt werden</span>}
          </InputBlock>
          <InputBlock>
            <Label>Rolle<span>*</span></Label>
            <Input {...register("role", { required: true })} className="position" placeholder='Manager' />
            {errors[`role`] && <span style={{ color: 'red' }}>Dieses Feld muss ausgefüllt werden</span>}
          </InputBlock>
          <InputBlock>
            <Label>Jobtyp<span>*</span></Label>
            <Select {...register("jobType", { required: true })} className=""  >
              <option value="hauptberuflich">Hauptberuflich</option>
              <option value="ehrenamtlich">Ehrenamtlich</option>
            </Select>
            {errors[`jobType`] && <span style={{ color: 'red' }}>Dieses Feld muss ausgefüllt werden</span>}
          </InputBlock>
          <InputBlock>
            <Label>Stundenlohn<span>*</span></Label>
            <Input step={0.01} type="number" {...register("wage", { required: true })} className="position" placeholder='€ 0/h' />
            {errors[`wage`] && <span style={{ color: 'red' }}>Dieses Feld muss ausgefüllt werden</span>}
          </InputBlock>
          {!editEmployee &&
            <InputBlock>
              <Label>Passwort<span>*</span></Label>
              <Input step={0.01} type="text" {...register("password", { required: true })} className="position" />
              {errors[`password`] && <span style={{ color: 'red' }}>Dieses Feld muss ausgefüllt werden</span>}
            </InputBlock>}

        </div>
        <div className="btnContainer">
          <SubmitButton className={(!isValid || Object.keys(errors).length > 0) ? "disbled" : undefined} type="submit" value={editEmployee ? "Bearbeiten" : 'Bearbeiten'} disabled={!isValid || Object.keys(errors).length > 0} />
          {createAndCgangeEmployeeLoadingStatus === 'error' && <span style={{ color: 'red' }}>Etwas falsch, versuchen Sie es erneut oder später</span>}
          {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}
        </div>
      </Form>
      {editEmployee &&
        <div onClick={() => setIsPasswordForm(prev => !prev)} className="changePasswordBtn">
          {isPasswordForm ? "Schließen" : " Passwort ändern"}
        </div>
      }
      {
        isPasswordForm && editEmployee &&
        <ChangePasswordForm id={editEmployee?.id} closeModal={() => setIsPasswordForm(false)} />
      }
    </Container>
  )
}

export default CreateEmployeeForm