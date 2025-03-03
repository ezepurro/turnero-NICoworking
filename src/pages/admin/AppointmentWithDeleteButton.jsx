import { useState } from 'react';
import { useAppointments } from "../../hooks/useAppointments";
import useAppointmentsStore from "../../store/useAppointmentsStore";
import Tooltip from "../../components/Tooltip";
import Swal from "sweetalert2";
import AppointmentReScheduleForm from "./AppointmentReScheduleForm";

const AppointmentWithDeleteButton = ({ id, name, date, hour, type, contact, status, sessionZones, start, clientId }) => {
    const { deleteWaxAppointment } = useAppointments();
    const { waxAppointments, setWaxAppointments } = useAppointmentsStore();
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const deleteAppointment = async () => {
        const result = await Swal.fire({
            title: `Desea eliminar el turno de ${name}?`,
            text: `Esta acción no se puede deshacer`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#a13333",
            cancelButtonColor: "#898989",
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
        });

        if (result.isConfirmed) {
            deleteWaxAppointment(id);
            const updatedAppointments = waxAppointments.filter(appointment => appointment.id !== id);
            setWaxAppointments(updatedAppointments);
        }
    }

    const pendingInfo = `El cliente ${name} está realizando el pago de la seña en este momento. Si el pago no se completa, la reserva del turno se cancelará automáticamente en unos minutos.`;

    return (
        <div className="row">
            <div className="col-md-2 col-sm-12">
                <p><b>{name}</b> - {contact.startsWith("+") ? contact : `+${contact}`}</p>
            </div>
            <div className="col-md-2 col-sm-12">
                <p>{type}</p>
            </div>
            <div className="col-md-2 col-sm-12">
                <p>{date} | {hour} HS</p>
            </div>
            <div className="col-md-2 col-sm-12">
                {
                    (status === "pending")
                        ? <div className="status-pending">En proceso de pago <Tooltip info={pendingInfo} /></div>
                        : <div className="status-paid">Seña pagada</div>
                }
            </div>
            <div className="col-md-2 col-sm-12">
                {
                    (status === "pending")
                        ? <button className="btn delete" disabled>Eliminar turno</button>
                        : <button className="btn delete" onClick={deleteAppointment}>Eliminar turno</button>
                }
            </div>
            <div className="col-md-2 col-sm-12">
                {
                    (status === "pending")
                        ? <button className="btn re-schedule" disabled>Reagendar turno</button>
                        : <button className="btn re-schedule" onClick={handleShowModal}>Reagendar turno</button>
                }
            </div>
            <hr />


            <AppointmentReScheduleForm
                show={showModal}
                handleClose={handleCloseModal}
                appointment={{ id, name, type, contact, status, sessionZones, date:start, clientId }} 
            />
        </div>
    );
}

export default AppointmentWithDeleteButton;