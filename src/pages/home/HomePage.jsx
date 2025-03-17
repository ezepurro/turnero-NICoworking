import Footer from "../../components/Footer";
import MainTitle from "./MainTitle";
import Services from "./Services";
import Navbar from "../../components/Navbar";
import Location from "./Location";
import '../../styles/pages/home.css';
import Promos from "./Promos";

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
