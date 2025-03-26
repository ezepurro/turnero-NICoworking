import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useCalendarSettings } from "../../hooks/useCalendarSettings";
import useCalendarSettingsStore from "../../store/useCalendarSettingsStore";
import "../../styles/components/daySelectorComponent.css";

const DaySelectorComponent = () => {

    const [startDate, setStartDate] = useState();
    const [enabledDates, setEnabledDates] = useState([]);
    const { addWaxDate } = useCalendarSettings();
    const { calendarDays, setCalendarDays } = useCalendarSettingsStore();

    useEffect(() => {
      const formattedDates = calendarDays.waxDays.map(date => new Date(date));
      setEnabledDates(formattedDates);
    }, [calendarDays.waxDays]);
    

    const handleSubmit = ( event ) => {
        event.preventDefault();
        if (startDate) {
            const waxDate = new Date(startDate); 
            addWaxDate({ waxDate: [waxDate.toISOString()] }); 
            setCalendarDays({
                'waxDays': [...calendarDays.waxDays, waxDate],
            });
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