import Service from "./Service"
import '../../styles/components/services.css'
const Services = () => {
  return (
    <>
        <div className="row">
            <div className="col-lg-12 subtitulo">
            <p>Nuestros servicios</p>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-12 service-container">
            <Service image_url="https://serapool.fra1.cdn.digitaloceanspaces.com/media/4752/1700134437065.png" service="SPA" service_description="Lorem ipsum dolor sit amet consectetur adipisicing elit." posicion="izq" />
            </div>
            <div className="col-lg-12 service-container">
            <Service image_url="https://www.designsystem.es/wp-content/uploads/2023/10/Tendencias-de-colores-y-materiales-para-el-mobiliario-de-tu-peluqueria.jpg" service="PELUQUERIA" service_description="Lorem ipsum dolor sit amet consectetur adipisicing elit." posicion="der" />
            </div>
            <div className="col-lg-12 service-container">
            <Service image_url="https://serapool.fra1.cdn.digitaloceanspaces.com/media/4752/1700134437065.png" service="SPA" service_description="Lorem ipsum dolor sit amet consectetur adipisicing elit." posicion="izq" />
            </div>
            <div className="col-lg-12 service-container">
            <Service image_url="https://www.designsystem.es/wp-content/uploads/2023/10/Tendencias-de-colores-y-materiales-para-el-mobiliario-de-tu-peluqueria.jpg" service="PELUQUERIA" service_description="Lorem ipsum dolor sit amet consectetur adipisicing elit." posicion="der" />
            </div>
        </div>
      </>
  )
}

export default Services
