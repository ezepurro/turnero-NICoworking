import { useAppointments } from "../../hooks/useAppointments";
import useAppointmentsStore from "../../store/useAppointmentsStore";
import Tooltip from "../../components/Tooltip";

const AppointmentWithDeleteButton = ({ id, name, date, hour, type, contact, status }) => {

    const { deleteWaxAppointment } = useAppointments();
    const { waxAppointments, setWaxAppointments } = useAppointmentsStore();


    const deleteAppointment = () => {
        deleteWaxAppointment(id);
        const updatedAppointments = waxAppointments.filter(appointment => appointment.id !== id);
        setWaxAppointments(updatedAppointments);
    }

    const pendingInfo = `El cliente ${name} está realizando el pago de la seña en este momento. Si el pago no se completa, la reserva del turno se cancelará automáticamente en unos minutos.`;

    return (
        <div className="row">
            <div className="col-md-3 col-sm-12">
                <p><b>{name}</b> - {contact.startsWith("+") ? contact : `+${contact}`}</p>
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
                        ? <div className="status-pending">En proceso de pago <Tooltip info={pendingInfo} /></div>
                        : <div className="status-paid">Seña pagada</div>
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