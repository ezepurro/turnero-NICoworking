import Footer from "../home/Footer";
import Calendars from "./Calendars";
import DaysSelectors from "./DaysSelectors";
import Navbar from "../../components/Navbar";
import '../../styles/pages/admin.css';

const AdminPage = () => {

  return (
    <>
      <Navbar />
      <div className="container admin-container">
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
