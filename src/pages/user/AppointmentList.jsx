import { convertDateToDDMMYY, convertDateToHHMM } from '../../helpers/converters';
import '../../styles/components/appointmentList.css';
import Appointment from './Appointment';
import NoAppointments from './NoAppointments';


const AppointmentList = ({ name, appointments }) => {

  return (
    <div className="container">
        <div className="row">
            <div className="col-12 appointments-container">
                <h3 className='text-center'>Mis turnos</h3>
                <h5 className='text-center'>{name}</h5>
                {
                  (appointments.length !== 0)
                    ? (appointments.map( appointment => {
                      return <Appointment
                        key={appointment.id}
                        service={appointment.type}
                        date={convertDateToDDMMYY(appointment.date)}
                        hour={convertDateToHHMM(appointment.date)} />
                    }))
                    : (<NoAppointments />)
                }
            </div>
        </div>
    </div>
  )
}

export default AppointmentList
