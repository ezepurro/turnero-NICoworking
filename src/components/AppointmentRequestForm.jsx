import { useMemo, useState } from 'react';
import { useForm } from '../hooks/useForm';
import { useAppointments } from '../hooks/useAppointments';
import { useMercadoPago } from '../hooks/useMercadoPago';
import { setHours, setMinutes } from 'date-fns';
import { getEnvVariables } from '../helpers/getEnvVariables';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import DatePicker, {registerLocale} from "react-datepicker";
import useAuthStore from '../store/useAuthStore';
import useCalendarSettingsStore from '../store/useCalendarSettingsStore';
import es from 'date-fns/locale/es';
import Swal from "sweetalert2";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import "react-datepicker/dist/react-datepicker.css";
import '../styles/components/appointmentRequestForm.css';

registerLocale('es', es);

const appointmentFormFields = {
    contact: '',
    sessionZones: '',
    date: '',
};


const AppointmentRequestForm = ({ type }) => {
    const [preferenceId, setPreferenceId] = useState(null);
    const [startDate, setStartDate] = useState();
    const [selectedOption, setSelectedOption] = useState('');
    const { contact, onInputChange } = useForm( appointmentFormFields );
    const { addAppointment } = useAppointments();
    const { user } = useAuthStore();
    const { calendarDays, reservedTimes } = useCalendarSettingsStore();
    const { createPreference } = useMercadoPago();
    const { VITE_MP_PUBLIC_KEY } = getEnvVariables();

    initMercadoPago(VITE_MP_PUBLIC_KEY, {
        locale: 'es-AR'
    });

    // const handleBuy = async () => {

    // };
    
    const getExcludedTimes = useMemo(() => {
        if (!startDate || !reservedTimes.wax) return []; 
        const selectedDate = startDate.toDateString(); 
        const excludedTimes = reservedTimes.wax
            .map(dateStr => new Date(dateStr)) 
            .filter(date => date.toDateString() === selectedDate) 
            .map(date => new Date(date.getTime())); 
        return excludedTimes;
    }, [startDate, reservedTimes.wax]);


    const handleSubmit = async ( event ) => {
        event.preventDefault();
        const sessionLength = null;
        const sessionZones = parseInt(selectedOption);
        const id = await addAppointment({ contact, sessionZones, date:startDate, userId:user.uid, type, sessionLength, status: 'pending'});

        if (!contact || !startDate || !selectedOption) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, completa todos los campos antes de continuar',
                showConfirmButton: false, 
                timer: 1500,             
            });
            return;
        }

        const zonesAmmount = ( parseInt(selectedOption) === 10 ) ? 'Full-Body' : parseInt(selectedOption);
        const price = 7000;
        const schedule = startDate;
        
        const preferenceId = await createPreference(price, schedule, zonesAmmount, id);

        if (preferenceId) {
            console.log('Created preference')
            setPreferenceId(preferenceId);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al procesar el pago. Inténtalo de nuevo',
                showConfirmButton: false, 
                timer: 1500,             
            });
        }
    
    }



    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
    <div className='container text-center'>
        <div className="row">
            <div className="col-12">
                <form className='appointment-form' onSubmit={ handleSubmit }>
                    <PhoneInput
                        country={'ar'}
                        value={contact}
                        onChange={(value) => onInputChange({ target: { name: 'contact', value } })}
                        inputProps={{
                            name: 'contact',
                            required: true,
                        }}
                        placeholder='Número de contacto'
                        enableSearch={true}
                        autoFormat={false} 
                        isValid={(value, country) => {
                            if (country.countryCode === "ar") {
                                return value.length >= 12; 
                            }
                            return true;
                        }}
                        containerClass="phone-input-container"
                        inputClass="form-control"
                        buttonClass="phone-input-flag-button"
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
                        onChange={(date) => setStartDate(date) }
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption="Hora"
                        onKeyDown={ (e) => { e.preventDefault() } }
                        minDate={ new Date() }
                        includeDates={ calendarDays.waxDays }
                        timeIntervals={ 5 }
                        name='date'
                        required
                        excludeTimes={ getExcludedTimes } 
                        withPortal
                        minTime={setHours(setMinutes(new Date(), 0), 9)}
                        maxTime={setHours(setMinutes(new Date(), 0), 20)}
                    />
                    <button type='submit' className='form-control'>Reservar turno</button>
                    {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} customization={{ texts:{ valueProp: 'smart_option'}}} />}
                </form>
            </div>
        </div>
    </div>
    )
}

export default AppointmentRequestForm;



