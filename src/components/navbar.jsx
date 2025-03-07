import Logo from './Logo';
import useAuthStore from '../store/useAuthStore';
import '../styles/components/navbar.css';
import { useAuthenticationStore } from '../hooks/useAuthenticationStore';


function Navbar() {

    const { isAuthenticated, user } = useAuthStore();

    const { logOut } = useAuthenticationStore();

    return( 
        <div className="navbar__container">
            <div className="navbar__logo">
                <Logo/>
            </div>
            <div className="navbar__options">
                {
                    ( isAuthenticated )
                        ? 
                            <>
                                <a href="/appointments">Mis turnos</a>
                                {
                                    ( user.isAdmin )
                                        ? <a href="/admin">Admin</a>
                                        : null
                                }
                                <button onClick={ logOut }>Cerrar Sesión</button>
                            </>
                        : 
                            <>
                                <a href="/auth/login">Iniciar Sesión</a>
                                <a href="/auth/register">Registrarse</a>
                            </>
                }
            </div>
        </div>
    )
}

export default Navbar;