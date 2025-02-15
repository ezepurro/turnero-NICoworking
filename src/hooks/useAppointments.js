import { getSessionLength } from "../helpers/getSessionLength";
import handleApi from "../api/handleApi";
import Swal from "sweetalert2";
import useAuthStore from "../store/useAuthStore";

export const useAppointments = () => {

    const { user } = useAuthStore();

    const getUserAppointments = async ( uid ) => {
        try {
            const { data } = await handleApi.get(`/appointments/users/${uid}`);
            return data.appointments;
        } catch (error) {
            console.log(error);
        }
    }

    const addAppointment = async ({ contact, sessionZones, date, userId, type, sessionLength }) => {
        const isoDate = date.toISOString();
        (type === "Depilación")
            ? sessionLength = getSessionLength( sessionZones )
            : sessionLength = null
        console.log({ contact, sessionZones, date:isoDate, userId, type, sessionLength });
        try {
            const { data } = await handleApi.post('/appointments', { date:isoDate, userId, contact, sessionZones, type, sessionLength });
            Swal.fire({
                icon: 'success',
                title: 'Cita agendada!',
                text: `Te esperamos, ${user.name}!`,
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