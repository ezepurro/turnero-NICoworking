import PasswordInput from "../../../components/PasswordInput";

const RegisterForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const password1 = formData.get('password1');
        const password2 = formData.get('password2');

        // Validación básica
        if (password1 !== password2) {
            alert('Las contraseñas no coinciden');
            return;
        }

        const userData = {
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            password: password1,
            redirect: false,
        };

        fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((errorData) => {
                        throw new Error(errorData.message || 'Error en el registro');
                    });
                }
                return response.json();
            })
            .then((data) => {
                console.log('Successfully registered:', data);
                alert('Registro exitoso');
            })
            .catch((error) => {
                console.error('Error al procesar el registro:', error);
                alert(`Error: ${error.message}`);
            });
    };

    return (
        <div className="container d-flex justify-content-center">
            <div className="row">
                <div className="col-12 auth-form-container">
                    <form onSubmit={handleSubmit} className="form-control auth-form p-5">
                        <input
                            type="text"
                            name="fullName" // Agregado
                            placeholder="Nombre Completo"
                            className="form-control mb-3"
                            required
                        />
                        <input
                            type="email"
                            name="email" // Agregado
                            placeholder="Email"
                            className="form-control mb-3"
                            required
                        />
                        <PasswordInput
                            name="password1" // Asegúrate de que el componente acepte `name`
                            placeholder="Contraseña"
                            inputId="password1"
                            className="mb-3"
                        />
                        <PasswordInput
                            name="password2" // Asegúrate de que el componente acepte `name`
                            placeholder="Repita la contraseña"
                            inputId="password2"
                            className="mb-3"
                        />
                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            id="muButton"
                        >
                            Registrarse
                        </button>
                        <p className="mt-3 text-center">
                            ¿Tienes una cuenta? <a href="/auth/login">Iniciar sesión</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
