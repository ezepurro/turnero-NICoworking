import { useEffect, useState } from "react";
import { useAppointments } from "../../hooks/useAppointments";
import useAuthStore from "../../store/useAuthStore";
import AppointmentList from "./AppointmentList";
import Navbar from "../../components/navbar";
import Footer from "../home/Footer";

const MyAppointments = () => {

  const { user } = useAuthStore();
  const { getUserAppointments } = useAppointments(); 
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const fetchedAppointments  = await getUserAppointments(user.uid);
      setAppointments(fetchedAppointments);
    }
    fetchAppointments();
  }, []);


  return (
    <>
      <AppointmentList name={user.name}  appointments={ appointments } />
      <Navbar />
      <Footer />
    </>
  )
}

export default MyAppointments;
