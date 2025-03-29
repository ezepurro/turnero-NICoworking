import { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { useAppointments } from '../../hooks/useAppointments';
import { useMercadoPago } from '../../hooks/useMercadoPago';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { setHours, setMinutes } from 'date-fns';
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { getEnvVariables } from '../../helpers/getEnvVariables';
import { validateAppointmentForm } from '../../helpers/validators';
import DatePicker, { registerLocale } from "react-datepicker";
import useAuthStore from '../../store/useAuthStore';
import useCalendarSettingsStore from '../../store/useCalendarSettingsStore';
import es from 'date-fns/locale/es';
import Swal from "sweetalert2";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import "react-datepicker/dist/react-datepicker.css";
import '../../styles/components/appointmentRequestForm.css';
import Warning from '../../components/icons/Warning';

registerLocale('es', es);

const appointmentFormFields = {
    contact: '',
    sessionZones: '',
    date: '',
};

const AppointmentRequestForm = ({ type, defaultValue }) => {
    const [ preferenceId, setPreferenceId ] = useState(null);
    const [ selectedOption, setSelectedOption ] = useState(defaultValue || '');
    const [ startDate, setStartDate ] = useState(null);
    const [ isTouched, setIsTouched ] = useState(false);
    const [ isButtonDisabled, setIsButtonDisabled ] = useState(false);
    const { calendarDays } = useCalendarSettingsStore();
    const { contact, onInputChange } = useForm(appointmentFormFields);
    const { addAppointment, getReservedTimes } = useAppointments();
    const { createPreference } = useMercadoPago();
    const { user } = useAuthStore();
    const { VITE_MP_PUBLIC_KEY } = getEnvVariables();
    const [ excludedTimes, setExcludedTimes ] = useState([]);

    const handleDateChange = async (date) => {
        setPreferenceId(null);
        setStartDate(date);
        setIsButtonDisabled(false);
        const sessionLength = (parseInt(selectedOption) !== 10) ? parseInt(selectedOption) * 5 : 25;
        const reservedTimes = await getReservedTimes(date, sessionLength);
        setExcludedTimes(reservedTimes);
    };

    initMercadoPago(VITE_MP_PUBLIC_KEY, { locale: 'es-AR' });

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsButtonDisabled(true);

        const validation = await validateAppointmentForm(contact, startDate, selectedOption, calendarDays, type);
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

    return (
        <div className='container'>
            <div className="row">
                <div className="col-12">
                    <form className='appointment-form' onSubmit={handleSubmit}>
                        <label htmlFor="phone-input">Número de telefono</label>
                        <PhoneInput
                            country={'ar'}
                            value={contact}
                            onBlur={() => setIsTouched(true)}
                            onChange={(value) => handleInputChange({ target: { name: 'contact', value } })}
                            inputProps={{
                                name: 'contact',
                                required: true,
                            }}
                            placeholder='Por ej: +549...'
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
                        {/* <p className='phone-aclaration'>Por ej: +54 <strong>9</strong> 351...</p> */}
                        <small className="phone-format-helper">
                            <Warning />
                            <div>
                                Asegúrate de ingresar tu número con el código de país y un <strong>9</strong> después. Ejemplo: <code>+54 9 351 1234567</code>
                            </div>
                        </small>

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
                            onKeyDown={(e) => { e.preventDefault() }}
                            minDate={new Date()}
                            includeDates={calendarDays.waxDays}
                            timeIntervals={(parseInt(selectedOption) !== 10) ? parseInt(selectedOption) * 5 : 25}
                            name='date'
                            excludeTimes={excludedTimes}
                            withPortal
                            minTime={setHours(setMinutes(new Date(), 0), 9)}
                            maxTime={setHours(setMinutes(new Date(), 0), 20)}
                            disabled={!selectedOption}
                            id="date-input"
                        />
                        <button type='submit' className='form-control btn-submit' disabled={isButtonDisabled}>Reservar turno</button>
                    </form>
                    {preferenceId && <Wallet initialization={{ preferenceId }} customization={{ texts: { valueProp: 'smart_option' } }} />}
                </div>
            </div>
        </div>
    );
};

export default AppointmentRequestForm;
