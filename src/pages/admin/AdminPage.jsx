import { useState } from "react";
import Calendars from "./Calendars";
import DaysSelectors from "./DaysSelectors";
import NoOptionSelected from "./NoOptionSelected";
import '../../styles/pages/admin.css';

const AdminPage = () => {

  const [selectedOption, setSelectedOption] = useState(undefined);

  return (
    <>
      <div className="row">
        <div className="col-sm-12 col-md-2 admin-navbar">
          <h3><a href="/*">BeautyCenter</a><span>Admin</span></h3>
          <hr />
          <div className="admin-options">
            <button onClick={ () => setSelectedOption('appointments-calendars') } >Ver turnos</button>
            <hr />
            <button onClick={ () => setSelectedOption('appointments-days') } >Habilitar dias para turnos</button>
          </div>
        </div>
        <div className="col-sm-12 col-md-10 admin-content">
          {
              selectedOption === 'appointments-calendars' ? <Calendars /> :
              selectedOption === 'appointments-days' ? <DaysSelectors /> :
              <NoOptionSelected />
          }
        </div>
      </div>
    </>
  )
}

export default AdminPage
