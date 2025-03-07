import { socialMedia } from '../data/socialMedia';
import '../styles/components/footer.css';


const Footer = () => {

  const currentYear = new Date().getFullYear();

  return (
    <footer className='py-3' >
      <div className="row">
        <div className="col-lg-6 col-sm-12 title">
            <h1>Beauty Bloom</h1>
        </div>
        <div className="col-lg-6 col-sm-12">
            <p>Podés contactarte con nosotros a través de los siguientes canales:</p>
            <ul>
              {
                socialMedia.map((social, index) => (
                  <li key={index}>
                    <a href={social.url} target='_blank' rel='noreferrer'>
                      <social.icon /> {social.text}
                    </a>
                  </li>
                ))
              }
            </ul>
        </div>
        <hr />
        <div className="col-lg-12 text-center">
          <span>Beauty Bloom {currentYear} © Todos los derechos reservados</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
