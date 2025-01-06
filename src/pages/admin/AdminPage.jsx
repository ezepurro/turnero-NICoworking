import Footer from "../home/Footer"
import Calendars from "./Calendars"
import Header from "../../components/Header"
import DaysSelectors from "./DaysSelectors"
import '../../styles/pages/admin.css'

const AdminPage = () => {
  return (
    <>
      <Header txt=" Admin" />
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-lg-6">
            <Calendars /> 
          </div>
          <div className="col-sm-12 col-lg-6">
            <DaysSelectors /> 
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AdminPage
