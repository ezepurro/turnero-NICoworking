import { useEffect, useState } from "react"
import Navbar from "../../components/navbar"
import { useAppointments } from "../../hooks/useAppointments"
import useAuthStore from "../../store/useAuthStore"
import Footer from "../home/Footer"
import AppointmentList from "./AppointmentList"

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

export default MyAppointments
