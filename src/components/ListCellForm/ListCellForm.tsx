
import { FC, useState, useEffect } from 'react'
import { Container } from './styles';
interface Props {
    value: string | number;
    onChange: (arg?: string | number) => void;
    disabled?: boolean;
    type?: 'text' | 'number';
    step?: number;
    placeholder?: string;
}

const ListCellForm: FC<Props> = ({ value, onChange, type, step, placeholder }) => {
    const [inputValue, setInputValue] = useState(value)

    useEffect(() => {
        setInputValue(value)
    }, [value])
    return (
        <Container>
            <input placeholder={placeholder} step={step} type={type} className='input' onChange={e => setInputValue(e.target.value)} value={inputValue} />
            <div className='submit' onClick={() => onChange(type === 'text' ? inputValue : +inputValue)}>ok</div>
        </Container>
    )
}

export default ListCellForm