import { useEffect, useState } from "react";
import { useAppointments } from "../../hooks/useAppointments";
import { useAuthenticationStore } from "../../hooks/useAuthenticationStore";
import { addMinutes } from "date-fns";
import { useCalendarSettings } from "../../hooks/useCalendarSettings";
import useAppointmentsStore from "../../store/useAppointmentsStore";
import useCalendarSettingsStore from "../../store/useCalendarSettingsStore";
import Calendars from "./Calendars";
import DaysSelectors from "./DaysSelectors";
import NoOptionSelected from "./NoOptionSelected";
import AppointmentList from "./AppointmentList";
import '../../styles/pages/admin.css';

const AdminPage = () => {

  const [selectedOption, setSelectedOption] = useState(undefined);

  const { getWaxAppointments } = useAppointments();
  const { getAllUsers } = useAuthenticationStore();
  const { waxAppointments, setWaxAppointments } = useAppointmentsStore();
  const { setCalendarDays } = useCalendarSettingsStore();
  const { getCalendarSettings } = useCalendarSettings();
  

  // Traer las citas al admin
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const fetchedAppointments = await getWaxAppointments();
        const users = await getAllUsers(); 
        const appointmentsWithNames = fetchedAppointments.map(appointment => {
          const user = users.find(u => u.id === appointment.clientId);
          return {
            id: appointment.id,
            title: user.name,
            notes: appointment.type,
            start: new Date(appointment.date),
            end: addMinutes(new Date(appointment.date), appointment.sessionLength),
            contact: appointment.contact,
            sessionZones: appointment.sessionZones
          };
        });
        setWaxAppointments(appointmentsWithNames);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAppointments();
  }, []);


  // Traer los dias habilitados al admin
  useEffect(() => {
    const fetchCalendarSettings = async () => {
        try {
            const data = await getCalendarSettings();
            const formattedDates = data.calendarSettings.waxDays.map(dateStr => new Date(dateStr));
            setCalendarDays({
              'waxDays': formattedDates,
            });
        } catch (error) {
            console.error(error);
        }
    };

    fetchCalendarSettings();
}, []);

  return (
    <>
      <div className="row">
        <div className="col-sm-12 col-md-2 admin-navbar">
          <h3><a href="/*">BeautyCenter</a><span>Admin</span></h3>
          <hr />
          <div className="admin-options">
            <button onClick={ () => setSelectedOption('appointments-calendars') } >Ver turnos</button>
            <hr />
            <button onClick={ () => setSelectedOption('appointments-days') } >Administrar fechas para turnos</button>
            <hr />
            <button onClick={ () => setSelectedOption('delete-appointment') } >Eliminar turno</button>
          </div>
        </div>
        <div className="col-sm-12 col-md-10 admin-content">
          {
              selectedOption === 'appointments-calendars' ? <Calendars waxAppointments={waxAppointments} /> :
              selectedOption === 'appointments-days' ? <DaysSelectors /> :
              selectedOption === 'delete-appointment' ? <AppointmentList waxAppointments={waxAppointments} /> :
              <NoOptionSelected />
          }
        </div>
      </div>
    </>
  )
}

export default AdminPage;
