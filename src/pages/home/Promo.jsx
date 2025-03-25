import { useState } from "react";
import AppointmentRequestModal from './AppointmentRequestModal';
import { service } from "../../data/services";


const Promo = ({ data }) => {

  const [modalShow, setModalShow] = useState(false);

  return (
    <article>
        <h4>{data.title.toLocaleUpperCase()}</h4>
        <img src={data.image} alt={data.title} />
        <p>{data.price}</p>
        <button onClick={() => setModalShow(true)} >Reservar</button>
        <AppointmentRequestModal
          show={ modalShow }
          onHide={() => setModalShow(false)}
          service={ service.title.toLocaleUpperCase() }
          type={ service.type }
          defaultValue={data.value}
        />
    </article>
  )
}

export default Promo;