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
            console.log({data});
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
            const errorMessage =
                data.msg ||
                data.errors?.email?.msg || 
                data.errors?.password?.msg || 
                data.errors?.name?.msg || 
                'Error desconocido';
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

    return {
        getUserAppointments,
        getWaxAppointments,
        addAppointment
    }
}