import { useState } from "react";
import DatePicker from "react-datepicker";
import { useDate } from "../../hooks/useDate";
import "../../styles/components/DaySelectorComponent.css";
const defaultStartTime = '2025-06-01T09:00:00.000Z'
const defaultEndTime = '2025-06-01T21:00:00.000Z'
const DaySelectorComponent = ({refreshData}) => {

    const [startDate, setStartDate] = useState();
    const [enabledDates, setEnabledDates] = useState([]);
    const { addDate } = useDate();

    

    const handleSubmit = async( event ) => {
        event.preventDefault();
        if (startDate) {
            const date = new Date(startDate)
            const formattedDate = date.toISOString();
            await addDate(formattedDate,defaultStartTime,defaultEndTime)
            refreshData()
        }
    }

    const highlightDates = (date) => {
        return enabledDates.some(enabledDate => 
            enabledDate.toDateString() === date.toDateString()
        ) ? "enabled-day" : "";
    };
    
    return (
        <form className="day-selector" onSubmit={ handleSubmit }> 
            <DatePicker
                selected={ startDate }
                placeholderText='Seleccione una fecha y hora'
                className="form-control date-picker"
                onChange={ (date) => setStartDate(date) }
                dateFormat="Pp"
                locale="es"
                timeCaption="Hora"
                onKeyDown={ (e) => { e.preventDefault() } }
                minDate={ new Date() }
                inline
                dayClassName={highlightDates}
                excludeDates={enabledDates}
            />
            <br />
            <button type="submit" className="btn form-button">Habilitar fecha</button>
        </form>
    )
}

export default DaySelectorComponent;