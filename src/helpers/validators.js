import parsePhoneNumberFromString from "libphonenumber-js";


export const validateAppointmentForm = async (contact, startDate, selectedOption) => {
    // Validación de que estén todos los campos completados
    if (!contact || !startDate || !selectedOption) {
        return { valid: false, message: "Por favor, completa todos los campos antes de continuar" };
    }

    const selected = new Date(startDate);
    const now = new Date();

    // Validación de que la fecha sea mayor al presente
    if (selected <= now) {
        return { valid: false, message: "La fecha y hora seleccionadas deben ser posteriores a la actual" };
    }

    // Validación de que la fecha seleccionada esté habilitada
    //const selectedFormatted = selected.toISOString().split("T")[0];
    // const isValidDate = calendarDays.waxDays.some(day => day.split("T")[0] === selectedFormatted);
    // if (!isValidDate) {
    //     return { valid: false, message: "La fecha seleccionada no está disponible para reservar turnos" };
    // }

    // Validación de que esté en el horario habilitado
    // const openingHour = 9;
    // const closingHour = 21;
    // const selectedHour = selected.getHours();
    // if (selectedHour < openingHour || selectedHour >= closingHour) {
    //     return { valid: false, message: "La hora seleccionada está fuera del horario habilitado" };
    // }

    // Validación del número de celular
    const phone = parsePhoneNumberFromString(contact.startsWith("+") ? contact : `+${contact}`);
    if (!phone || !phone.isValid()) {
        return { valid: false, message: "Número de teléfono inválido, usa el formato correcto" };
    }

    // Verificar disponibilidad en la base de datos
    //CHECKAVAILIBITY
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