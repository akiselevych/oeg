//libs
import { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
//redux
import { changePassword } from "reduxFolder/slices/EmployeesSlice";
//types
import { AppDispatch, RootStateType, FormProps } from "types/index"
//styles
import { InputBlock, Label, Input, Form, SubmitButton } from "./styles"

type PasswodInputs = {
  oldPassword: string
  newPassword: string
  repeatNewPassword: string
}

interface Props extends FormProps {
  id: string | number
}
const ChangePasswordForm: FC<Props> = ({ closeModal, id }) => {
  const changePasswordLoadingStatus = useSelector((state: RootStateType) => state.Employees.changePasswordLoadingStatus)
  const changePasswordMessage = useSelector((state: RootStateType) => state.Employees.changePasswordMessage)
  const dispatch = useDispatch<AppDispatch>()
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<PasswodInputs>();

  const [wasSubmited, setWasSubmited] = useState<boolean>(false)

  const onSubmit = (data: PasswodInputs) => {
    const { newPassword, oldPassword, repeatNewPassword } = data
    if (newPassword === repeatNewPassword) {
      dispatch(changePassword({
        data: {
          new_password: newPassword, old_password: oldPassword, id
        }
      }))
        .then(() => setWasSubmited(true))
    }
  }

  const validateRepeatNewPassword = (value: string) => {
    // Check if repeatNewPassword matches newPassword
    return value === watch('newPassword') || 'Neue Passwörter stimmen nicht überein';
  };

  useEffect(() => {
    if (changePasswordLoadingStatus === "idle" && wasSubmited) {
      setWasSubmited(false)
      reset()
      closeModal()
    }
    //eslint-disable-next-line
  }, [changePasswordLoadingStatus, wasSubmited])


  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputBlock>
        <Label>Altes Passwort<span>*</span></Label>
        <Input {...register("oldPassword", { required: true })} className="position" />
        {errors["oldPassword"] && <span style={{ color: 'red' }}>Dieses Feld muss ausgefüllt werden</span>}
      </InputBlock>
      <InputBlock>
        <Label>Neues Passwort<span>*</span></Label>
        <Input {...register("newPassword", { required: true })} className="position" />
        {errors[`newPassword`] && <span style={{ color: 'red' }}>Dieses Feld muss ausgefüllt werden</span>}
      </InputBlock>
      <InputBlock>
        <Label>Wiederholen Sie das neue Passwort<span>*</span></Label>
        <Input
          disabled={!!!watch('newPassword')?.length}
          {...register('repeatNewPassword', {
            required: true,
            validate: validateRepeatNewPassword,
          })}
          className="position" />
        {errors[`repeatNewPassword`] && <span style={{ color: 'red' }}>Dieses Feld muss ausgefüllt werden</span>}
      </InputBlock>
      {!!watch('newPassword')?.length && !!watch('repeatNewPassword')?.length &&
        watch('newPassword') !== watch('repeatNewPassword') &&
        <p style={{ color: "red" }}>Neue Passwörter stimmen nicht überein</p>}
      {!!changePasswordMessage ? <p style={{ color: "red" }}>{changePasswordMessage}</p> : ''}
      <div className="btnContainer">
        <SubmitButton
          className={(!isValid || Object.keys(errors).length > 0 || changePasswordLoadingStatus === 'loading') ? "disbled" : undefined}
          type="submit"
          value={changePasswordLoadingStatus === 'loading' ? "Laden..." : "Ok"}
          disabled={!isValid || Object.keys(errors).length > 0 || changePasswordLoadingStatus === 'loading'} />
      </div>
    </Form>
  )
}

export default ChangePasswordForm