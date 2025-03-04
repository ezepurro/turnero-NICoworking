import { useEffect, useState } from "react";
import { useCalendarSettings } from "../../hooks/useCalendarSettings";
import Swal from "sweetalert2";
import useAuthStore from "../../store/useAuthStore";
import useCalendarSettingsStore from "../../store/useCalendarSettingsStore";
import Calendars from "./Calendars";
import DaysSelectors from "./DaysSelectors";
import NoOptionSelected from "./NoOptionSelected";
import AppointmentList from "./AppointmentList";
import '../../styles/pages/admin.css';

const AdminPage = () => {

  const [selectedOption, setSelectedOption] = useState(undefined);
  const { setCalendarDays } = useCalendarSettingsStore();
  const { getCalendarSettings } = useCalendarSettings();
  const { user } = useAuthStore();

  const refreshData = async () => {
    try {
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
            <button onClick={() => setSelectedOption('manage-appointment')}>Administrar turnos</button>
            <hr />
          </div>
        </div>
        <div className="col-sm-12 col-md-10 admin-content">
          {
            selectedOption === 'appointments-calendars' ? <Calendars /> :
            selectedOption === 'appointments-days' ? <DaysSelectors /> :
            selectedOption === 'manage-appointment' ? <AppointmentList /> :
            <NoOptionSelected />
          }
        </div>
      </div>
    </>
  );
};

export default AdminPage;