import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from "date-fns"
import esES from 'date-fns/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import '../../styles/components/calendarComponent.css'


const locales = {
  'es': esES,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CustomAgendaEvent = ({ event }) => (
  <span>
    <strong>{event.title}</strong>
    <p>Número de contacto: {event.contact}</p>
    <p>Cantidad de zonas: {
        (event.sessionZones === 10)
          ? 'Full-body'
          : event.sessionZones
      }</p>
  </span>
);

const CustomToolbar = ({ label, view, onView, onNavigate }) => {
  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button onClick={() => onNavigate("PREV")}>Anterior</button>
        <button onClick={() => onNavigate("TODAY")}>Hoy</button>
        <button onClick={() => onNavigate("NEXT")}>Siguiente</button>
      </span>
      
      {view !== "agenda" ? (
        <span className="rbc-toolbar-label">{label}</span>
      ) : (
        <span className="rbc-toolbar-label">Agenda</span> 
      )}

      <span className="rbc-btn-group">
        <button onClick={() => onView("month")}>Mes</button>
        <button onClick={() => onView("week")}>Semana</button>
        <button onClick={() => onView("day")}>Día</button>
        <button onClick={() => onView("agenda")}>Agenda</button>
      </span>
    </div>
  );
};

const CalendarComponent = ({events}) => {
  return (
    <div>
        <Calendar
            culture='es'
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            messages={{
              date: 'Fecha',
              time: 'Hora',
              event: 'Cliente',
              today: "Hoy",
              previous: "Anterior",
              next: "Siguiente",
              month: "Mes",
              week: "Semana",
              day: "Día",
              agenda: "Agenda",
              noEventsInRange: "No hay citas agendadas en este rango.",
            }}
            components={{
              agenda: {
                event: CustomAgendaEvent, 
              },
              toolbar: CustomToolbar,
            }}
            />
    </div>
  )
}

export default CalendarComponent

