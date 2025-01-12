import useCalendarSettingsStore from "../../store/useCalendarSettingsStore";
import { useEffect } from "react";
import { useCalendarSettings } from "../../hooks/useCalendarSettings";
import Service from "./Service";
import '../../styles/components/services.css';


const Services = () => {

  const { getCalendarSettings, getReservedTimes } = useCalendarSettings();
  const { setCalendarDays, setReservedTimes } = useCalendarSettingsStore();

  useEffect(() => {
    const fetchCalendarSettings = async () => {
      const dates = await getCalendarSettings();
      setCalendarDays( dates.calendarSettings );
      const times = await getReservedTimes();
      setReservedTimes( times );
    }
    fetchCalendarSettings();
  }, []);
  
  return (
    <>
      <div className="">
          <div className=" subtitulo">
          <p>Nuestros servicios</p>
          </div>
      </div>
      <div id="services">
          <div className=" service-container">
          <Service image_url="https://serapool.fra1.cdn.digitaloceanspaces.com/media/4752/1700134437065.png" service="DEPILACIÓN DEFINITIVA" service_description="Lorem ipsum dolor sit amet consectetur adipisicing elit." posicion="izq" type="Depilación" />
          </div>
      </div>
    </>
  )
}

export default Services
