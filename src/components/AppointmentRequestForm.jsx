import { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
import { useForm } from '../hooks/useForm';
import { useAppointments } from '../hooks/useAppointments';
import useAuthStore from '../store/useAuthStore';
import useCalendarSettingsStore from '../store/useCalendarSettingsStore';
import "react-datepicker/dist/react-datepicker.css";
import '../styles/components/appointmentRequestForm.css';
import { setHours, setMinutes, addMinutes } from 'date-fns';

registerLocale('es', es);

const appointmentFormFields = {
    contact: '',
    sessionZones: '',
    date: '',
};

const AppointmentRequestForm = ({ type }) => {
    const [startDate, setStartDate] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [availableTimes, setAvailableTimes] = useState([]);

    const { contact, onInputChange } = useForm(appointmentFormFields);
    const { addAppointment } = useAppointments();
    const { user } = useAuthStore();
    const { calendarDays } = useCalendarSettingsStore();

    // Obtener huecos disponibles cuando cambia la cantidad de zonas
    useEffect(() => {
        if (!selectedOption) return;

        const fetchAvailableTimes = async () => {
            try {
                const response = await fetch(`/api/disponibilidad?fecha=${new Date().toISOString().split('T')[0]}&duracion=${selectedOption * 5}`);
                const data = await response.json();

                // Convertir los horarios disponibles a objetos Date
                const horariosDisponibles = data.huecos.map(time => {
                    const [hours, minutes] = time.horaInicio.split(":").map(Number);
                    return setHours(setMinutes(new Date(), minutes), hours);
                });

                setAvailableTimes(horariosDisponibles);
            } catch (error) {
                console.error("Error obteniendo disponibilidad:", error);
            }
        };

        fetchAvailableTimes();
    }, [selectedOption]);

    // Manejo de selección de zonas
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        setStartDate(null);
    };

    // Función para calcular horaFin
    const calcularHoraFin = (horaInicio, duracion) => {
        return addMinutes(horaInicio, duracion);
    };

    // Guardar turno en la base de datos
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!startDate || !selectedOption) {
            alert("Selecciona una fecha y la cantidad de zonas.");
            return;
        }

        const sessionLength = selectedOption * 5; // Cada zona son 5 min
        const horaInicio = startDate;
        const horaFin = calcularHoraFin(horaInicio, sessionLength);

        const newAppointment = {
            clientId: user.uid,  // ID del usuario logueado
            date: horaInicio,  
            horaInicio,
            horaFin,
            sessionLength,
            sessionZones: parseInt(selectedOption),
            contact,
            type
        };

        try {
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newAppointment)
            });

            if (response.ok) {
                alert('Turno reservado con éxito!');
                setStartDate(null);
                setSelectedOption('');
            } else {
                alert('Hubo un problema al reservar el turno.');
            }
        } catch (error) {
            console.error("Error al reservar turno:", error);
        }
    };

    return (
        <div className='container text-center'>
            <div className="row">
                <div className="col-12">
                    <form className='appointment-form' onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder='Número de contacto'
                            className='form-control'
                            name='contact'
                            value={contact}
                            onChange={onInputChange}
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
                            <option value="1">1 Zona (5 min)</option>
                            <option value="3">3 Zonas (15 min)</option>
                            <option value="5">5 Zonas (25 min)</option>
                            <option value="10">Full-body (50 min)</option>
                        </select>
                        <DatePicker
                            selected={startDate}
                            placeholderText='Seleccione una fecha y hora'
                            className="form-control"
                            onChange={(date) => setStartDate(date)}
                            dateFormat="Pp"
                            showTimeSelect
                            locale="es"
                            timeCaption="Hora"
                            minDate={new Date()}
                            includeDates={calendarDays.waxDays}
                            timeIntervals={5}
                            name='date'
                            required
                            excludeTimes={availableTimes}
                            withPortal
                            minTime={setHours(setMinutes(new Date(), 0), 9)}
                            maxTime={setHours(setMinutes(new Date(), 30), 17)}
                        />
                        <button type='submit' className='form-control'>Reservar turno</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AppointmentRequestForm;
