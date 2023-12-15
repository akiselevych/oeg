import { Container } from "./styles"
import { FC, useState } from "react"
import dropdown from "assets/icons/dropdown.svg"


interface Props {
    title: string,
    options: { name: string, value: string, checked: boolean }[],
    onChange: (arg: { id: string | number, checked: boolean }) => void
}

const EnployeeCheckbox: FC<Props> = ({ title, options, onChange }) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <Container>
            <div onClick={() => setIsOpen(prev => !prev)} className="header">
                <div className="optionName">
                    {title}
                </div>
                <img style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} src={dropdown} alt="" />
            </div>
            {isOpen &&
                <div className="options">
                    {options.map(({ name, value, checked }) => <div key={value} className='option'>
                        <input type='checkbox' onChange={() => onChange({ id: value, checked: !checked })} checked={checked} />
                        <div className="optionName">
                            {name}
                        </div>
                    </div>)}
                </div>
            }
        </Container>
    )
}

export default EnployeeCheckbox