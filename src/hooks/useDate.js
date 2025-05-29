import handleApi from "../api/handleApi";
import Swal from "sweetalert2";

export const useDate = () => {
    
        const getDates = async () => {
        try {
            const { data } = await handleApi.get('/date');

            if (!data.dates) return [];

            return Array.isArray(data.dates)
                ? data.dates
                : [data.dates];

        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error al obtener fechas',
                text: error?.response?.data?.msg || 'Error desconocido',
                showConfirmButton: false,
                timer: 1500,
            });
            return [];
        }
    };


    const getObjectDates = async () => {
        try {
            const { data } = await handleApi.get('/date');
            return data;
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error al obtener fechas',
                text: error.response?.data?.msg || 'Error desconocido',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    const addDate = async (newDateAvailable, startTime, endTime) => {
        try {
            await handleApi.post('/date', { newDateAvailable, startTime, endTime });
            Swal.fire({
                icon: 'success',
                title: 'Fecha habilitada!',
                text: 'La fecha ya se encuentra disponible para turnos',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error al habilitar fecha',
                text: error.response?.data?.msg || 'Error desconocido',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    const changeDateTime = async ({ dateId, newStartTime, newEndTime }) => {
        try {
            await handleApi.put('/date', { dateId, newStartTime, newEndTime });
            Swal.fire({
                icon: 'success',
                title: 'Fecha modificada!',
                text: 'Los horarios fueron actualizados correctamente',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error al modificar la fecha',
                text: error.response?.data?.msg || 'Error desconocido',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    const removeDate = async (dateId) => {
        try {
            await handleApi.delete('/date', {
                params: { dateId }
            });
            Swal.fire({
                icon: 'warning',
                title: 'Fecha deshabilitada correctamente',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error al deshabilitar la fecha',
                text: error.response?.data?.msg || 'Error desconocido',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    return {
        getDates,
        getObjectDates,
        addDate,
        changeDateTime,
        removeDate
    };
};
