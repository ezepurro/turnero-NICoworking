import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useAppointments } from '../../hooks/useAppointments';
import { useWhatsapp } from '../../hooks/useWhatsapp';
import { convertDateToDDMMYY, convertDateToHHMM } from '../../helpers/converters';
import DatePicker, { registerLocale } from 'react-datepicker';
import { es } from 'date-fns/locale';
import Swal from 'sweetalert2';
import 'react-datepicker/dist/react-datepicker.css';
import "../../styles/components/appointmentReScheduleForm.css";
import { useDate } from '../../hooks/useDate';

registerLocale('es', es);

const AppointmentReScheduleForm = ({ show, handleClose, appointment, refreshData }) => {
  const [startDate, setStartDate] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [excludedTimes, setExcludedTimes] = useState([]);
  const [includedDates, setIncludedDates] = useState([]);
  const [timeRange, setTimeRange] = useState({ start: null, end: null });
  const [isDatepickerTouched, setIsDatepickerTouched] = useState(false);

  const { updateAppointment, getReservedTimes } = useAppointments();
  const { sendRescheduleMessage } = useWhatsapp();
  const { getDates } = useDate();

  useEffect(() => {
    if (!show || !appointment) return;

    const initializeForm = async () => {
      const validDates = (await getDates()).map(d => d.date);
      setIncludedDates(validDates);

      const initialDate = new Date(appointment.start);
      setStartDate(initialDate);
      setSelectedOption(appointment.sessionZones.toString());
      setIsDatepickerTouched(false);

      await handleDateChange(initialDate, appointment.sessionZones);
    };

    initializeForm();
  }, [show, appointment]);

  const convertToDateTimes = (minutesArray, baseDate) => {
    if (!Array.isArray(minutesArray)) return [];
    return minutesArray.map(min => {
      const date = new Date(baseDate);
      date.setHours(0, 0, 0, 0);
      return new Date(date.getTime() + min * 60000);
    });
  };

  const createTimeFromBase = (baseDate, timeISOString) => {
    if (!baseDate || !timeISOString) return null;
    const base = new Date(baseDate);
    const time = new Date(timeISOString);
    const newTime = new Date(base);
    newTime.setHours(time.getUTCHours());
    newTime.setMinutes(time.getUTCMinutes());
    newTime.setSeconds(0);
    newTime.setMilliseconds(0);
    return newTime;
  };

  const getMaxSelectableTime = (endTime, durationMinutes) => {
    if (!endTime || !durationMinutes) return null;
    const end = new Date(endTime);
    end.setMinutes(end.getMinutes() - durationMinutes);
    return end;
  };

  const handleDateChange = async (date, zones = selectedOption) => {
    setStartDate(date);

    const sessionLength = (parseInt(zones) !== 10)
      ? parseInt(zones) * 5
      : 25;

    const { reservedTimes, startTime, endTime } = await getReservedTimes(date, sessionLength);

    const newStartTime = new Date(startTime);
    newStartTime.setHours(newStartTime.getHours() - 3); // UTC-3
    const newEndTime = new Date(endTime);
    newEndTime.setHours(newEndTime.getHours() - 3);

    setExcludedTimes(reservedTimes);
    setTimeRange({
      start: newStartTime,
      end: getMaxSelectableTime(newEndTime, sessionLength)
    });
  };

  const handleCloseModal = () => {
    setStartDate(null);
    setSelectedOption('');
    setIsDatepickerTouched(false);
    setExcludedTimes([]);
    setTimeRange({ start: null, end: null });
    handleClose();
  };

  const handleSaveChanges = async () => {
    if (!startDate || !selectedOption) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe completar todos los campos',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    try {
      const updatedData = {
        id: appointment.id,
        date: startDate,
        sessionZones: parseInt(selectedOption),
        userId: appointment.clientId,
      };

      const isUpdated = await updateAppointment(updatedData);
      if (isUpdated) {
        await sendRescheduleMessage({
          phoneNumber: appointment.contact,
          messageData: {
            name: appointment.title,
            type: appointment.type,
            date: convertDateToDDMMYY(startDate),
            time: convertDateToHHMM(startDate),
          },
        }, appointment.title);
      }

      refreshData();
    } catch (error) {
      console.error(error);
    }

    handleCloseModal();
  };

  const sessionDuration = (parseInt(selectedOption) !== 10)
    ? parseInt(selectedOption) * 5
    : 25;

  return (
    <Modal show={show} onHide={handleCloseModal} centered className="re-schedule-form">
      <Modal.Header closeButton>
        <Modal.Title>Editar Turno de {appointment?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Contacto</Form.Label>
            <Form.Control type="text" value={appointment?.extraContact || appointment?.contact || ''} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cantidad de Zonas</Form.Label>
            <Form.Select
              value={selectedOption}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedOption(value);
                if (startDate) handleDateChange(startDate, value);
              }}
            >
              <option value="">Seleccionar</option>
              <option value="1">1 Zona</option>
              <option value="3">3 Zonas</option>
              <option value="5">5 Zonas</option>
              <option value="10">Full-body</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Fecha y Hora</Form.Label>
            <DatePicker
              selected={startDate}
              onFocus={() => setIsDatepickerTouched(true)}
              onChange={(date) => handleDateChange(date)}
              dateFormat="Pp"
              showTimeSelect
              locale="es"
              timeCaption="Hora"
              withPortal
              minDate={new Date()}
              includeDates={includedDates}
              excludeTimes={convertToDateTimes(excludedTimes, startDate)}
              timeIntervals={sessionDuration}
              minTime={createTimeFromBase(startDate, timeRange.start)}
              maxTime={createTimeFromBase(startDate, timeRange.end)}
              className={`form-control`}
              disabled={!selectedOption}
              onKeyDown={(e) => e.preventDefault()}
              placeholderText="Selecciona una nueva fecha y hora"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleCloseModal} className="cancel-button">
          Cancelar
        </Button>
        <Button onClick={handleSaveChanges} className="save-changes-button">
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AppointmentReScheduleForm;
