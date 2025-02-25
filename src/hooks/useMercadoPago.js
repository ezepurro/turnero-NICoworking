import handleApi from "../api/handleApi";
import Swal from "sweetalert2";


export const useMercadoPago = () => {

    const createPreference = async ( price, schedule, zonesAmmount, appointmentId ) => {
            const appointmentPreference = {
                price : price,
                schedule : schedule,
                zonesAmmount : zonesAmmount,
                appointmentId : appointmentId
            }
            try {
                const response = await handleApi.post('/mercadopago/create_preference', appointmentPreference);
                console.log(response);
                return response.data.id;
            }
            catch(error){
                const errorMessage = error.message || 'Se ha producido un error al realizar el pago';
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: errorMessage,
                    showConfirmButton: false, 
                    timer: 1500,             
                });
            }
        }


    return {
        createPreference,
    }
}