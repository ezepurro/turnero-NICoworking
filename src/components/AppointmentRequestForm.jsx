import { useMemo, useState } from 'react';
import DatePicker, {registerLocale} from "react-datepicker";
import es from 'date-fns/locale/es'

import '../styles/components/appointmentRequestForm.css';
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from '../hooks/useForm';
import { useAppointments } from '../hooks/useAppointments';
import useAuthStore from '../store/useAuthStore';

registerLocale('es', es);

const appointmentFormFields = {
    contact: '',
    sessionZones: '',
    date: '',
};

const AppointmentRequestForm = ({ type }) => {

    const [startDate, setStartDate] = useState();
    const [selectedOption, setSelectedOption] = useState('');
    const { contact, date, onInputChange } = useForm( appointmentFormFields );
    const { addAppointment } = useAppointments();
    const { user } = useAuthStore();

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

    const handleSubmit = ( event ) => {
        event.preventDefault();
        const sessionLength = null;
        const sessionZones = parseInt(selectedOption);
        addAppointment({ contact, sessionZones, date:startDate, userId:user.uid, type, sessionLength });
    }

    return (
    <div className='container text-center'>
        <div className="row">
            <div className="col-12">
                <form className='appointment-form' onSubmit={ handleSubmit }>
                    <input
                        type="text"
                        placeholder='Número de contacto'
                        className='form-control'
                        name='contact'
                        value={ contact }
                        onChange={ onInputChange }
                        required
                    />
                    <select
                        id="options"
                        value={selectedOption}
                        onChange={handleChange}
                        className='form-control'
                        name='sessionZones'
                        required
                    >
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
                        name='date'
                        required
                    />
                    <button type='submit' className='form-control'>Reservar turno</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default AppointmentRequestForm
