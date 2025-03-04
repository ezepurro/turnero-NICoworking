import { useEffect, useState } from "react";
import Tooltip from "../../components/Tooltip";
import CalendarComponent from "./CalendarComponent";
import Swal from "sweetalert2";
import { useAppointments } from "../../hooks/useAppointments";
import { useAuthenticationStore } from "../../hooks/useAuthenticationStore";
import { addMinutes } from "date-fns";

const Calendars = () => {
  const [calendarType, setCalendarType] = useState("");
  const [calendarEvents, setCalendarEvents] = useState([]);
  const { getAppointmentsByService } = useAppointments();
  const { getAllUsers } = useAuthenticationStore();

  useEffect(() => {
    const chooseCalendar = async () => {
      const inputOptions = new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            "Depilación": "Depilación",
            // "Peluqueria": "Peluqueria",
          });
        }, 250);
      });

      const { value: service } = await Swal.fire({
        title: "Seleccione tipo de turno",
        input: "radio",
        inputOptions,
        confirmButtonText: "Seleccionar",
        allowOutsideClick: false,
        allowEscapeKey: false,
        inputValidator: (value) => {
          if (!value) {
            return "Por favor, seleccione tipo de turno";
          }
        },
      });

      if (service) {
        setCalendarType(service);
        const [appointments, users] = await Promise.all([
          getAppointmentsByService(service),
          getAllUsers(),
        ]);

        const events = (appointments || []).map((appointment) => {
          const user = users.find((u) => u.id === appointment.clientId);
          return {
            id: appointment.id,
            title: user ? user.name : "Desconocido",
            start: new Date(appointment.date),
            end: addMinutes(new Date(appointment.date), appointment.sessionLength || 0),
            contact: appointment.contact,
            sessionZones: appointment.sessionZones,
            status: appointment.status,
            clientId: appointment.clientId,
            type: appointment.type,
            isoDate: appointment.date,
          };
        });
        setCalendarEvents(events);
      }
    };

    chooseCalendar();
  }, []);

  const calendarsInfo = "Los turnos mostrados en el calendario y en la agenda, ya tienen la seña pagada.";

  return (
    <div className="calendars">
      <div className="service-title-admin text-center">
        Próximos turnos de {calendarType.toLocaleLowerCase()}
        <Tooltip info={calendarsInfo} />
      </div>
      <div className="calendar-admin-container">
        <CalendarComponent events={calendarEvents} />
      </div>
    </div>
  );
};

export default Calendars;
