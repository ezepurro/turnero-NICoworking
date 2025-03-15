import MapMarker from '../../components/icons/MapMarker';
import Whatsapp from '../../components/icons/Whatsapp';
import Email from '../../components/icons/Email';
import '../../styles/components/location.css';

const Location = () => {
  return (
    <div className="location">
      <div className="row">
        <div className="col-lg-6 col-md-12">
          <div className="subtitulo">
            <p>Nuestro Espacio:</p>
          </div>
          <ul className='info'>
            <li>
              <MapMarker color='#000' />
              <p>Crisol 240 L2 | B° Nueva Córdoba</p>
            </li>
            <li>
              <MapMarker color='#fff' />
              <p>Córdoba, Argentina</p>
            </li>
          </ul>
        </div>
        <div className="col-lg-6 col-md-12">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d851.1096312531828!2d-64.18694613034917!3d-31.429592254050856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432a28c32c9e7bf%3A0x238757e8ea005438!2sNueva%20Identidad%20Coworking%20Estetica%20Y%20Belleza!5e0!3m2!1ses-419!2sar!4v1739295491715!5m2!1ses-419!2sar&z=12" 
            width="100%" 
            height="300" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
};

export default Location;
