import { useAppointments } from "../../hooks/useAppointments";
import useAppointmentsStore from "../../store/useAppointmentsStore";

const AppointmentWithDeleteButton = ({ id, name, date, hour }) => {

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
                <p><b>{name}</b></p>
            </div>
            <div className="col-3">
                <p>{date}</p>
            </div>
            <div className="col-3">
                <p>{hour}</p>
            </div>
            <div className="col-3">
                <button
                    className="btn"
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