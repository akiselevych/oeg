import { FC, useState, useEffect, } from "react"
import { Container } from "./styles";

interface Props {
    value: string | number;
    onChange: (arg?: string | number) => any
    placeholder: string
    className?: string
    type: string,
    disabled?: boolean,
    step?: number
}
const InputWithSubmit: FC<Props> = ({ value, onChange, className, placeholder, type, disabled, step }) => {
    const [inputValue, setInputValue] = useState(value)

    useEffect(() => {
        setInputValue(value)
    }, [value])


    return (
        <Container>
            <input step={step} disabled={disabled} type={type} onChange={e => setInputValue(e.target.value)} className={className} placeholder={placeholder} value={inputValue} />
            <div style={disabled ? { display: "none" } : {}} onClick={() => onChange(inputValue)} className="submit">Ok</div>
        </Container>
    )
}

export default InputWithSubmit