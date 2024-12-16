import Footer from "../home/Footer"
import '../../styles/admin.css'
import Calendars from "./Calendars"

const AdminPage = () => {
  return (
    <>
      <h1 className="admin-title text-center"><b>NUEVA IDENTIDAD COWORKING</b> Admin</h1>
      <Calendars />
      <Footer />
    </>
  )
}

export default AdminPage
