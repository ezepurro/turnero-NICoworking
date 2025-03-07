import { useState } from 'react';
import { useAppointments } from "../../hooks/useAppointments";
import Tooltip from "../../components/Tooltip";
import Swal from "sweetalert2";
import AppointmentReScheduleForm from "./AppointmentReScheduleForm";
import { convertDateToDDMMYY, convertDateToHHMM } from '../../helpers/converters';

const AppointmentWithDeleteButton = ({ appointmentData, refreshData }) => {

    const { deleteAppointment, updateAppointment } = useAppointments();
    const [ showModal, setShowModal ] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const deleteSelectedAppointment = async () => {

        const result = await Swal.fire({
            title: `Desea eliminar el turno de ${appointmentData.title}?`,
            text: `Esta acción no se puede deshacer`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#a13333",
            cancelButtonColor: "#898989",
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
        });

        if (result.isConfirmed) {
            await deleteAppointment(appointmentData.id);
            refreshData();
        }
    }

    const handleAppointmentToPaid = async () => {
        try {
            const updatedData = {
                id: appointmentData.id,
                status: "paid",
                userId: appointmentData.clientId
            };
            const isUpdated = await updateAppointment(updatedData);
            if (isUpdated) {
                Swal.fire({
                    icon: 'success',
                    title: 'Seña marcada como pagada',
                    showConfirmButton: false,
                    timer: 1500,
                });
                refreshData();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const pendingInfo = `El cliente ${appointmentData.title} está realizando el pago de la seña en este momento. Si el pago no se completa, la reserva del turno se cancelará automáticamente en unos minutos.`;

    return (
        <div className="row">
            <div className="col-md-2 col-sm-12">
                <p><b>{appointmentData.title}</b> - {appointmentData.contact.startsWith("+") ? appointmentData.contact : `+${appointmentData.contact}`}</p>
            </div>
            <div className="col-md-2 col-sm-12">
                <p>{appointmentData.type}</p>
            </div>
            <div className="col-md-2 col-sm-12">
                <p>{convertDateToDDMMYY(appointmentData.isoDate)} | {convertDateToHHMM(appointmentData.isoDate)} HS</p> 
            </div>
            <div className="col-md-2 col-sm-12">
                {
                    (appointmentData.status === "pending")
                        ? <div className="status-pending">En proceso de pago <Tooltip info={pendingInfo} /></div>
                        : <div className="status-paid">Seña pagada</div>
                }
            </div>
            <div className="col-md-2 col-sm-12">
                {
                    (appointmentData.status === "pending")
                        ? <button className="btn make-paid" onClick={handleAppointmentToPaid}>Marcar como pago</button>
                        : <button className="btn re-schedule" onClick={handleShowModal}>Reagendar turno</button>
                }
            </div>
            <div className="col-md-2 col-sm-12">
                {
                    (appointmentData.status === "pending")
                        ? <button className="btn delete" disabled>Eliminar turno</button>
                        : <button className="btn delete" onClick={deleteSelectedAppointment}>Eliminar turno</button>
                }
            </div>
            <hr />


            <AppointmentReScheduleForm
                show={showModal}
                handleClose={handleCloseModal}
                appointment={appointmentData} 
                refreshData={refreshData}
            />
        </div>
    );
}

export default AppointmentWithDeleteButton;