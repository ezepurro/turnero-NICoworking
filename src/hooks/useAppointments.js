import handleApi from "../api/handleApi";

export const useAppointments = () => {

    const getUserAppointments = async ( uid ) => {
        try {
            const { data } = await handleApi.get(`/appointments/users/${uid}`);
            return data.appointments;
        } catch (error) {
            console.log(error);
        }
    }

    return {
        getUserAppointments,
    }
}