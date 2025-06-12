import { socialMedia } from '../data/socialMedia';
import '../styles/components/footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='py-3'>
      <div className="row">
        <div className="col-lg-6 col-sm-12 title">
          <h1>Beauty Bloom</h1>
        </div>
        <div className="col-lg-6 col-sm-12">
          <p>Podés contactarte con nosotros a través de los siguientes canales:</p>
          <ul>
            {socialMedia.map((social, index) => (
              <li key={index} className="social-item">
                <a href={social.url} target='_blank' rel='noreferrer'>
                  <social.icon className="social-icon" /> <span>{social.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <hr />
        <div className="text-center">
          <span>Beauty Bloom {currentYear} © Todos los derechos reservados</span>
          <div className='solidcat-signature'>
            <a href="https://solidcat.dev" target='_blank'>
              <img src="/solidcat-box2.svg" alt="SolidCatBrand" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
