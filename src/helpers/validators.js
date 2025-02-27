import parsePhoneNumberFromString from "libphonenumber-js";

export const validateAppointmentForm = (contact, startDate, selectedOption, calendarDays) => {
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

    // Validación de que este en el horario habilitado
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

    return { valid: true };
};