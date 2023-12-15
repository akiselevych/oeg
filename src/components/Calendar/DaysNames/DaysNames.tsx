//libs
import { FC } from "react"
//styles
import {DayName, DaysNamesWrapper} from "components/Calendar/DaysNames/styles";


interface DaysNamesProps {
  daysNamesData?: string[];
}

const DaysNames: FC<DaysNamesProps> = ({daysNamesData = ["Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa.", "So."]}) => {
  const DaysNames = daysNamesData.map((d, i) => (
    <DayName key={i}>
      {d}
    </DayName>
  ))

  return <DaysNamesWrapper>{DaysNames}</DaysNamesWrapper>
}

export default DaysNames

