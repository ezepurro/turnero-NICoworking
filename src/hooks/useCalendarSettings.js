import handleApi from "../api/handleApi";
import Swal from "sweetalert2";



export const useCalendarSettings = () => {

    const addWaxDate = async ({ waxDate }) => {
        try {
            await handleApi.put('/settings/wax', { newDates: waxDate })
            Swal.fire({
                icon: 'success',
                title: 'Dia habilitado!',
                text: 'El dia ya se encuentra disponible para sacar turno',
                showConfirmButton: false, 
                timer: 1500,             
            });
        } catch (error) {
            console.log(error);
            const data = error.response.data;
            const errorMessage = data.msg || 'Error desconocido';
            Swal.fire({
                icon: 'error',
                title: 'Error al registrarse',
                text: errorMessage,
                showConfirmButton: false, 
                timer: 1500,             
            });
        }
    } 
    
    const getCalendarSettings = async () => {
        try {
            const { data } = await handleApi.get('/settings');
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    const getReservedTimes = async () => {
        try {
            const { data } = await handleApi.get('/appointments/waxing');
            const waxDates = data.waxAppointments.map(appointment => appointment.date);
            return {
                'wax': waxDates
            }
        } catch (error) {
            console.log(error);
        }
    }

    const removeWaxDateFromCalendarSettings = async ( date ) => {
        try {
            await handleApi.delete(`/settings/wax?date=${date}`);
            Swal.fire({
                icon: 'warning',
                title: 'Dia deshabilitado correctamente',
                showConfirmButton: false, 
                timer: 1500,             
            });
        } catch (error) {
            console.log(error);
            const data = error.response.data;
            const errorMessage = data.msg || 'Error desconocido';
            Swal.fire({
                icon: 'error',
                title: 'Error al deshabilitar la fecha',
                text: errorMessage,
                showConfirmButton: false, 
                timer: 1500,             
            });
        }
    }


    return {
        addWaxDate,
        getCalendarSettings,
        getReservedTimes,
        removeWaxDateFromCalendarSettings
    }
}

