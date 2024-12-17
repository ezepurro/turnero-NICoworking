import Header from "../../components/Header"
import Footer from "../home/Footer"
import LoginForm from "./login/LoginForm"

const LoginPage = () => {
  return (
    <>
      <Header txt="Incio de Sesión" br={true} />
      <LoginForm />
      <Footer />
    </>
  )
}

export default LoginPage
