import handleApi from "../api/handleApi";
import useAuthStore from "../store/useAuthStore";



export const useAuthenticationStore = () => {

    const { onLogin, onLogout, clearErrorMessage } = useAuthStore();

    const logIn = async ({ email, password }) => {
        try {
            const { data } = await handleApi.post('/auth/login', { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            onLogin(data.user);

            console.log({data});
        } catch (error) {
            console.log(error.response.data);
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