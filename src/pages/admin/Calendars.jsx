import CalendarComponent from "./CalendarComponent"
import { events } from "./Events"


const Calendars = () => {
  return (
    <>
      <div className="wax">
        {/* Depilación */}
        <h3 className="service-title-admin text-center">Turnos | Depilación definitiva</h3>
        <CalendarComponent events={events}/>
      </div>
    </>
  )
}

export default Calendars
