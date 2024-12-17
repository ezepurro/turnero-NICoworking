import '../../styles/components/footer.css'

const Footer = () => {
  return (
    <footer>
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
            <div className="footer-button">
              <button>RESERVA UN TURNO</button> 
            </div>
        </div>
        <hr />
        <div className="col-lg-12 text-center">
          <span>SolidCat 2025 © Todos los derechos reservados</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
