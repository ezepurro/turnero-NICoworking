import { useState } from 'react';
import AppointmentRequestModal from './AppointmentRequestModal';
import '../../styles/components/service.css';


const Service = ({image_url, service, service_description, posicion, type}) => {

  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="service">
        <div className="image-content">
            <img src={image_url} />
        </div>
        <div className="service-overlay">
            <div className={`info ${posicion}`} >
                <h2>{service}</h2>
                <p>{service_description}</p>
                <button onClick={() => setModalShow(true)}>RESERVAR TURNO</button>
                <AppointmentRequestModal
                  show={ modalShow }
                  onHide={() => setModalShow(false)}
                  service={ service }
                  type={ type }
                />
            </div>
        </div>
    </div>
  )
}

export default Service;
