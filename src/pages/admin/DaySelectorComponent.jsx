import { useEffect, useState } from "react";
import DatePicker from "react-datepicker"
import { useCalendarSettings } from "../../hooks/useCalendarSettings";
import "../../styles/components/DaySelectorComponent.css"

const DaySelectorComponent = () => {

    const [startDate, setStartDate] = useState();
    const [enabledDates, setEnabledDates] = useState([]);
    const { addWaxDate, getCalendarSettings } = useCalendarSettings();

    useEffect(() => {
        const fetchCalendarSettings = async () => {
            try {
                const data = await getCalendarSettings();
                const formattedDates = data.calendarSettings.waxDays.map(dateStr => new Date(dateStr));
                setEnabledDates(formattedDates);
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchCalendarSettings();
    }, []);
    
    

    const handleSubmit = ( event ) => {
        event.preventDefault();
        const waxDate = [startDate];
        addWaxDate({waxDate});
    }

    const highlightDates = (date) => {
        return enabledDates.some(enabledDate => 
            enabledDate.toDateString() === date.toDateString()
        ) ? "enabled-day" : "";
    };
    
    return (
        <form className="text-center day-selector" onSubmit={ handleSubmit }> 
            <div className="form-container">
                <br /><br />
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
                <button type="submit" className="form-control form-button">Habilitar dia</button>
                <br /><br />
            </div>
        </form>
    )
}

export default DaySelectorComponent
