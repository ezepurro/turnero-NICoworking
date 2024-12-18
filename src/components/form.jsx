const Form = ({route,mode}) => {
    return (
        <div className="form__container">
            {(mode === 'register') ?
            <div>
                registrarse
            </div>
            :
            <div>
                iniciar sesion
            </div>}
        </div>
    )
}

export default Form