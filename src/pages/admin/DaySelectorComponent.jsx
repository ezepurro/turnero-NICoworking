import { useState } from "react";
import DatePicker from "react-datepicker"
import { useCalendarSettings } from "../../hooks/useCalendarSettings";
import "../../styles/components/DaySelectorComponent.css"

const DaySelectorComponent = () => {

    const [startDate, setStartDate] = useState();
    const { addWaxDate } = useCalendarSettings();

    const handleSubmit = ( event ) => {
        event.preventDefault();
        const waxDate = [startDate];
        addWaxDate({waxDate});
    }
    
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
                />
                <br />
                <button type="submit" className="form-control form-button">Habilitar dia</button>
                <br /><br />
            </div>
        </form>
    )
}

export default DaySelectorComponent
