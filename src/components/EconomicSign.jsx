import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { useState } from 'react'
import { getEnvVariables } from '../helpers/getEnvVariables';

const EconomicSign = ({}) => {

    const { VITE_MP_PUBLIC_KEY } = getEnvVariables();

    const createPreference = async ( price, schedule, duration, zonesAmmount ) => {
            const appointmentPreference = {
                price : price,
                schedule : schedule,
                duration : duration,
                zonesAmmount : zonesAmmount
            }
            try {
                const response = await fetch('/mercadopago/create_preference', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body : JSON.stringify(appointmentPreference)
                })
                if (!response.ok) {
                    throw new Error(`Error HTTP : ${response.status}`)
                }
                const data = await response.json()
                return data.id
            }
            catch(err){
                console.log(err);
            }
        }
        
    
        const handleBuy = async () => {
            const id = await createPreference();
            if (id) {
                setPreferenceId(id)
            }
        }

        const [preferenceId, setPreferenceId] = useState(null);
        initMercadoPago(VITE_MP_PUBLIC_KEY, {
            locale: 'es-AR'
        });

    return (
        <div>
            <button onClick={handleBuy}>Abonar seña</button>
            {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} customization={{ texts:{ valueProp: 'smart_option'}}} />}
        </div>
    )
}


export default EconomicSign;