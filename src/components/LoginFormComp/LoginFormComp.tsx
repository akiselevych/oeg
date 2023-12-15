//libs
import { FC, useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
//styles
import {
    FieldsWrapper,
    Input,
    InputWrapper,
    LoginForm,
    LoginFormWrapper,
    SubmitButton,
} from "components/LoginFormComp/styles"
//components
import { ReactComponent as PassIcon } from "../../assets/icons/passIcon.svg"
//types
import { AppDispatch, LoginFormInputs, RootStateType } from "types/index"
//redux
import { getAuthUser, loginUser } from "reduxFolder/slices/Login.slice"

const LoginFormComp: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const user = useSelector((state: RootStateType) => state.Login.user)
    const isLoading = useSelector((state: RootStateType) => state.Login.isLoginLoading)

    const [isHidePass, setIsHidePass] = useState<boolean>(true)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>()

    useEffect(() => {
        const accessToken = localStorage.getItem("access")
        if (accessToken) {
            dispatch(getAuthUser())
        }
        // eslint-disable-next-line
    }, [isLoading])

    useEffect(() => {
        if (user) navigate("/")
        // eslint-disable-next-line
    }, [user])

    const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
        dispatch(loginUser(data))
    }

    if (isLoading) return <h1>Laden...</h1>

    const handleShowPass = () => {
        setIsHidePass((prevState) => !prevState)
    }

    return (
        <LoginFormWrapper>
            <LoginForm onSubmit={handleSubmit(onSubmit)}>
                <div className="form-header">
                    <h3 className="form-title">Einloggen</h3>
                    <p className="form-desc">Bitte geben Sie Ihre E-Mail und Ihr Passwort ein</p>
                </div>

                <FieldsWrapper>
                    <InputWrapper>
                        <label>Email</label>
                        <Input
                            type="text"
                            placeholder="example@gmail.com"
                            className={errors.email && "error"}
                            {...register(`email`, {
                                required: true,
                            })}
                        />
                    </InputWrapper>

                    <InputWrapper>
                        <label>Passwort</label>
                        <Input
                            type={isHidePass ? "password" : "text"}
                            placeholder="Mindestens 8 Zeichen"
                            className={errors.password && "error"}
                            {...register(`password`, {
                                required: true,
                            })}
                        />
                        <PassIcon className="passIcon" onClick={handleShowPass} />
                    </InputWrapper>
                </FieldsWrapper>
                <SubmitButton type={"submit"}>Einloggen</SubmitButton>
            </LoginForm>
        </LoginFormWrapper>
    )
}

export default LoginFormComp
