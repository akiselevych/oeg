import { FC, useEffect, useState } from 'react'
import { Container } from './styles'
import dropdown from "assets/icons/dropdown.svg"



interface Props {
    values: { value: string | number | any, name: string | number }[];
    activeValue: {
        value: string | number | any, name: string | number
    }
    onChange: (arg?: any) => void;
    type?: "cell",
    bgColor?: string,
}

const CustomSelectElement: FC<Props> = ({ values, type, onChange, activeValue, bgColor }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [optionValue, setOptionValue] = useState(activeValue)

    useEffect(() => {
        setOptionValue(activeValue)
    }, [activeValue])

    useEffect(() => {
        if (optionValue.value !== activeValue.value) {
            if (typeof activeValue.value !== 'object') {
                onChange(optionValue.value)
            } else {
                onChange(optionValue)
            }
        }
        // eslint-disable-next-line 
    }, [optionValue])

    const onPickOption = (obj: { name: string | number, value: string | number }) => {
        setOptionValue(obj)
        if (type === 'cell') setIsOpen(false)
    }


    return (
        <Container $bgColor={bgColor} $type={type}>
            <div onClick={() => setIsOpen(prev => !prev)} className="header">
                <div className="optionName">
                    {optionValue.name}
                </div>
                <img style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} src={dropdown} alt="" />
            </div>
            {isOpen &&
                <div className="options">
                    {values.map(({ name, value }, i) => <div key={i} onClick={() => onPickOption({ name, value })} className='option'>
                        <input
                            type='checkbox'
                            onChange={() => onPickOption({ name, value })}
                            checked={typeof value === 'object' ? name === optionValue.name : value === optionValue.value}
                        />
                        <div className="optionName">
                            {name}
                        </div>
                    </div>)}
                </div>
            }
        </Container>
    )
}

export default CustomSelectElement