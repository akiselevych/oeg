//libs
import { FC, useEffect } from "react";
import { FieldErrors, UseFormGetValues, UseFormRegister, UseFormWatch } from "react-hook-form";
//styles
import { NextButton, Option, Select } from "components/CreateInvoiceForm/styles";
//types
import { AppDispatch, InvoiceFormInputs, RootStateType } from "types/index";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients } from "reduxFolder/slices/ClientsSlice";
import { changeAdditionalProposition, changeProposition } from "reduxFolder/slices/ProjectPropositionSlice";



interface SecondStepProps {
    activeIndex: number,
    errors: FieldErrors<InvoiceFormInputs>,
    register: UseFormRegister<InvoiceFormInputs>,
    watch: UseFormWatch<InvoiceFormInputs>,
    handleNextButton: () => void,
    insideProject: boolean,
    getValues: UseFormGetValues<InvoiceFormInputs>,
    isAdditional?: boolean,
}

const SecondStep: FC<SecondStepProps> = ({ activeIndex, errors, register, watch, handleNextButton, insideProject, getValues, isAdditional }) => {
    const dispatch = useDispatch<AppDispatch>();
    const clients = useSelector((state: RootStateType) => state.Clients.clients);
    const proposition = useSelector((state: RootStateType) => state.ProjectProposition.proposition);
    const additionalProposition = useSelector((state: RootStateType) => state.ProjectProposition.additionalProposition);
    useEffect(() => {
        dispatch(fetchClients());
        // eslint-disable-next-line
    }, [])

    return (
        <div className={`selectWrapper ${activeIndex === 1 && "active"}`}>
            <p>Kundenname</p>
            <Select id="customer"
                {...register("customer", {
                    required: true
                })}
            >
                <Option value="">Kundenname</Option>
                {clients.map(({ id, name }) => <Option value={id} key={id}>{name}</Option>)}
            </Select>
            <NextButton
                onClick={() => {
                    handleNextButton();
                    if (!insideProject && proposition && !isAdditional) {
                        dispatch(changeProposition({
                            id: proposition.id,
                            client_id: getValues(`customer`),
                        }))
                    } else if (isAdditional && !insideProject && additionalProposition) {
                        dispatch(changeAdditionalProposition({
                            id: additionalProposition.id,
                            client_id: getValues(`customer`),
                        }))
                    }
                }}
                disabled={!(watch("customer") !== "")}
                type="button"
            >
                Weiter
            </NextButton>
        </div>
    )
}

export default SecondStep;