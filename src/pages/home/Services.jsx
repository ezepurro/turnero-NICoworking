import { useEffect } from "react";
import { useCalendarSettings } from "../../hooks/useCalendarSettings";
import useCalendarSettingsStore from "../../store/useCalendarSettingsStore";
import Service from "./Service";
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
        <p>Nuestros servicios</p>
      </div>
      <div id="services">
          <div className=" service-container">
          <Service image_url="https://drjulioferreira.com/wp-content/uploads/2018/07/cf_20_agosto_ipl.png" service="DEPILACIÓN DEFINITIVA" service_description="Resultados permanentes, sin dolor, en pocas sesiones. ¡Reserva ahora!" posicion="izq" type="Depilación" />
          </div>
      </div>
    </>
  )
}

export default Services
