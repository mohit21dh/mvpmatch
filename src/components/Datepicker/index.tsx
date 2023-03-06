import { FC, forwardRef, LegacyRef, ReactNode, useEffect, useState } from "react";
import ReactDatePicker from 'react-datepicker'; 
import { FaCalendar } from 'react-icons/fa'
import "react-datepicker/dist/react-datepicker.css";
import './index.css';

export const DatePicker: FC<{
    placeholder: ReactNode,
    handleDateChange: (val: Date | null) => void,
    dateValue: Date | null,
    minDate?: Date | null,
    maxDate?: Date | null
}> = ({
    placeholder,
    handleDateChange,
    dateValue,
    minDate,
    maxDate
}) => {
        const [date, setDate] = useState<Date | null>(null);
        const ExampleCustomInput = forwardRef(({ value, onClick }: any, ref) => (
          <button className="w-32 text-white flex items-center h-10 rounded-md px-4 pr-2 bg-[#1BC5BD]" onClick={onClick} ref={ref as LegacyRef<HTMLButtonElement>}>
            <span>{value || placeholder}</span>
            <FaCalendar className="ml-auto" />
          </button>
        ));

        useEffect(() => {
            setDate(dateValue)
        }, [dateValue])

        useEffect(() => {
            handleDateChange(date);
        }, [date])

        return (
          <ReactDatePicker
            minDate={minDate}
            maxDate={maxDate}
            selected={date}
            dateFormat="yyyy-MM-dd"
            onChange={(date) => setDate(date)}
            customInput={<ExampleCustomInput />}
          />
        );
}