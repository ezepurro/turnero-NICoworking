import '../../styles/components/location.css';

const Location = () => {
  return (
    <div className="location">
      <div className="row">
        <div className="col-lg-6 col-md-12">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d851.1096312531828!2d-64.18694613034917!3d-31.429592254050856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432a28c32c9e7bf%3A0x238757e8ea005438!2sNueva%20Identidad%20Coworking%20Estetica%20Y%20Belleza!5e0!3m2!1ses-419!2sar!4v1739295491715!5m2!1ses-419!2sar&z=12" 
            width="100%" 
            height="400" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="subtitulo">
            <p>Nuestro local</p>
          </div>
          <ul className='info'>
            <li>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 0C5.24 0 3 2.24 3 5C3 8.25 8 15 8 15C8 15 13 8.25 13 5C13 2.24 10.76 0 8 0ZM8 6.5C7.17 6.5 6.5 5.83 6.5 5C6.5 4.17 7.17 3.5 8 3.5C8.83 3.5 9.5 4.17 9.5 5C9.5 5.83 8.83 6.5 8 6.5Z"/>
              </svg>
              <p>Crisol 240, Córdoba, Argentina</p>
            </li>
            <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.5 24C8.73 24 0 15.27 0 4.5C0 3.12 1.12 2 2.5 2H6.29C7.21 2 8.04 2.54 8.36 3.39L10.26 8.39C10.56 9.18 10.3 10.08 9.63 10.55L7.21 12.26C8.88 15.34 11.66 18.12 14.74 19.79L16.45 17.37C16.92 16.7 17.82 16.44 18.61 16.74L23.61 18.64C24.46 18.96 25 19.79 25 20.71V24.5C25 25.88 23.88 27 22.5 27H19.5Z"/>
                </svg>
              <p>0351 15-858-0190 (lunes a viernes de 9:00 a 18:00)</p>
            </li>
            <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 6L12 11L4 6H20ZM4 18V8L12 13L20 8V18H4Z"/>
                </svg>
                <p>nuevaidcoworking@gmail.com</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Location;
