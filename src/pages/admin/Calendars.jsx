import { useEffect, useState } from "react";
import { useAppointments } from "../../hooks/useAppointments"
import CalendarComponent from "./CalendarComponent"
import { useAuthenticationStore } from "../../hooks/useAuthenticationStore";
import { addMinutes } from "date-fns";


const Calendars = () => {

  const { getWaxAppointments } = useAppointments();
  const [waxAppointments, setwaxAppointments] = useState();
  const { getAllUsers } = useAuthenticationStore();


  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const fetchedAppointments = await getWaxAppointments();
        const users = await getAllUsers(); 
        const appointmentsWithNames = fetchedAppointments.map(appointment => {
          const user = users.find(u => u.id === appointment.clientId);
          return {
            title: user.name,
            notes: appointment.type,
            start: new Date(appointment.date),
            end: addMinutes(new Date(appointment.date), appointment.sessionLength),
          };
        });
        setwaxAppointments(appointmentsWithNames);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAppointments();
  }, []);
  

  return (
    <>
      <div className="wax">
        {/* Depilación */}
        <h3 className="service-title-admin text-center">Turnos | Depilación definitiva</h3>
        <CalendarComponent events={ waxAppointments }/>
      </div>

      <div className="wax">
        {/* Depilación */}
        <h3 className="service-title-admin text-center">Turnos | Depilación definitiva</h3>
        <CalendarComponent events={ waxAppointments }/>
      </div>
      <div className="wax">
        {/* Depilación */}
        <h3 className="service-title-admin text-center">Turnos | Depilación definitiva</h3>
        <CalendarComponent events={ waxAppointments }/>
      </div>
    </>
  )
}

export default Calendars
