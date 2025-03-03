import { useEffect } from "react";
import handleApi from "./api/handleApi";
import AppRouter from "./router/AppRouter";
import useAuthStore from "./store/useAuthStore";


const AppointmentScheduler = () => {

  const { onLogin, onLogout, isAuthenticated } = useAuthStore();

  const renewToken = async () => {
    try {
        const { data } = await handleApi.get('/auth/renew');
        if (data.ok) {
          onLogin({ uid: data.uid, name: data.name, isAdmin: data.isAdmin });
        }
    } catch (error) {
      onLogout();
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      renewToken();
    }
  }, [])
  

  return (
    <AppRouter />
  )
}

export default AppointmentScheduler;
