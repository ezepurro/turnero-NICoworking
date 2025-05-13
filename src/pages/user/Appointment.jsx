import { useState, useEffect } from "react";
import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";
import Swal from "sweetalert2";
import { useMercadoPago } from "../../hooks/useMercadoPago";
import { getEnvVariables } from "../../helpers/getEnvVariables";

// Inicializamos MercadoPago fuera del componente
const { VITE_MP_PUBLIC_KEY } = getEnvVariables();
initMercadoPago(VITE_MP_PUBLIC_KEY, { locale: "es-AR" });

const Appointment = ({ id, service, date, hour, status, price, zonesAmmount }) => {
    const { createPreference } = useMercadoPago();


    const [preferenceId, setPreferenceId] = useState(null);

        useEffect(() => {
            const fetchPreferenceId = async()=> {
                const newPreferenceId = await createPreference( price,date,zonesAmmount,id );
                setPreferenceId(newPreferenceId);
            }
            fetchPreferenceId().then((res)=>{
                console.log(res)
            })
        },[id])


    return (
        <div className="container">           
                    <div className="row align-items-center">
                        <div className="col-md-3">
                            <h4><b>{service}</b></h4>
                        </div>
                        <div className="col-md-3">
                            <p>{date}</p>
                        </div>
                        <div className="col-md-3">
                            <p>{hour} HS</p>
                        </div>
                        <div className="col-md-3">
                            <p className={status === "paid" ? "paid" : "pending"}>
                                {status === "paid" ? "Seña pagada" : "Sin seña"}
                            </p>
                        </div>
                        <div>
                        {status === "pending" && preferenceId && (
                            <div className="text-center mt-3">
                                <Wallet key={preferenceId} initialization={{ preferenceId }} customization={{ texts: { valueProp: "smart_option" } }} />
                            </div>
                        )}
                        </div>
                    </div>
        </div>
    );
};

export default Appointment;
