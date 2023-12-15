//libs
import { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm, Controller } from "react-hook-form"
import { v4 as uuidv4 } from 'uuid';
//components
import ImgUpload from "components/ImgUpload/ImgUpload";
//redux
import { createSupplier, changeSupplier, setErrorMessageToNull } from "reduxFolder/slices/SuppliersSlice";
import { setEditSupplier } from "reduxFolder/slices/PagesStateSlice";
import { createSupplierFormSelector } from "reduxFolder/selectors";
//types
import { FormProps, AppDispatch, RootStateType, BackEndSupplierType } from "types/index"
//styles
import { Container, InputBlock, Label, Input, Form, SubmitButton } from "./styles"
import { Select } from "./styles";

const CreateSupplierForm: FC<FormProps> = ({ closeModal }) => {
  const editSupplier = useSelector(createSupplierFormSelector)
  const dispatch = useDispatch<AppDispatch>()
  const createAndChangeSupplierLoadingStatus = useSelector((state: RootStateType) => state.Suppliers.createAndChangeSupplierLoadingStatus)
  const errorMessage = useSelector((state: RootStateType) => state.Suppliers.errorMessage)

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm();
  const [wasSubmited, setWasSubmited] = useState<boolean>(false)
  // @ts-ignore
  const onSubmit = (data) => {
    const { address, email, name, phone, role, UstId, bankDetails, company, wage, image, type } = data
    const newSupplier: BackEndSupplierType = {
      Ust_id: UstId,
      address,
      bank_details: bankDetails,
      company: company,
      email,
      hourly_wage: wage,
      name: name,
      phone,
      role,
      type,
      id: editSupplier ? editSupplier.id : uuidv4()
    }
    const formData = new FormData()

    if (image) {
      formData.set('image', image)
    }
    if (editSupplier) {
      dispatch(changeSupplier({
        data: newSupplier,
        image: image && typeof image !== "string" ? formData : image
      }))
    } else {
      dispatch(createSupplier({
        data: newSupplier,
        image: image && typeof image !== "string" ? formData : image
      }))
    }
    setWasSubmited(true)
  }

  useEffect(() => {
    if (createAndChangeSupplierLoadingStatus === "idle" && wasSubmited && !errorMessage) {
      setWasSubmited(false)
      reset()
      dispatch(setEditSupplier(null))
      dispatch(setErrorMessageToNull())
      closeModal()
    }
    //eslint-disable-next-line
  }, [createAndChangeSupplierLoadingStatus])

  useEffect(() => {
    if (editSupplier) {
      const { name, email, phone, role, wage, contactPerson, UstId,
        bankDetails, type, image,
        address } = editSupplier
      reset({
        company: name, email, phone, role, wage, name: contactPerson, UstId,
        bankDetails,
        address,
        ustId: UstId,
        type,
        image
      })
    }
    // eslint-disable-next-line
  }, [])

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputBlock>
          <Controller
            name="image"
            control={control}
            defaultValue={editSupplier?.image || ''}
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
                  src={field.value instanceof Blob ? URL.createObjectURL(field.value) : (editSupplier?.image || '')}
                />
              </>
            )}
          />
        </InputBlock>
        <div className="textInputsBlock">
          <InputBlock>
            <Label>Name<span>*</span></Label>
            <Input {...register("name", { required: true })} className="position" placeholder='Geben Sie den Namen des Lieferanten ein' />
            {errors[`name`] && <span style={{ color: 'red' }}>Dieses Feld ist erforderlich</span>}
          </InputBlock>
          <InputBlock>
            <Label>Telefon<span>*</span></Label>
            <Input {...register("phone", { required: true })} className="position" placeholder='+49 30 8888 8888' />
            {errors[`phone`] && <span style={{ color: 'red' }}>Dieses Feld ist erforderlich</span>}
          </InputBlock>
          <InputBlock>
            <Label>E-Mail<span>*</span></Label>
            <Input {...register("email", { required: true })} className="position" placeholder='janeandersen@gmail.com' type="email" />
            {errors[`email`] && <span style={{ color: 'red' }}>Dieses Feld ist erforderlich</span>}
          </InputBlock>
          <InputBlock>
            <Label>Firma<span>*</span></Label>
            <Input {...register("company", { required: true })} className="position" placeholder='Geben Sie den Firmennamen ein' />
            {errors[`company`] && <span style={{ color: 'red' }}>Dieses Feld ist erforderlich</span>}
          </InputBlock>
          <InputBlock>
            <Label>Typ<span>*</span></Label>
            <Select {...register("type", { required: true })} className="position" placeholder='Geben Sie den Firmennamen ein'>
              <option value="Materials">Materialien</option>
              <option value="Workers">Mitarbeiter</option>
            </Select>
            {errors[`type`] && <span style={{ color: 'red' }}>Dieses Feld ist erforderlich</span>}
          </InputBlock>
          <InputBlock>
            <Label>Rolle<span>*</span></Label>
            <Input {...register("role", { required: true })} className="position" placeholder='Maneger' />
            {errors[`role`] && <span style={{ color: 'red' }}>Dieses Feld ist erforderlich</span>}
          </InputBlock>
          <InputBlock>
            <Label>Stundenlohn<span>*</span></Label>
            <Input step={0.01} {...register("wage", { required: true })} type="number" className="position" placeholder='€ 0/h' />
            {errors[`wage`] && <span style={{ color: 'red' }}>Dieses Feld ist erforderlich</span>}
          </InputBlock>
          <InputBlock>
            <Label>USt-ID<span>*</span></Label>
            <Input {...register("UstId", { required: true })} className="position" placeholder='XX000000000' />
            {errors[`ustId`] && <span style={{ color: 'red' }}>Dieses Feld ist erforderlich</span>}
          </InputBlock>
          <InputBlock>
            <Label>Bankdaten<span>*</span></Label>
            <Input {...register("bankDetails", { required: true })} className="position" placeholder='XX000000000' />
            {errors[`bankDetails`] && <span style={{ color: 'red' }}>Dieses Feld ist erforderlich</span>}
          </InputBlock>
          <InputBlock>
            <Label>Adresse<span>*</span></Label>
            <Input {...register("address", { required: true })} className="position" placeholder='Hauptstrasse 29, Berlin, Hessen' />
            {errors[`address`] && <span style={{ color: 'red' }}>Dieses Feld ist erforderlich</span>}
          </InputBlock>

        </div>
        <div className="btnContainer">
          <SubmitButton className={(!isValid || Object.keys(errors).length > 0) ? "disbled" : undefined} type="submit" value={'Kunden erstellen'} disabled={!isValid || Object.keys(errors).length > 0} />
          {createAndChangeSupplierLoadingStatus === 'error' && <span style={{ color: 'red' }}>Etwas falsch, versuchen Sie es erneut oder später</span>}
          {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}
        </div>
      </Form>
    </Container>
  )
}

export default CreateSupplierForm