import { convertDateToDDMMYY, convertDateToHHMM } from "../../helpers/converters";
import { useAppointments } from "../../hooks/useAppointments";


const NoPaidAppointmentWithDeleteButton = ({ appointmentData, refreshData }) => {
    
    const { deleteAppointment, updateAppointment } = useAppointments();

    const handleDeleteAppointment = async () => {
    try {
        await deleteAppointment(appointmentData.id); 
        refreshData(); 
    } catch (error) {
        console.error("Error eliminando el turno:", error);
    }
    };

    // const handleAppointmentToPaid = async () => {
    //         try {
    //             const updatedData = {
    //                 id: appointmentData.id,
    //                 status: "paid",
    //                 userId: appointmentData.clientId
    //             };
    //             const isUpdated = await updateAppointment(updatedData);
    //             if (isUpdated) {
    //                 Swal.fire({
    //                     icon: 'success',
    //                     title: 'Seña marcada como pagada',
    //                     showConfirmButton: false,
    //                     timer: 1500,
    //                 });
    //                 refreshData();
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
 
    return (
        <>
            <div className="row">
                <div className="col-md-3">
                    <b>{appointmentData.clientName}</b> - {appointmentData.contact.startsWith("+") ? appointmentData.contact : `+${appointmentData.contact}`}
                </div>
                <div className="col-md-2">
                    {(appointmentData.sessionZones !== 10 ? `${appointmentData.sessionZones} zonas` : 'Full-Body')}
                </div>
                <div className="col-md-3">
                    {convertDateToDDMMYY(appointmentData.date)} | {convertDateToHHMM(appointmentData.date)} HS
                </div>
                <div className="col-md-2 no-paid-status">
                    <b>{(appointmentData.status === 'no-paid' ? 'Sin seña' : appointmentData.status)}</b>
                </div>
                {/* <div className="col-md-2">
                    <button className="btn make-paid" onClick={handleAppointmentToPaid}>Marcar como pago</button>
                </div> */}
                <div className="col-md-2">
                    <button className="btn delete" onClick={handleDeleteAppointment}>Eliminar turno</button>
                </div>
            </div>
            <hr />
        </>
    )
}

export default NoPaidAppointmentWithDeleteButton;
