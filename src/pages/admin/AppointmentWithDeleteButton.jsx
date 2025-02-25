import { useAppointments } from "../../hooks/useAppointments";
import useAppointmentsStore from "../../store/useAppointmentsStore";

const AppointmentWithDeleteButton = ({ id, name, date, hour, type, contact, status }) => {

    const { deleteWaxAppointment } = useAppointments();
    const { waxAppointments, setWaxAppointments } = useAppointmentsStore();


    const deleteAppointment = () => {
        deleteWaxAppointment(id);
        const updatedAppointments = waxAppointments.filter(appointment => appointment.id !== id);
        setWaxAppointments(updatedAppointments);
    }

    return (
        <div className="row">
            <div className="col-md-3 col-sm-12">
                <p><b>{name}</b> - {contact}</p>
            </div>
            <div className="col-md-2 col-sm-12">
                <p>{type}</p>
            </div>
            <div className="col-md-2 col-sm-12">
                <p>{date} | {hour} HS</p>
            </div>
            <div className="col-md-3 col-sm-12">
                {
                    (status === "pending")
                        ? <p className="status-pending">En proceso de pago</p>
                        : <p className="status-paid">Seña pagada</p>
                }
            </div>
            <div className="col-md-2 col-sm-12">
                {
                    (status === "pending")
                        ? <button className="btn delete" onClick={ deleteAppointment } disabled>Eliminar turno</button>
                        : <button className="btn delete" onClick={ deleteAppointment }>Eliminar turno</button>
                }
            </div>
            <hr />
        </div>
        )
    }

export default AppointmentWithDeleteButton;