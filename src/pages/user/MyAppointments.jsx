import { useEffect, useState } from "react";
import { useAppointments } from "../../hooks/useAppointments";
import Swal from "sweetalert2";
import useAuthStore from "../../store/useAuthStore";
import AppointmentList from "./AppointmentList";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";

const MyAppointments = () => {

  const { user } = useAuthStore();
  const { getUserAppointments } = useAppointments(); 
  const [ appointments, setAppointments ] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const fetchedAppointments  = await getUserAppointments(user.uid);
      setAppointments(fetchedAppointments);
    }

    fetchAppointments();
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
          confirmButtonText: 'Aceptar',});
    }
  }, [])
  


  return (
    <>
      <AppointmentList name={user.name}  appointments={ appointments } />
      <Navbar />
      <Footer />
    </>
  )
}

export default MyAppointments;
