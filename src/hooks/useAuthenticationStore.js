import handleApi from "../api/handleApi";
import useAuthStore from "../store/useAuthStore";
import Swal from 'sweetalert2';


export const useAuthenticationStore = () => {

    const { onLogin, onLogout, clearErrorMessage } = useAuthStore();

    const logIn = async ({ email, password }) => {
        try {
            const { data } = await handleApi.post('/auth/login', { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            const user = {uid: data.uid, name: data.name, isAdmin: data.isAdmin};
            onLogin(user);
            Swal.fire({
                icon: 'success',
                title: 'Inicio de sesión exitoso',
                text: `Bienvenida de vuelta, ${user.name}!`,
                showConfirmButton: false, 
                timer: 1500,             
            });
        } catch (error) {
            const data = error.response.data;
            const errorMessage =
                data.msg ||
                data.errors?.email?.msg || 
                data.errors?.password?.msg || 
                'Error desconocido';
            Swal.fire({
                icon: 'error',
                title: 'Error al iniciar sesión',
                text: errorMessage,
                showConfirmButton: false, 
                timer: 1500,             
            });
        }
    }

    const logOut = () => {
        onLogout();
        clearErrorMessage();
        // clear local storage
    }

    const register = async ({ email, password, name, contact }) => {
        try {
            const { data } = await handleApi.post('/auth/register', { email, password, name, contact });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            const user = {uid: data.uid, name: data.name, isAdmin: data.isAdmin};
            onLogin(user);
            Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                text: `Bienvenida ${user.name}!`,
                showConfirmButton: false, 
                timer: 1500,             
            });
        } catch (error) {
            const data = error.response.data;
            const errorMessage =
                data.msg ||
                data.errors?.email?.msg || 
                data.errors?.password?.msg || 
                data.errors?.name?.msg || 
                'Error desconocido';
            Swal.fire({
                icon: 'error',
                title: 'Error al registrarse',
                text: errorMessage,
                showConfirmButton: false, 
                timer: 1500,             
            });
        }
    }

    return {
        logIn,
        logOut,
        register
    }
}