import handleApi from "../api/handleApi";

export const checkAvailability = async ( date, type ) => {
    try {
        const { data } = await handleApi.get(`/appointments/check-availability?date=${encodeURIComponent(date.toISOString())}&type=${type}`);
        return data.available;
    } catch (error) {
        console.log(error);
        return false;
    }
};