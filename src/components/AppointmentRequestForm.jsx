import { useState } from 'react';
import DatePicker, {registerLocale} from "react-datepicker";
import es from 'date-fns/locale/es'

import '../styles/components/appointmentRequestForm.css';
import "react-datepicker/dist/react-datepicker.css";

registerLocale('es', es);

const AppointmentRequestForm = () => {

    const [startDate, setStartDate] = useState(new Date());

    return (
    <div className='container text-center'>
        <div className="row">
            <div className="col-12">
                <form action="" className='appointment-form'>
                    <input type="text" placeholder='Número de contacto' className='form-control' />
                    <DatePicker
                        selected={ startDate }
                        className="form-control"
                        onChange={(date) => setStartDate(date)}
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption="Hora"
                    />
                    <button type='submit' className='form-control'>Reservar turno</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default AppointmentRequestForm
