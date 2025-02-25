import Swal from "sweetalert2";
import useAuthStore from "../store/useAuthStore";
import handleApi from "../api/handleApi";
import { getSessionLength } from "../helpers/getSessionLength";
import { formatPhoneNumber } from "../helpers/formatPhoneNumber";

export const useAppointments = () => {

    const { user } = useAuthStore();

    const getUserAppointments = async ( uid ) => {
        try {
            const { data } = await handleApi.get(`/appointments/users/${uid}`);
            return data.appointments.filter(appointment => appointment.status === "paid");
        } catch (error) {
            console.log(error);
        }
    }

    const addAppointment = async ({ contact, sessionZones, date, userId, type, sessionLength, status }) => {
        
        const normalizedContact = formatPhoneNumber(contact);

        const isoDate = date.toISOString();

        (type === "Depilación")
            ? sessionLength = getSessionLength( sessionZones )
            : sessionLength = null

        try {
            const { data } = await handleApi.post('/appointments', { date:isoDate, userId, contact: normalizedContact, sessionZones, type, sessionLength, status });
            return data.appointment.id;
            // Swal.fire({
            //     icon: 'success',
            //     title: 'Cita agendada!',
            //     text: `Te esperamos, ${user.name}!`,
            //     showConfirmButton: false, 
            //     timer: 1500,             
            // });
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

    const getWaxAppointments = async () => {
        try {
            const { data } = await handleApi.get('/appointments/waxing');
            return data.waxAppointments;
        } catch (error) {
            console.log(error);
        }
    }

    const deleteWaxAppointment = async ( id ) => {
        try {
            await handleApi.delete(`/appointments/${id}`);
            Swal.fire({
                icon: 'success',
                title: 'Se ha eliminado el turno',
                showConfirmButton: false, 
                timer: 1500,             
            });
        } catch (error) {
            console.log(error);
            const data = error.response.data;
            const errorMessage = data.msg || 'Error desconocido';
            Swal.fire({
                icon: 'error',
                title: 'Error al eliminar turno',
                text: errorMessage,
                showConfirmButton: false, 
                timer: 1500,             
            });
        }
    }

    return {
        getUserAppointments,
        getWaxAppointments,
        addAppointment,
        deleteWaxAppointment
    }
}