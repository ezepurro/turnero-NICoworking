

const Appointment = ({ service, date, hour, status }) => {
    return (
        <div className="container">
            <div className="row align-items-center">
                <div className="col-md-3">
                    <h4><b>{service}</b></h4>
                </div>
                <div className="col-md-3">
                    <p>{date}</p>
                </div>
                <div className="col-md-3">
                    <p>{hour} HS</p>
                </div>
                <div className="col-md-3">
                    <p className={status === "paid" ? "paid" : "pending"}>
                        {status === "paid" ? "Seña pagada ($7000)" : "Sin seña"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Appointment;
