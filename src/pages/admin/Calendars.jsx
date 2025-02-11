import CalendarComponent from "./CalendarComponent"



const Calendars = ({ waxAppointments }) => {
  return (
    <div className="calendars">
      <div className="wax">
        {/* Depilación */}
        <h3 className="service-title-admin text-center">Próximos turnos</h3>
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
