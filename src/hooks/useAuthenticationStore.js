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

            console.log({data});
        } catch (error) {
            const data = error.response.data;
            const errorMessage =
                data.msg ||
                data.errors?.email?.msg || 
                data.errors?.password?.msg || 
                'Error desconocido';
            Swal.fire('Error al iniciar sesión',  errorMessage, 'error');
        }
    }

    const logOut = () => {
        onLogout();
        clearErrorMessage();
    }

    return {
        logIn,
        logOut
    }
}