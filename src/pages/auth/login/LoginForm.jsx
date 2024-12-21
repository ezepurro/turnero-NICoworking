import PasswordInput from '../../../components/PasswordInput';
import useAuthStore from '../../../store/useAuthStore';
import '../../../styles/components/loginRegisterForm.css';


const LoginForm = () => {

    const { setAuthenticationState } = useAuthStore();

    const logIn = () => {
        // login
        setAuthenticationState(true);
    }

    return (
    <div className="container d-flex justify-content-center">
        <div className="row">
            <div className="col-12 auth-form-container">
                <form className="form-control auth-form p-5">
                    <input
                        type="email"  
                        placeholder="Email"
                        className='form-control'
                    />
                    <PasswordInput placeholder="Contraseña" inputId="loginPassword" />
                    <button
                        type="submit"
                        className='btn btn-primary w-100'
                        id='muButton'
                        onClick={ logIn }
                    >
                        Inciar Sesión
                    </button>
                    <p>No tienes cuenta? <a href="/auth/register">Registro</a></p>
                </form>
            </div>
        </div>
    </div>
    )
}

export default LoginForm
