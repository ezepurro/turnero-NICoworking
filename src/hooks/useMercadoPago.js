import handleApi from "../api/handleApi";
import Swal from "sweetalert2";


export const useMercadoPago = () => {

    const createPreference = async ( price, schedule, zonesAmmount ) => {
            const appointmentPreference = {
                price : price,
                schedule : schedule,
                zonesAmmount : zonesAmmount
            }
            try {
                const response = await handleApi.post('/mercadopago/create_preference', appointmentPreference);
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