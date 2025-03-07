
const Appointment = ({ service, date, hour, status }) => {
    return (
    <div className="container appoinment">
        <div className="row">
            <div className="col-3">
                <h4><b>{service}</b></h4>
            </div>
            <div className="col-3">
                <p>{date}</p>
            </div>
            <div className="col-3">
                <p>{hour} HS</p>
            </div>
            <div className="col-3">
                <p className={(status === "paid" ? "paid" : "pending")}>{(status == "paid" ? "Seña pagada" : "Sin seña")}</p>
            </div>
            <hr />
        </div>
    </div>
    )
}

export default Appointment
