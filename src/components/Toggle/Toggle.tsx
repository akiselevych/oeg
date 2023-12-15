import { FC } from "react"
import { ToggleButton, ToggleItem, ToggleWrapper } from "./styles"

type PropsType = {
  currentValue: boolean
  values: {
    valueTrue: string
    valueFalse: string
  }
  setDisplayValue: React.Dispatch<React.SetStateAction<boolean>>
}

const Toggle: FC<PropsType> = ({ currentValue, values, setDisplayValue }) => {
  return (
    <ToggleWrapper>
      <ToggleItem>
        <ToggleButton
          className={currentValue ? "active" : ""}
          onClick={() => setDisplayValue(true)}
        >
          {values.valueTrue}
        </ToggleButton>
        <ToggleButton
          className={!currentValue ? "active" : ""}
          onClick={() => setDisplayValue(false)}
        >
          {values.valueFalse}
        </ToggleButton>
      </ToggleItem>
    </ToggleWrapper>
  )
}

export default Toggle
