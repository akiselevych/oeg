//libs
import { FC, forwardRef } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { Control, Controller, UseFormGetValues, UseFormWatch } from "react-hook-form";
//styles
import 'react-datepicker/dist/react-datepicker.css'
import { Container } from "components/DatePickerComp/styles";
//types
import { EventFormInputs } from "types/index";

interface DatePickerProps {
    control: Control<EventFormInputs>,
    watch: UseFormWatch<EventFormInputs>
}
const DatePickerComp: FC<DatePickerProps> = ({ control, watch }) => {

    const StartDayInput = forwardRef<HTMLButtonElement, { value?: string; onClick?: () => void; }>(({ value, onClick }, ref) => (
        <button type="button" className="react-datepicker__input" onClick={onClick} ref={ref}>
            {value ? value : "Starttag"}
        </button>
    ));

    const EndDayInput = forwardRef<HTMLButtonElement, { value?: string; onClick?: () => void; }>(({ value, onClick }, ref) => (
        <button type="button" className="react-datepicker__input" onClick={onClick} ref={ref}>
            {value ? value : "Endtag"}
        </button>
    ));

    return (
        <>
            <Container>
                <Controller
                    name="startDate"
                    rules={{ required: true }}
                    control={control}
                    defaultValue={undefined}
                    render={({ field: { onChange, value } }) => (
                        <DatePicker
                            selected={value ? new Date(value) : null}
                            onChange={(date) => {
                                if (date != null)
                                    onChange(moment(date).format("YYYY-MM-DD"))
                            }}
                            customInput={<StartDayInput />}
                            dateFormat="MMMM d"
                            todayButton="Today"
                            maxDate={new Date(watch(`endDate`))}
                        />
                    )}
                />
                <span>|</span>
                <Controller
                    name="endDate"
                    rules={{ required: true }}
                    control={control}
                    defaultValue={undefined}
                    render={({ field: { onChange, value } }) => (
                        <DatePicker
                            selected={value ? new Date(value) : null}
                            onChange={(date) => {
                                if (date != null)
                                    onChange(moment(date).format("YYYY-MM-DD"))
                            }}
                            customInput={<EndDayInput />}
                            minDate={new Date(watch(`startDate`))}
                            dateFormat="MMMM d"
                            todayButton="Today"
                        />
                    )}
                />
            </Container>
        </>
    );

}

export default DatePickerComp;