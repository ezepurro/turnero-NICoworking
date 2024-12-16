import CalendarComponent from "./CalendarComponent"
import { events } from "./Events"


const Calendars = () => {
  return (
    <>
        {/* Peluqueria */}
        <h3 className="service-title-admin text-center">Peluqueria</h3>
        <CalendarComponent events={events}/>
        <hr />

        {/* Spa */}
        <h3 className="service-title-admin text-center">Spa</h3>
        <CalendarComponent />
        <hr />

        {/* Peluqueria */}
        <h3 className="service-title-admin text-center">Peluqueria</h3>
        <CalendarComponent events={events}/>
        <hr />

        {/* Spa */}
        <h3 className="service-title-admin text-center">Spa</h3>
        <CalendarComponent />
    </>
  )
}

export default Calendars
