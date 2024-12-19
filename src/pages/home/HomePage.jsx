import Footer from "./Footer"
import MainTitle from "./MainTitle"
import Services from "./Services"
import '../../styles/pages/home.css'
import Navbar from "../../components/Navbar"

const HomePage = () => {
  return (
    <>
      <MainTitle />
      <Navbar/>
      <Services />
      <Footer atp={true} />
    </>
  )
}

export default HomePage
