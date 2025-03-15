import { promos } from "../../data/promos";
import Promo from "./Promo";
import "../../styles/components/promos.css";

const Promos = () => {
  return (
    <section className="promos">
        <div className="titulo-promos">
            <h5>¡Elegí tu Sesión!</h5>
        </div>
        <div className="promos-container">
            {
                promos.map((promo, index) => (
                    <Promo data={promo} key={index} />
                ))
            }
        </div>
    </section>
  )
}

export default Promos;
