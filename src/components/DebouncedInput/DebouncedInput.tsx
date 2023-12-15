import { FC, useState, useEffect, useRef } from "react"
import { useDebounce } from "hooks/useDebounce"

interface Props {
    value: string | number;
    onChange: (arg?: string | number) => any
    placeholder: string
    className?: string
    type: string,
    disabled?: boolean,
    step?: number
}
const DebouncedInput: FC<Props> = ({ value, onChange, className, placeholder, type, disabled, step }) => {
    const [inputValue, setInputValue] = useState(value)
    const debouncedValue = useDebounce(inputValue, 300)
    const ref = useRef(0)

    useEffect(() => {
        if (ref.current !== 0) onChange(debouncedValue)
        // eslint-disable-next-line
    }, [debouncedValue])

    useEffect(() => {
        ref.current = 1
    })

    return (
        <input step={step} disabled={disabled} type={type} onChange={e => setInputValue(e.target.value)} className={className} placeholder={placeholder} value={inputValue} />
    )
}

export default DebouncedInput