import Header from "../../components/Header"
import Footer from "../home/Footer"
import RegisterForm from "./register/RegisterForm"

const RegisterPage = () => {
  return (
    <>
      <Header txt="Registro" br={true}/>
      <RegisterForm />
      <Footer />
    </>
  )
}

export default RegisterPage
