import Service from "./Service"
import '../../styles/components/services.css'
const Services = () => {
  return (
    <>
        <div className="">
            <div className=" subtitulo">
            <p>Nuestros servicios</p>
            </div>
        </div>
        <div className="" id="services">
            <div className=" service-container">
            <Service image_url="https://serapool.fra1.cdn.digitaloceanspaces.com/media/4752/1700134437065.png" service="DEPILACIÓN DEFINITIVA" service_description="Lorem ipsum dolor sit amet consectetur adipisicing elit." posicion="izq" type="Depilación" />
            </div>
        </div>
      </>
  )
}

export default Services
