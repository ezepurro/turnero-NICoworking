import { useEffect } from "react";
import { useCalendarSettings } from "../../hooks/useCalendarSettings";
import useCalendarSettingsStore from "../../store/useCalendarSettingsStore";
import '../../styles/components/services.css';


const Services = () => {

  const { getCalendarSettings } = useCalendarSettings();
  const { setCalendarDays } = useCalendarSettingsStore();

  useEffect(() => {
    const fetchCalendarSettings = async () => {
      const dates = await getCalendarSettings();
      setCalendarDays( dates.calendarSettings );
    }
    fetchCalendarSettings();
  }, []);
  
  return (
    <>
      <div className="subtitulo">
        <p>DEPILACIÓN LÁSER</p>
        <p className="subtitle">La Libertad de tu Piel sin Vello y Sin Dolor</p>
      </div>
    </>
  )
}

export default Services
