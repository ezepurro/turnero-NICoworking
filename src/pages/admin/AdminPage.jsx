import { useEffect, useState } from "react";
import { useAppointments } from "../../hooks/useAppointments";
import { useAuthenticationStore } from "../../hooks/useAuthenticationStore";
import { useCalendarSettings } from "../../hooks/useCalendarSettings";
import { addMinutes } from "date-fns";
import Swal from "sweetalert2";
import useAppointmentsStore from "../../store/useAppointmentsStore";
import useAuthStore from "../../store/useAuthStore";
import useCalendarSettingsStore from "../../store/useCalendarSettingsStore";
import Calendars from "./Calendars";
import DaysSelectors from "./DaysSelectors";
import NoOptionSelected from "./NoOptionSelected";
import AppointmentList from "./AppointmentList";
import Reload from "../../components/icons/Reload";
import '../../styles/pages/admin.css';

const AdminPage = () => {
  const [selectedOption, setSelectedOption] = useState(undefined);

  const { getWaxAppointments } = useAppointments();
  const { getAllUsers } = useAuthenticationStore();
  const { waxAppointments, setWaxAppointments } = useAppointmentsStore();
  const { setCalendarDays } = useCalendarSettingsStore();
  const { getCalendarSettings } = useCalendarSettings();
  const { user } = useAuthStore();

  const refreshData = async () => {
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
          sessionZones: appointment.sessionZones,
          status: appointment.status
        };
      });
      setWaxAppointments(appointmentsWithNames);

      const data = await getCalendarSettings();
      const formattedDates = data.calendarSettings.waxDays.map(dateStr => new Date(dateStr));
      setCalendarDays({
        'waxDays': formattedDates,
      });
    } catch (error) {
      console.error("Error al recargar los datos:", error);
    }
  };

  useEffect(() => {
    refreshData();
    Swal.fire({
      title: `Bienvenida ${user.name}`,
      text: 'Cargando la información necesaria',
      showConfirmButton: false, 
      timer: 1500,         
      timerProgressBar: true    
    });
  }, []); 

  const reloadData = () => {
    refreshData();
    Swal.fire({
      icon: 'success',
      title: 'Información actualizada exitosamente',
      showConfirmButton: false, 
      timer: 1500,   
    });
  }

  return (
    <>
      <div className="row">
        <div className="col-sm-12 col-md-2 admin-navbar">
          <h3><a href="/">BeautyCenter</a><span>Admin</span></h3>
          <hr />
          <div className="admin-options">
            <button onClick={() => setSelectedOption('appointments-calendars')}>Ver turnos</button>
            <hr />
            <button onClick={() => setSelectedOption('appointments-days')}>Administrar fechas para turnos</button>
            <hr />
            <button onClick={() => setSelectedOption('delete-appointment')}>Eliminar turnos</button>
            <hr />
            <button onClick={reloadData}><Reload /> Recargar turnos</button>
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
  );
};

export default AdminPage;