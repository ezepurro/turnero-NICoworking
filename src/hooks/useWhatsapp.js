import handleApi from "../api/handleApi";
import Swal from "sweetalert2";

export const useWhatsapp = () => {

    const sendRescheduleMessage = async (rescheduleData, name) => {
        try {
            await handleApi.post('/whatsapp/reschedule', rescheduleData);
            Swal.fire({
                icon: 'success',
                title: 'Mensaje enviado',
                text: `Se ha enviado el mensaje de reprogramación a ${name}`,
                showConfirmButton: false, 
                timer: 1500,             
            });
        } catch (error) {
            console.log(error);
        }
    }

    return {
        sendRescheduleMessage,
    }
    
}