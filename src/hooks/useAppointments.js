import Swal from "sweetalert2";
import handleApi from "../api/handleApi";
import { getSessionLength } from "../helpers/getSessionLength";

export const useAppointments = () => {

    const getUserAppointments = async ( uid ) => {
        try {
            const { data } = await handleApi.get(`/appointments/users/${uid}`);
            return data.appointments.filter(appointment => appointment.status === "paid");
        } catch (error) {
            console.log(error);
        }
    }

    
    const addAppointment = async ({ contact, sessionZones, date, userId, type, sessionLength, status }) => {

        const isoDate = date.toISOString();

        sessionLength = (type === "Depilación") ? getSessionLength(sessionZones) : null;

        try {
            const { data } = await handleApi.post('/appointments', {
                date: isoDate, userId, contact, sessionZones, type, sessionLength, status
            });
            return data.appointment.id;
        } catch (error) {
            console.log(error);
            const data = error.response?.data;
            const errorMessage = data?.msg || 'Error desconocido';
            Swal.fire({
                icon: 'error',
                title: 'Error al reservar turno',
                text: errorMessage,
                showConfirmButton: false,
                timer: 1500,
            });
        }
    }


    const getAppointmentsByService = async ( service ) => {
        try {
            const { data } = await handleApi.post('/appointments/service', { type: service });
            return data.appointments;
        } catch (error) {
            console.log(error);
        }
    }

    const getAllAppointments = async () => {
        try {
            const { data } = await handleApi.get('/appointments');
            return data.appointments;
        } catch (error) {
            console.log(error);
        }
    }

    const deleteWaxAppointment = async ( id ) => {
        try {
            await handleApi.delete(`/appointments/${id}`);
            Swal.fire({
                icon: 'warning',
                title: 'Se ha eliminado el turno',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.log(error);
            const data = error.response?.data;
            const errorMessage = data?.msg || 'Error desconocido';
            Swal.fire({
                icon: 'error',
                title: 'Error al eliminar turno',
                text: errorMessage,
                showConfirmButton: false,
                timer: 1500,
            });
        }
    }


    const getReservedTimes = async ( date, sessionLength ) => {
        try {
            const formattedDate = date.toISOString().split('T')[0]; 
            const { data } = await handleApi.get(`/appointments/reserved?date=${formattedDate}&duration=${sessionLength}`);
            return data.reservedTimes.map(time => new Date(time)); 
        } catch (error) {
            console.log("Error obteniendo los horarios ocupados:", error);
            return [];
        }
    }

    const updateAppointment = async ( appointmentChanges ) => {
        try {
            const {data} = await handleApi.put(`/appointments/${appointmentChanges.id}`, appointmentChanges);
            Swal.fire({
                icon: 'success',
                title: 'Turno actualizado',
                text: 'Los cambios han sido guardados con éxito',
                showConfirmButton: false, 
                timer: 1500,     
            });
            return data.ok;
        } catch (error) {
            console.log(error);
            const data = error.response?.data;
            const errorMessage = data?.msg || 'Error desconocido';
            Swal.fire({
                icon: 'error',
                title: 'Error al actualizar turno',
                text: errorMessage,
                showConfirmButton: false,
                timer: 1500,
            });
            return false;
        }
    }


    return {
        addAppointment,
        deleteWaxAppointment,
        getAllAppointments,
        getAppointmentsByService,
        getReservedTimes, 
        getUserAppointments,
        updateAppointment,
    }
};
