import { useEffect, useState } from "react";
import { useAppointments } from "../../hooks/useAppointments";
import { useCalendarSettings } from "../../hooks/useCalendarSettings";
import useCalendarSettingsStore from "../../store/useCalendarSettingsStore";
import useAuthStore from "../../store/useAuthStore";
import AppointmentList from "./AppointmentList";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Swal from "sweetalert2";

const MyAppointments = () => {

  const { user } = useAuthStore();
  const [ appointments, setAppointments ] = useState([]);
  const { getUserAppointments } = useAppointments();
  const { getCalendarSettings } = useCalendarSettings();
  const { setCalendarDays } = useCalendarSettingsStore();

  useEffect(() => {
    const fetchAppointments = async () => {
      const fetchedAppointments = await getUserAppointments(user.uid);
      setAppointments(fetchedAppointments);
    }
    const fetchCalendarSettings = async () => {
      const dates = await getCalendarSettings();
      setCalendarDays(dates.calendarSettings);
    }
    
    fetchAppointments();
    fetchCalendarSettings();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const collectionStatus = params.get("collection_status");
    const status = params.get("status");

    if (collectionStatus === "approved" || status === "approved") {
      Swal.fire({
        icon: 'success',
        title: 'Cita agendada!',
        text: `Te esperamos, ${user.name}!`,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
      });
    }
  }, [])



  return (
    <>
      <AppointmentList name={user.name} appointments={appointments} />
      <Navbar />
      <Footer />
    </>
  )
}

export default MyAppointments;
