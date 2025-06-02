import { useEffect, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { useAppointments } from '../../hooks/useAppointments';
import { useMercadoPago } from '../../hooks/useMercadoPago';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { getEnvVariables } from '../../helpers/getEnvVariables';
import { validateAppointmentForm } from '../../helpers/validators';
import DatePicker, { registerLocale } from "react-datepicker";
import useAuthStore from '../../store/useAuthStore';

import es from 'date-fns/locale/es';
import Swal from "sweetalert2";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import "react-datepicker/dist/react-datepicker.css";
import '../../styles/components/appointmentRequestForm.css';
import { useDate } from '../../hooks/useDate';

// ...imports...

registerLocale('es', es);

const AppointmentRequestForm = ({ type }) => {
    const [preferenceId, setPreferenceId] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [isTouched, setIsTouched] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [excludedTimes, setExcludedTimes] = useState([]);
    const [includedDates, setIncludedDates] = useState([]);
    const [timeRange, setTimeRange] = useState({ start: null, end: null });

    const { getDates } = useDate();
    const { contact, onInputChange } = useForm({ contact: '', sessionZones: '', date: '' });
    const { addAppointment, getReservedTimes } = useAppointments();
    const { createPreference } = useMercadoPago();
    const { user } = useAuthStore();
    const { VITE_MP_PUBLIC_KEY } = getEnvVariables();

    useEffect(() => {
        async function dataFetching() {
            const fetchedDates = await getDates();
            const filteredDates = fetchedDates.map(date => date.date);
            setIncludedDates(filteredDates);

            // ✅ Seleccionar automáticamente la primera fecha válida si no hay ninguna seleccionada
            if (filteredDates.length > 0 && !startDate) {
                const firstAvailableDate = new Date(filteredDates[0]);
                setStartDate(firstAvailableDate);
                handleDateChange(firstAvailableDate);  // Cargar horarios de esa fecha
            }
        }
        dataFetching();
    }, []);

    initMercadoPago(VITE_MP_PUBLIC_KEY, { locale: 'es-AR' });

    const getMaxSelectableTime = (endTime, durationMinutes) => {
        if (!endTime || !durationMinutes) return null;
        const end = new Date(endTime);
        end.setMinutes(end.getMinutes() - durationMinutes);
        return end;
    };

    const createTimeFromBase = (baseDate, timeISOString) => {
        if (!baseDate || !timeISOString) return null;
        const base = new Date(baseDate);
        const time = new Date(timeISOString);
        const newTime = new Date(base);
        newTime.setHours(time.getUTCHours());
        newTime.setMinutes(time.getUTCMinutes());
        newTime.setSeconds(0);
        newTime.setMilliseconds(0);
        return newTime;
    };

    const convertToDateTimes = (minutesArray, baseDate) => {
        if (!Array.isArray(minutesArray)) {
            console.log('No hay array de minutos');
            return [];
        }

        return minutesArray.map(min => {
            const date = new Date(baseDate);
            date.setHours(0, 0, 0, 0);
            return new Date(date.getTime() + min * 60000);
        });
    };

    const handleDateChange = async (date) => {
        setPreferenceId(null);
        setStartDate(date);
        setIsButtonDisabled(false);

        const sessionLength = (parseInt(selectedOption) !== 10) ? parseInt(selectedOption) * 5 : 25;

        const { reservedTimes, startTime, endTime } = await getReservedTimes(date, sessionLength);

        setExcludedTimes(reservedTimes);
        setTimeRange({
            start: startTime ? new Date(startTime) : null,
            end: endTime ? new Date(endTime) : null
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsButtonDisabled(true);

        const validation = await validateAppointmentForm(contact, startDate, selectedOption);
        if (!validation.valid) {
            Swal.fire({
                icon: "error",
                title: "Error al reservar turno",
                text: validation.message,
                showConfirmButton: false,
                timer: 1500,
            });
            setIsButtonDisabled(false);
            return;
        }

        const id = await addAppointment({
            contact,
            sessionZones: parseInt(selectedOption),
            date: startDate,
            userId: user.uid,
            type,
            sessionLength: null,
            status: 'pending'
        });

        const zonesAmmount = (parseInt(selectedOption) === 10) ? 'Full-Body' : parseInt(selectedOption);
        const price = 7000;
        const schedule = startDate;

        const newPreferenceId = await createPreference(price, schedule, zonesAmmount, id);

        if (newPreferenceId) {
            setPreferenceId(newPreferenceId);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error al procesar el pago',
                text: 'Inténtelo nuevamente. Si el problema persiste, contáctenos',
                showConfirmButton: false,
                timer: 1500,
            });
            setIsButtonDisabled(false);
        }
    };

    const handleInputChange = (event) => {
        setPreferenceId(null);
        setIsButtonDisabled(false);
        onInputChange(event);
    };

    const handleChange = (event) => {
        setPreferenceId(null);
        setIsButtonDisabled(false);
        setSelectedOption(event.target.value);
    };

    const sessionDuration = (parseInt(selectedOption) !== 10) ? parseInt(selectedOption) * 5 : 25;

    return (
        <div className='container'>
            <div className="row">
                <div className="col-12">
                    <form className='appointment-form' onSubmit={handleSubmit}>
                        <label htmlFor="phone-input">Número de teléfono</label>
                        <PhoneInput
                            country={'ar'}
                            value={contact}
                            onBlur={() => setIsTouched(true)}
                            onChange={(value) => handleInputChange({ target: { name: 'contact', value } })}
                            inputProps={{ name: 'contact', required: true }}
                            placeholder='Número de contacto'
                            enableSearch={true}
                            autoFormat={false}
                            isValid={(value) => {
                                if (!isTouched) return true;
                                const phone = parsePhoneNumberFromString(value.startsWith("+") ? value : `+${value}`);
                                return phone?.isValid() || false;
                            }}
                            containerClass="phone-input-container"
                            inputClass="form-control"
                            buttonClass="phone-input-flag-button"
                            id="phone-input"
                        />

                        <label htmlFor="options">Cantidad de zonas</label>
                        <select
                            id="options"
                            value={selectedOption}
                            onChange={handleChange}
                            className='form-control'
                            name='sessionZones'
                        >
                            <option value="" disabled></option>
                            <option value="1">1 Zona</option>
                            <option value="3">3 Zonas</option>
                            <option value="5">5 Zonas</option>
                            <option value="10">Full-body</option>
                        </select>

                        <label htmlFor="date-input">Fecha y hora</label>
                        <DatePicker
                            selected={startDate}
                            className="form-control"
                            onChange={handleDateChange}
                            dateFormat="Pp"
                            showTimeSelect
                            locale="es"
                            timeCaption="Hora"
                            onKeyDown={(e) => { e.preventDefault(); }}
                            minDate={new Date()}
                            includeDates={includedDates}
                            timeIntervals={sessionDuration}
                            name='date'
                            excludeTimes={convertToDateTimes(excludedTimes, startDate)}
                            withPortal
                            minTime={createTimeFromBase(startDate, timeRange.start)}
                            maxTime={createTimeFromBase(
                                startDate,
                                getMaxSelectableTime(timeRange.end, sessionDuration)
                            )}
                            disabled={!selectedOption}
                            id="date-input"
                        />

                        <button type='submit' className='form-control btn-submit' disabled={isButtonDisabled}>
                            Reservar turno
                        </button>
                    </form>

                    {preferenceId && (
                        <Wallet
                            initialization={{ preferenceId }}
                            customization={{ texts: { valueProp: 'smart_option' } }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AppointmentRequestForm;
