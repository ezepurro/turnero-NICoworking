import { useMemo, useState } from 'react';
import DatePicker, {registerLocale} from "react-datepicker";
import es from 'date-fns/locale/es'

import '../styles/components/appointmentRequestForm.css';
import "react-datepicker/dist/react-datepicker.css";

registerLocale('es', es);

const AppointmentRequestForm = () => {

    const [startDate, setStartDate] = useState();

    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };
  
    const excludeDates = useMemo(() => {
        const dates = [];
        const enabledDates = 5;
        const currentDate = new Date();
        while (currentDate.getDay() !== enabledDates) {
            currentDate.setDate(currentDate.getDate() + 1);
        }
        for (let i = 0; i < 5; i++) {
            dates.push(new Date(currentDate)); 
            currentDate.setDate(currentDate.getDate() + 7); 
        }
        return dates;
    }, []); 

    const filterTime = useMemo(() => {
        return (time) => {
            const hour = time.getHours();
            return hour >= 9 && hour < 17;
        };
    }, []);

    return (
    <div className='container text-center'>
        <div className="row">
            <div className="col-12">
                <form action="" className='appointment-form'>
                    <input type="text" placeholder='Número de contacto' className='form-control' />
                    <select id="options" value={selectedOption} onChange={handleChange} className='form-control'>
                        <option value="" disabled>Seleccione la cantidad de zonas</option>
                        <option value="1">1 Zona</option>
                        <option value="3">3 Zonas</option>
                        <option value="5">5 Zonas</option>
                        <option value="10">Full-body</option>
                    </select>
                    <DatePicker
                        selected={ startDate }
                        placeholderText='Seleccione una fecha y hora'
                        className="form-control"
                        onChange={ (date) => setStartDate(date) }
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption="Hora"
                        onKeyDown={ (e) => { e.preventDefault() } }
                        minDate={ new Date() }
                        includeDates={ excludeDates }
                        filterTime={ filterTime } 
                        timeIntervals={ 15 }
                    />
                    <button type='submit' className='form-control'>Reservar turno</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default AppointmentRequestForm
