import Logo from './Logo';
import '../styles/components/navbar.css';

function Navbar(){
    return( 
    <div className="navbar__container">
        <div className="navbar__logo">
            <Logo/>
        </div>
        <div className="navbar__options">
            <a href="/auth/login">Iniciar Sesión</a>
            <a href="/auth/register">Registrarse</a>
        </div>
    </div>
    )
}

export default Navbar