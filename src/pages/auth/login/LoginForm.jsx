import { useForm } from '../../../hooks/useForm';
import { useAuthenticationStore } from '../../../hooks/useAuthenticationStore';
import { validateLoginForm } from '../../../helpers/validators';
import PasswordInput from '../../../components/PasswordInput';
import Swal from 'sweetalert2';
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

        const isValid = validateLoginForm(email, password);
        if (!isValid.valid) {
            Swal.fire({
                icon: 'error',
                title: 'Error al ingresar',
                text: isValid.message,
                showConfirmButton: false, 
                timer: 1500,             
            });
            return;
        }

        logIn({ email, password });
    }

    return (
        <div className="container d-flex justify-content-center">
            <div className="row">
                <div className="col-12 auth-form-container">
                    <form className="form-control auth-form p-5" onSubmit={ loginSubmit }>
                        <div className="form-title">
                            <p>Ingresar a</p>
                            <span>Beauty Bloom</span>
                        </div>
                        <input
                            type="email"  
                            placeholder="Email"
                            className='form-control'
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
                            className='btn w-100'
                            id='muButton'
                        >
                            Inciar Sesión
                        </button>
                        <p className='text-center'>No tienes cuenta? <a href="/auth/register">Registro</a></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginForm
