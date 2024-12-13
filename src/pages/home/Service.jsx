
const Service = ({image_url, service, service_description}) => {
  return (
    <div className="service">
        <div className="image-content">
            <img src={image_url} />
        </div>
        <div className="service-overlay">
            <div className="info">
                <h2>{service}</h2>
                <p>{service_description}</p>
                <button>RESERVAR TURNO</button>
            </div>
        </div>
    </div>
  )
}

export default Service
