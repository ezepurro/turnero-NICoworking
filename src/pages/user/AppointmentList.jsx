import { useState } from 'react';
import { convertDateToDDMMYY, convertDateToHHMM } from '../../helpers/converters';
import Appointment from './Appointment';
import NoAppointments from './NoAppointments';
import '../../styles/components/appointmentList.css';
import '../../styles/components/loadingMessage.css';

const AppointmentList = ({ name, appointments, loading }) => {
  const [ selectedOption, setSelectedOption ] = useState(true);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const futureAppointments = appointments.filter(
    (appointment) => new Date(appointment.date) >= today
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

          {loading ? (
            <div className="loading-message">
              <div className="spinner"></div>
              <h2>Cargando turnos...</h2>
            </div>
          ) : (
            <>
              {sortedAppointments.length !== 0 ? (
                sortedAppointments.map((appointment) => {
                  if (appointment.extraName || appointment.extraContact || appointment.extraData) return null;
                  return (
                    <Appointment
                      key={appointment.id}
                      service={appointment.type}
                      date={convertDateToDDMMYY(appointment.date)}
                      hour={convertDateToHHMM(appointment.date)}
                      status={appointment.status}
                    />
                  );
                })
              ) : (
                <NoAppointments admin={false} />
              )}
            </>
          )}
          {!loading && (
            <button
              onClick={() => setSelectedOption(!selectedOption)}
              className="btn"
            >
              {selectedOption ? "Ver historial de turnos" : "Ver próximos turnos"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentList;
