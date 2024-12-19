import Footer from "../home/Footer"
import '../../styles/pages/admin.css'
import Calendars from "./Calendars"
import Header from "../../components/Header"

const AdminPage = () => {
  return (
    <>
      <Header txt=" Admin" />
      <Calendars />
      <Footer />
    </>
  )
}

export default AdminPage
