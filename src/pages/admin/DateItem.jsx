import { useCalendarSettings } from "../../hooks/useCalendarSettings";
import useCalendarSettingsStore from "../../store/useCalendarSettingsStore";

const DateItem = ({date, dateObj}) => {

  const { removeWaxDateFromCalendarSettings } = useCalendarSettings();
  const { setCalendarDays, calendarDays } = useCalendarSettingsStore();
  
  const handleDelete = () => {
    removeWaxDateFromCalendarSettings(encodeURIComponent(dateObj));

    const updatedWaxDays = calendarDays.waxDays.filter(
      (d) => new Date(d).getTime() !== new Date(dateObj).getTime()
    );

    setCalendarDays({
      ...calendarDays,
      waxDays: updatedWaxDays,
    });
  };

  return (
    <>
      <div className="row date-item">
          <div className="col-6">
            {date}
          </div>
          <div className="col-6">
            <button
              className="btn"
              onClick={ handleDelete }
            >
              Deshabilitar fecha
            </button>
          </div>
      </div>
      <hr />
    </>
  )
}

export default DateItem;
