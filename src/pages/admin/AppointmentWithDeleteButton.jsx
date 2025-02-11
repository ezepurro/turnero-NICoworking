import { useAppointments } from "../../hooks/useAppointments";
import useAppointmentsStore from "../../store/useAppointmentsStore";

const AppointmentWithDeleteButton = ({ id, name, date, hour, type, contact }) => {

    const { deleteWaxAppointment } = useAppointments();
    const { waxAppointments, setWaxAppointments } = useAppointmentsStore();


    const deleteAppointment = () => {
        deleteWaxAppointment(id);
        const updatedAppointments = waxAppointments.filter(appointment => appointment.id !== id);
        setWaxAppointments(updatedAppointments);
    }

    return (
        <div className="row">
            <div className="col-3">
                <p><b>{name}</b> - {contact}</p>
            </div>
            <div className="col-3">
                <p>{type}</p>
            </div>
            <div className="col-3">
                <p>{date} | {hour} HS</p>
            </div>
            <div className="col-3">
                <button
                    className="btn delete"
                    onClick={ deleteAppointment }
                >
                    Eliminar turno
                </button>
            </div>
            <hr />
        </div>
        )
    }

export default AppointmentWithDeleteButton;