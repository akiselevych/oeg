//libs
import { FC } from "react"
//types
import { TableSwitcherProps } from "types/index"
//styles
import { Container } from "./styles"

const TableSwitcher: FC<TableSwitcherProps> = ({ activeBGColor, values, onChange, currentValue, activeColor }) => {


    const onClick = (arg: string) => {
        onChange(arg)
    }

    return (
        <Container $activeBGColor={activeBGColor} $activeColor={activeColor}>
            {values.map(({ value, name }, i) => <p key={i} onClick={() => onClick(value)} className={`item ${value === currentValue ? 'active' : ''}`}>{name}</p>)}
        </Container>
    )
}

export default TableSwitcher