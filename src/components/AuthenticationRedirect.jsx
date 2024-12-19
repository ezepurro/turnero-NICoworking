import '../styles/components/authenticationRedirect.css';


const AuthenticationRedirect = () => {
  return (
    <div className="container">
        <div className="row">
            <div className="col-12 text-center authentication-redirect">
                <p>Es necesario acceder para poder reservar un turno</p>
                <div className="links">
                    <a href="/auth/login">Iniciar Sesión</a>|
                    <a href="/auth/register">Registrarse</a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AuthenticationRedirect
