
//libs
import { useForm, Controller } from "react-hook-form"
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//redux
import { createClient, changeClient, setErrorMessageToNull } from "reduxFolder/slices/ClientsSlice";
import { createClientFormSelector } from "reduxFolder/selectors";
//components
import ImgUpload from "components/ImgUpload/ImgUpload";
//styles
import { Container, InputBlock, Label, Input, Select, Form, SubmitButton } from "./styles"
//types
import { FormProps, AppDispatch, BackEndClientType, RootStateType } from "types/index";


const CreateClientForm: FC<FormProps> = ({ closeModal }) => {
    const editClient = useSelector(createClientFormSelector)
    const dispatch = useDispatch<AppDispatch>()
    const createClientLoadingStatus = useSelector((state: RootStateType) => state.Clients.createClientLoadingStatus)
    const errorMessage = useSelector((state: RootStateType) => state.Clients.errorMessage)
    const changeClientLoadingStatus = useSelector((state: RootStateType) => state.Clients.changeClientLoadingStatus)


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
        control
    } = useForm();
    const [wasSubmited, setWasSubmited] = useState<boolean>(false)
    // @ts-ignore
    const onSubmit = (data) => {
        const { address, clientType, email, name, phone, role, image } = data
        const newClient: BackEndClientType = {
            name,
            email,
            phone,
            address,
            type: clientType,
            role,
            id: editClient ? editClient.id : undefined,

        }
        const formData = new FormData()
        if (image) {
            formData.set('image', image)
        }

        if (editClient) {
            //@ts-ignore
            newClient.projects = editClient?.projects
            dispatch(changeClient({
                data: newClient,
                image: image && typeof image !== "string" ? formData : image
            }))
        } else {
            dispatch(createClient({
                data: newClient,
                image: image ? formData : null
            }))
        }
        setWasSubmited(true)
    }

    useEffect(() => {
        if (createClientLoadingStatus === "idle" && changeClientLoadingStatus === 'idle' && wasSubmited && !errorMessage) {
            setWasSubmited(false)
            reset()
            dispatch(setErrorMessageToNull())
            closeModal()
        }
        //eslint-disable-next-line
    }, [createClientLoadingStatus, changeClientLoadingStatus])

    useEffect(() => {
        if (editClient !== null) {
            reset({
                address: editClient?.address,
                clientType: editClient?.type,
                email: editClient?.email,
                name: editClient?.name, phone: editClient?.phone, role: editClient?.role,
                image: editClient?.image || ''
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
                        defaultValue={editClient?.image || ''}
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
                                    src={field.value instanceof Blob ? URL.createObjectURL(field.value) : (editClient?.image || '')}
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
                        <Label>Adresse<span>*</span></Label>
                        <Input {...register("address", { required: true })} className="position" placeholder='Hauptstrasse 29, Berlin, Hesse' />
                        {errors[`address`] && <span style={{ color: 'red' }}>Dieses Feld muss ausgefüllt werden</span>}
                    </InputBlock>
                    <InputBlock>
                        <Label>Rolle<span>*</span></Label>
                        <Input {...register("role", { required: true })} className="position" placeholder='Manager' />
                        {errors[`role`] && <span style={{ color: 'red' }}>Dieses Feld muss ausgefüllt werden</span>}
                    </InputBlock>
                    <InputBlock>
                        <Label>Kundentyp<span>*</span></Label>
                        <Select {...register("clientType", { required: true })} className=""  >
                            <option value="Individuals">Einzelpersonen</option>
                            <option value="Institutions">Institutionen</option>
                        </Select>
                        {errors[`clientType`] && <span style={{ color: 'red' }}>Dieses Feld muss ausgefüllt werden</span>}
                    </InputBlock>
                </div>
                <div className="btnContainer">
                    <SubmitButton className={(!isValid || Object.keys(errors).length > 0) ? "disbled" : undefined} type="submit" value={'Kunden erstellen'} disabled={!isValid || Object.keys(errors).length > 0} />
                    {createClientLoadingStatus === 'error' && <span style={{ color: 'red' }}>Etwas falsch, versuchen Sie es erneut oder später</span>}
                    {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}
                </div>
            </Form>
        </Container>
    )
}

export default CreateClientForm