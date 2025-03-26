import Navbar from "../../components/Navbar.jsx";
import MainTitle from "./MainTitle";
import Promos from "./Promos";
import Services from "./Services";
import Location from "./Location";
import Footer from "../../components/Footer";
import '../../styles/pages/home.css';

const HomePage = () => {
  return (
    <>
      <MainTitle />
      <Services />
      <Promos />
      <Navbar />
      <Location />
      <Footer />
    </>
  )
}

export default HomePage
