import parsePhoneNumberFromString from "libphonenumber-js";
import { checkAvailability } from "./checkAvailability";


export const validateAppointmentForm = async ( contact, startDate, selectedOption, calendarDays, type ) => {
    // Validación de que esten todos los campos completados
    if (!contact || !startDate || !selectedOption) {
        return { valid: false, message: "Por favor, completa todos los campos antes de continuar" };
    }
    
    // Validación de que la fecha seleccionada este habilitada
    const selected = new Date(startDate);
    const selectedFormatted = selected.toISOString().split("T")[0];
    const isValidDate = calendarDays.waxDays.some(day => day.split("T")[0] === selectedFormatted);
    if (!isValidDate) {
        return { valid: false, message: "La fecha seleccionada no está disponible para reservar turnos" };
    }

    // Validación de que este en el horario habilitado|
    const openingHour = 9;
    const closingHour = 21;
    const selectedHour = selected.getHours();
    if (selectedHour < openingHour || selectedHour >= closingHour) {
        return { valid: false, message: "La hora seleccionada está fuera del horario habilitado" };
    }

    // Validación del número de celular
    const phone = parsePhoneNumberFromString(contact.startsWith("+") ? contact : `+${contact}`);
    if (!phone || !phone.isValid()) {
        return { valid: false, message: "Número de teléfono inválido, usa el formato correcto" };
    }

    // Verificar disponibilidad en la base de datos
    const isAvailable = await checkAvailability(startDate, type);
    if (!isAvailable) {
        return { valid: false, message: "Ya existe una reserva para esta fecha y hora. Elige otra disponibilidad" };
    }

    return { valid: true };
};


export const validateRegisterForm = ( email, password, password2, name ) => {
    if (!email || !password || !password2 || !name) {
        return { valid: false, message: "Por favor, completa los campos necesarios antes de continuar" }
    }

    if (password !== password2) {
        return { valid: false, message: "Las contraseñas ingresadas no coinciden" }
    }

    return { valid: true };
}


export const validateLoginForm = ( email, password ) => {
    if (!email || !password) {
        return { valid: false, message: "Por favor, completa los campos necesarios antes de continuar" }
    }
    
    return { valid: true };
}