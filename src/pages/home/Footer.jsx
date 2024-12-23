import '../../styles/components/footer.css';


const Footer = ({ atp }) => {
  return (
    <footer className='py-3' >
      <div className="row">
        <div className="col-lg-6 col-sm-12 title">
            <h1>NUEVA IDENTIDAD <br/> COWORKING</h1>
        </div>
        <div className="col-lg-6 col-sm-12">
            <p>Podés contactarte con nosotros a través de los siguientes canales:</p>
            <ul>
              <li>EMAIL</li>
              <li>INSTAGRAM</li>
              <li>FACEBOOK</li>
              <li>WHATSAPP</li>
            </ul>
            {
              (atp)
                ? <div className="footer-button"><a href='#services'>RESERVA UN TURNO</a></div>
                : null
            }
        </div>
        <hr />
        <div className="col-lg-12 text-center">
          <span>Nueva Identidad Coworking 2022 © Todos los derechos reservados</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
