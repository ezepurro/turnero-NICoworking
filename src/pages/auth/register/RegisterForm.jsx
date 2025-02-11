import PasswordInput from "../../../components/PasswordInput";
import { useAuthenticationStore } from '../../../hooks/useAuthenticationStore';
import { useForm } from "../../../hooks/useForm";
import Swal from 'sweetalert2';


const registerFormFields = {
    email: '',
    password: '',
    password2: '',
    name: '',
    contact: ''
};

const RegisterForm = () => {

    const { email, password, name, password2, contact, onInputChange } = useForm( registerFormFields );
    const { register } = useAuthenticationStore();
    

    const handleSubmit = ( event ) => {
        event.preventDefault();
        if (password !== password2) {
            Swal.fire({
                icon: 'error',
                title: 'Error al registrarse',
                text: 'Las contraseñas no coinciden',
                showConfirmButton: false, 
                timer: 1500,             
            });
            return;
        }
        register({ email, password, name, contact });
    };

    return (
        <div className="container d-flex justify-content-center">
            <div className="row">
                <div className="col-12 auth-form-container">
                    <form onSubmit={handleSubmit} className="form-control auth-form p-5">
                        <input
                            type="text"
                            placeholder="Nombre Completo"
                            className="form-control mb-3"
                            required
                            name='name'
                            value={ name }
                            onChange={ onInputChange }
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="form-control mb-3"
                            required
                            name='email'
                            value={ email }
                            onChange={ onInputChange }
                        />
                        <input
                            type="text"
                            placeholder="Celular"
                            className="form-control mb-3"
                            required
                            name='contact'
                            value={ contact }
                            onChange={ onInputChange }
                        />
                        <PasswordInput
                            name="password" 
                            placeholder="Contraseña"
                            inputId="password1"
                            className="mb-3"
                            value={ password }
                            onChange={ onInputChange }
                        />
                        <PasswordInput
                            name="password2" 
                            placeholder="Repita la contraseña"
                            inputId="password2"
                            className="mb-3"
                            value={ password2 }
                            onChange={ onInputChange }
                        />
                        <button
                            type="submit"
                            className="btn w-100"
                            id="muButton"
                        >
                            Registrarse
                        </button>
                        <p className="mt-3 text-center">
                            Tienes una cuenta? <a href="/auth/login">Iniciar sesión</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
