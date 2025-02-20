import '../styles/components/authenticationRedirect.css';


const AuthenticationRedirect = () => {
  return (
    <div className="container">
        <div className="row">
            <div className="col-12 text-center authentication-redirect">
                <p>Es necesario acceder para poder reservar un turno</p>
                <div className="row links">
                  <div className="col-6"><a href="/auth/login">Iniciar Sesión</a></div>
                  <div className="col-6"><a href="/auth/register">Registrarse</a></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AuthenticationRedirect
