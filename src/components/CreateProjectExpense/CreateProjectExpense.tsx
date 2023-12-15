//libs
import { FC, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
//redux
import { createInternalExpense } from "reduxFolder/slices/InternalExpensesSlice"
//types
import { AppDispatch, RootStateType } from "types/index"
//styles
import { Container, Form, Input, SubmitButton, Select } from "./styles"
import moment from "moment"

const CreateProjectExpense: FC<{ project_id: string | number, isOpen: boolean; close: () => void }> = ({ isOpen, close, project_id }) => {
    const dispatch = useDispatch<AppDispatch>()
    const createInternalExpensesLoadingStatus = useSelector((state: RootStateType) => state.InternalExpenses.createInternalExpensesLoadingStatus)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm();
    const [wasSubmited, setWasSubmited] = useState<boolean>(false)
    // @ts-ignore
    const onSubmit = (data) => {
        const { category, date, amount, description } = data
        setWasSubmited(true)
        dispatch(createInternalExpense({ category, date: moment(date, dateFormats).format('YYYY-MM-DDTHH:mm:ss[Z]'), amount, description, project_id }))
    }

    useEffect(() => {
        if (createInternalExpensesLoadingStatus === "idle" && wasSubmited) {
            setWasSubmited(false)
            reset()
            close()
        }
        //eslint-disable-next-line
    }, [createInternalExpensesLoadingStatus])

    const dateFormats = [
        'DD.MM.YYYY',
        'DD/MM/YYYY',
        'DD-MM-YYYY'
    ];

    const isValidDateFormat = (value: string) => {
        return moment(value, dateFormats).isValid();
    };


    return (
        <Container style={{ display: isOpen ? "block" : "none" }}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="inputWrapper">
                    <p>Beschreibung</p>
                    <Input {...register("description", { required: true })} style={{ width: '180px' }} placeholder='Beschreibung hinzufügen' type='text' />
                </div>
                <div className="inputWrapper">
                    <p>Kategorie</p>
                    <Select {...register("category")} style={{ width: '180px' }} placeholder='Type category'>
                        <option value="material">Material</option>
                        <option value="equipment">Equipment</option>
                        <option value="transport">Transport</option>
                        <option value="other">Other</option>
                    </Select>
                </div>
                <div className="inputWrapper">
                    <p>Betrag</p>
                    <Input step={0.01} {...register("amount", { required: true })} style={{ width: '105px' }} placeholder='0' type='number' />
                </div>
                <div className="inputWrapper">
                    <p>Datum</p>
                    <Input {...register("date", { required: true, validate: isValidDateFormat })} style={{ width: '130px' }} placeholder='DD.MM.YYYY' type='text' />
                </div>
                {errors.date && <span>Invalid date format (DD-MM-YYYY)</span>}
                <SubmitButton style={{ width: '105px' }} $disabled={(!isValid || Object.keys(errors).length > 0)} type="submit" value={'Add'} disabled={!isValid || Object.keys(errors).length > 0 || createInternalExpensesLoadingStatus === 'loading'} />
            </Form>
            <div className="errorsBlock">
                {errors[`name`] && <span style={{ color: 'red' }}>Name field is required</span>}
                {errors[`amount`] && <span style={{ color: 'red' }}>Article field is required</span>}
                {errors[`price`] && <span style={{ color: 'red' }}>Supplier field is required</span>}
                {createInternalExpensesLoadingStatus === 'error' && <span style={{ color: 'red' }}>Etwas falsch, versuchen Sie es erneut oder später</span>}
            </div>
        </Container >
    )
}

export default CreateProjectExpense