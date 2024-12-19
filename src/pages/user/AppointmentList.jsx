import '../../styles/components/appointmentList.css'
import Appointment from './Appointment'


const AppointmentList = () => {
  return (
    <div className="container">
        <div className="row">
            <div className="col-12 appointments-container">
                <h3 className='text-center'>Mis turnos</h3>

                <Appointment service="SPA" date="25/12/24" hour="13:30" />
                <Appointment service="Peluqueria" date="25/12/24" hour="13:30" />
                <Appointment service="SPA" date="25/12/24" hour="13:30" />

            </div>
        </div>
    </div>
  )
}

export default AppointmentList
