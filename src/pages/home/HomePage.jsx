import Footer from "./Footer";
import MainTitle from "./MainTitle";
import Services from "./Services";
import Navbar from "../../components/navbar";
import Location from "./Location";
import '../../styles/pages/home.css';

const HomePage = () => {
  return (
    <>
      <MainTitle />
      <Navbar />
      <Services />
      <Location />
      <Footer />
    </>
  )
}

export default HomePage
