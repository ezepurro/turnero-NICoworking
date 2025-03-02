import { useEffect } from "react";
import handleApi from "./api/handleApi";
import { useAuthenticationStore } from "./hooks/useAuthenticationStore";
import AppRouter from "./router/AppRouter";


const AppointmentScheduler = () => {

  const { onLogin } = useAuthenticationStore();

  const renewToken = async () => {
    try {
        const { data } = await handleApi.get('/auth/renew');
        if (data.ok) {
            onLogin({ uid: data.uid, name: data.name, isAdmin: data.isAdmin });
        }
    } catch (error) {
        console.error("Error renovando token", error);
    }
  }

  useEffect(() => {
    renewToken();
  }, [])
  

  return (
    <AppRouter />
  )
}

export default AppointmentScheduler;
