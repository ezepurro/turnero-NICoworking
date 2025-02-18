import { useMemo, useState } from 'react';
import DatePicker, {registerLocale} from "react-datepicker";
import es from 'date-fns/locale/es'
import { useForm } from '../hooks/useForm';
import { useAppointments } from '../hooks/useAppointments';
import useAuthStore from '../store/useAuthStore';
import useCalendarSettingsStore from '../store/useCalendarSettingsStore';
import "react-datepicker/dist/react-datepicker.css";
import '../styles/components/appointmentRequestForm.css';
import { setHours, setMinutes } from 'date-fns';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
registerLocale('es', es);


const appointmentFormFields = {
    contact: '',
    sessionZones: '',
    date: '',
};


const AppointmentRequestForm = ({ type }) => {
    initMercadoPago('APP_USR-6f82d2ec-8f10-48b9-982e-0056c17b4917',{
        locale: 'es-AR'
    });
    const createPreference = async (price,schedule,duration,zonesAmmount) => {
        const appointmentPreference = {
            price : price,
            schedule : schedule,
            duration : duration,
            zonesAmmount : zonesAmmount
        }
        try {
            const response = await fetch('http://localhost:4000/api/mercadopago/create_preference', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body : JSON.stringify(appointmentPreference)
            })
            if (!response.ok) {
                throw new Error(`Error HTTP : ${response.status}`)
            }
            const data = await response.json()
            return data.id
        }
        catch(err){
            console.log(err);
            alert(err.message)
        }
    }
    const handleBuy = async () => {
        if (!contact || !startDate || !selectedOption) {
            alert('Por favor, completa todos los campos antes de continuar.');
            return;
        }
        const pricePerZone = 1000; 
        const durationPerZone = 5; 
        const zonesAmmount = parseInt(selectedOption); 
        const price = zonesAmmount * pricePerZone;
        const duration = zonesAmmount * durationPerZone;
        const schedule = startDate;
    
        console.log('Enviando a MercadoPago:', { price, schedule, duration, zonesAmmount });
    
        const id = await createPreference(price, schedule, duration, zonesAmmount);
        if (id) {
            setPreferenceId(id);
        } else {
            alert('Error al procesar el pago. Inténtalo de nuevo.');
        }
    };
    


    const [preferenceId,setPreferenceId] = useState(null)
  
    const [startDate, setStartDate] = useState();
    const [selectedOption, setSelectedOption] = useState('');
    const { contact, onInputChange } = useForm( appointmentFormFields );
    const { addAppointment } = useAppointments();
    const { user } = useAuthStore();
    const { calendarDays, reservedTimes } = useCalendarSettingsStore();
    
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    
    const getExcludedTimes = useMemo(() => {
        if (!startDate || !reservedTimes.wax) return []; 
        const selectedDate = startDate.toDateString(); 
        const excludedTimes = reservedTimes.wax
            .map(dateStr => new Date(dateStr)) 
            .filter(date => date.toDateString() === selectedDate) 
            .map(date => new Date(date.getTime())); 
        return excludedTimes;
    }, [startDate, reservedTimes.wax]);


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
                        includeDates={ calendarDays.waxDays }
                        timeIntervals={ 15 }
                        name='date'
                        required
                        excludeTimes={ getExcludedTimes } 
                        withPortal
                        minTime={setHours(setMinutes(new Date(), 0), 9)}
                        maxTime={setHours(setMinutes(new Date(), 0), 20)}
                    />
                    <button onClick={handleBuy} type='button' className='form-control'>Reservar turno</button>
                    {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} customization={{ texts:{ valueProp: 'smart_option'}}} />}
                </form>
            </div>
        </div>
    </div>
    )
}

export default AppointmentRequestForm
