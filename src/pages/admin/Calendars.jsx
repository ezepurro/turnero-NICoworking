import Tooltip from "../../components/Tooltip"
import CalendarComponent from "./CalendarComponent"



const Calendars = ({ waxAppointments }) => {

  const calendarsInfo = "Los turnos mostrados en el calendario y en la agenda, ya tienen la seña pagada.";

  return (
    <div className="calendars">
      <div className="wax">
        {/* Depilación */}
        <div className="service-title-admin text-center">Próximos turnos <Tooltip info={calendarsInfo} /></div>
        <div className="calendar-admin-container">
          <CalendarComponent events={ waxAppointments }/>
        </div>
      </div>
      <div className="nails">

      </div>
    </div>
  )
}

export default Calendars
