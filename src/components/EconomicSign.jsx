import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'

const EconomicSign = ({}) => {
    initMercadoPago('YOUR_PUBLIC_KEY',{
        locale: 'es-AR'
    });
    return (
        <div>
            <button>Abonar seña</button>
        </div>
    )
}