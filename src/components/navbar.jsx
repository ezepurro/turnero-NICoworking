import Logo from '../components/Logo';
function Navbar(){
    return 
    <div className="navbar__container">
        <div className="navbar__logo">
            <Logo/>
        </div>
        <div className="navbar__options">
            <button>
                Iniciar Sesion
            </button>
            <button>
                Registrarse
            </button>
        </div>
    </div>
}

export default Navbar;