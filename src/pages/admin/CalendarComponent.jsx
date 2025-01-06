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
})

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
            />
    </div>
  )
}

export default CalendarComponent

