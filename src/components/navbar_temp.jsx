import { useState } from 'react';
import { useAuthenticationStore } from '../hooks/useAuthenticationStore';
import useAuthStore from '../store/useAuthStore';
import AppointmentRequestModal from '../pages/home/AppointmentRequestModal';
import Cross from './icons/Cross';
import Logo from './Logo';
import '../styles/components/navbar.css';

function Navbar() {
    const { isAuthenticated, user } = useAuthStore();
    const { logOut } = useAuthenticationStore();
    const [ modalShow, setModalShow ] = useState(false);
    const [ menuOpen, setMenuOpen ] = useState(false);

    return (
        <div className="navbar__container">
            <div className="navbar__logo">
                <Logo />
            </div>
            <div className={`navbar__options ${menuOpen ? 'open' : ''}`}>
                {isAuthenticated ? (
                    <>
                        <button onClick={() => setModalShow(true)} className='button-sched'>Agenda tu sesión</button>
                        <a href="/appointments">Mis turnos</a>
                        <AppointmentRequestModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            service={"Depilación Definitiva".toLocaleUpperCase()}
                            type="Depilación"
                        />
                        {user.isAdmin && <a href="/admin">Admin</a>}
                        <button onClick={logOut}>Cerrar Sesión</button>
                    </>
                ) : (
                    <>
                        <a href="/auth/login">Iniciar Sesión</a>
                        <a href="/auth/register">Registrarse</a>
                    </>
                )}
            </div>
            <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <Cross /> : '☰'}
            </button>
        </div>
    );
}

export default Navbar;
