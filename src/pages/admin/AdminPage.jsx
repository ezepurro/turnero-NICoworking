import { useEffect, useState } from "react";
import Calendars from "./Calendars";
import DaysSelectors from "./DaysSelectors";
import NoOptionSelected from "./NoOptionSelected";
import AppointmentList from "./AppointmentList";
import { useAppointments } from "../../hooks/useAppointments";
import { useAuthenticationStore } from "../../hooks/useAuthenticationStore";
import { addMinutes } from "date-fns";
import '../../styles/pages/admin.css';
import useAppointmentsStore from "../../store/useAppointmentsStore";

const AdminPage = () => {

  const [selectedOption, setSelectedOption] = useState(undefined);

  const { getWaxAppointments } = useAppointments();
  const { getAllUsers } = useAuthenticationStore();
  const { waxAppointments, setWaxAppointments } = useAppointmentsStore();


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

  return (
    <>
      <div className="row">
        <div className="col-sm-12 col-md-2 admin-navbar">
          <h3><a href="/*">BeautyCenter</a><span>Admin</span></h3>
          <hr />
          <div className="admin-options">
            <button onClick={ () => setSelectedOption('appointments-calendars') } >Ver turnos</button>
            <hr />
            <button onClick={ () => setSelectedOption('appointments-days') } >Habilitar dias para turnos</button>
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
