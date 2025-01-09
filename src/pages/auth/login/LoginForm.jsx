import PasswordInput from '../../../components/PasswordInput';
import { useAuthenticationStore } from '../../../hooks/useAuthenticationStore';
import { useForm } from '../../../hooks/useForm';
import '../../../styles/components/loginRegisterForm.css';

const loginFormFields = {
    email: '',
    password: '',
}


const LoginForm = () => {

    const { logIn } = useAuthenticationStore();
    const { email, password, onInputChange } = useForm( loginFormFields ); 

    const loginSubmit = ( event ) => {
        event.preventDefault();
        logIn({ email, password });
    }

    return (
        <div className="container d-flex justify-content-center">
            <div className="row">
                <div className="col-12 auth-form-container">
                    <form className="form-control auth-form p-5" onSubmit={ loginSubmit }>
                        <input
                            type="email"  
                            placeholder="Email"
                            className='form-control'
                            required
                            name='email'
                            value={ email }
                            onChange={ onInputChange }
                        />
                        <PasswordInput
                            placeholder="Contraseña"
                            inputId="loginPassword"
                            name='password'
                            value={ password }
                            onChange={ onInputChange } 
                        />
                        <button
                            type="submit"
                            className='btn btn-primary w-100'
                            id='muButton'
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
