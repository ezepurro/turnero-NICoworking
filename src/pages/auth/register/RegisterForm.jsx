
const RegisterForm = () => {
  return (
    <div className="container d-flex justify-content-center">
        <div className="row">
            <div className="col-12 auth-form-container">
                <form className="form-control auth-form p-5">
                    <input
                        type="text"  
                        placeholder="Nombre Completo"
                        className='form-control'
                    />
                    <input
                        type="email"  
                        placeholder="Email"
                        className='form-control'
                    />
                    <input
                        type="password"  
                        placeholder="Contraseña"
                        className='form-control'
                    />
                    <input
                        type="password"  
                        placeholder="Repita la contraseña"
                        className='form-control'
                    />
                    <button
                        type="submit"
                        className='btn btn-primary w-100'
                        id='muButton'
                    >
                        Registrase
                    </button>
                    <p>Tienes una cuenta? <a href="/auth/login">Inicio de Sesíon</a></p>
                </form>
            </div>
        </div>
    </div>
  )
}

export default RegisterForm
