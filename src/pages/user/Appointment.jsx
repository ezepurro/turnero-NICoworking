
const Appointment = ({ service, date, hour }) => {
  return (
    <div className="container appoinment">
        <div className="row">
            <div className="col-4">
                <h4><b>{service}</b></h4>
            </div>
            <div className="col-4">
                <p>{date}</p>
            </div>
            <div className="col-4">
                <p>{hour} HS</p>
            </div>
            <hr />
        </div>
    </div>
  )
}

export default Appointment
