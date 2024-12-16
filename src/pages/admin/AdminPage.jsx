import Footer from "../home/Footer"
import '../../styles/admin.css'
import Calendars from "./Calendars"

const AdminPage = () => {
  return (
    <>
      <h1 className="admin-title text-center"><a href="/"><b>NUEVA IDENTIDAD COWORKING</b></a> Admin</h1>
      <Calendars />
      <Footer />
    </>
  )
}

export default AdminPage
