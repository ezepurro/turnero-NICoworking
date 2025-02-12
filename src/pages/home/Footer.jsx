import Facebook from '../../components/icons/Facebook';
import Instagram from '../../components/icons/Instagram';
import Whatsapp from '../../components/icons/Whatsapp';
import Email from '../../components/icons/Email';
import '../../styles/components/footer.css';


const Footer = () => {

  const currentYear = new Date().getFullYear();

  return (
    <footer className='py-3' >
      <div className="row">
        <div className="col-lg-6 col-sm-12 title">
            <h1>NUEVA IDENTIDAD <br/> COWORKING</h1>
        </div>
        <div className="col-lg-6 col-sm-12">
            <p>Podés contactarte con nosotros a través de los siguientes canales:</p>
            <ul>
              <li><Email /> nuevaidcoworking@gmail.com</li>
              <li><Instagram /> <a href="https://www.instagram.com/beauty.centercba/" target='_blank'>@beauty.certercba</a></li>
              <li><Facebook /> <a href="https://www.facebook.com/nuevaidentidadcoworking/" target='_blank'>Nueva Identidad Coworking</a></li>
              <li><Whatsapp /> 0351 15-858-0190</li>
            </ul>
        </div>
        <hr />
        <div className="col-lg-12 text-center">
          <span>Nueva Identidad Coworking {currentYear} © Todos los derechos reservados</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
