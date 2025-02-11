import { convertDateToDDMMYY, convertDateToHHMM } from "../../helpers/converters";
import AppointmentWithDeleteButton from "./AppointmentWithDeleteButton"


const AppointmentList = ({ waxAppointments }) => {

    const sortedAppointments = Array.isArray(waxAppointments) 
        ? waxAppointments.slice().sort((a, b) => new Date(a.start) - new Date(b.start))
        : [];

    return (
        <div className="delete-appointment">
            <h3 className="service-title-admin text-center">Eliminar turnos</h3>
            {
                sortedAppointments.length > 0 ? (
                    sortedAppointments.map((appointment) => (
                        <AppointmentWithDeleteButton 
                            key={appointment.id} 
                            id={appointment.id} 
                            name={appointment.title} 
                            date={convertDateToDDMMYY(appointment.start)}
                            hour={convertDateToHHMM(appointment.start)}
                        />
                    ))
                ) : (
                    <p>No hay turnos disponibles.</p>
                )
            }
        </div>
  )
}

export default AppointmentList;