import { useEffect } from "react";
import { useCalendarSettings } from "../../hooks/useCalendarSettings";
import { services } from "../../data/services";
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
            {
              services.map((service, index) => {
                return <Service key={index} image_url={service.image} service={service.title.toLocaleUpperCase()} service_description={service.description} type={service.type} />
              })
            }
          </div>
      </div>
    </>
  )
}

export default Services
