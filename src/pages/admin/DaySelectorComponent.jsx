import { useState } from "react";
import DatePicker from "react-datepicker"
import "../../styles/components/DaySelectorComponent.css"

const DaySelectorComponent = () => {

    const [startDate, setStartDate] = useState();
    
    return (
        <form className="form-control text-center day-selector"> 
            <div className="form-container">
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
                <button type="submit" className="form-control">Habilitar dia</button>
            </div>
        </form>
    )
}

export default DaySelectorComponent
