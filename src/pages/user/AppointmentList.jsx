import { useState } from 'react';
import { convertDateToDDMMYY, convertDateToHHMM } from '../../helpers/converters';
import Appointment from './Appointment';
import NoAppointments from './NoAppointments';
import '../../styles/components/appointmentList.css';

const AppointmentList = ({ name, appointments }) => {
  const [selectedOption, setSelectedOption] = useState(true);

  const futureAppointments = appointments.filter(
    (appointment) => new Date(appointment.date) > new Date()
  );

  const displayedAppointments = selectedOption ? futureAppointments : appointments;

  const sortedAppointments = [...displayedAppointments].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 appointments-container">
          <h3 className="text-center">
            {selectedOption ? "Mis próximos turnos" : "Mi historial de turnos"}
          </h3>
          <h5 className="text-center">{name}</h5>

          {sortedAppointments.length !== 0 ? (
            sortedAppointments.map((appointment) => (
              <Appointment
                key={appointment.id}
                service={appointment.type}
                date={convertDateToDDMMYY(appointment.date)}
                hour={convertDateToHHMM(appointment.date)}
                status={appointment.status}
              />
            ))
          ) : (
            <NoAppointments admin={false} />
          )}

          <button
            onClick={() => setSelectedOption(!selectedOption)}
            className='btn'
          >
            {selectedOption ? "Ver historial de turnos" : "Ver próximos turnos"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentList;
