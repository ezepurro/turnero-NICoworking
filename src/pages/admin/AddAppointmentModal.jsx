import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { useAppointments } from "../../hooks/useAppointments";
import { useDate } from "../../hooks/useDate";
import { es } from "date-fns/locale";
import DatePicker, { registerLocale } from "react-datepicker";
import PhoneInput from "react-phone-input-2";
import Warning from "../../components/icons/Warning";
import "react-phone-input-2/lib/style.css";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/components/addAppointmentModal.css";

registerLocale("es", es);

const AddAppointmentModal = ({ show, handleClose, handleSubmit, formData, setFormData }) => {
  const [isTouched, setIsTouched] = useState(false);
  const [excludedTimes, setExcludedTimes] = useState([]);
  const [startDate, setStartDate] = useState(null)
  const [includedDates, setIncludedDates] = useState([]);
  const [timeRange, setTimeRange] = useState({ start: null, end: null });
  const { getDates } = useDate();
  const { getReservedTimes } = useAppointments();

  useEffect(() => {
    async function fetchDates() {
      const fetchedDates = await getDates();
      const filteredDates = fetchedDates.map(date => date.date);
      setIncludedDates(filteredDates);
    }
    fetchDates();
  }, [])

  const convertToDateTimes = (minutesArray, baseDate) => {
    if (!Array.isArray(minutesArray)) return [];
    return minutesArray.map(min => {
      const date = new Date(baseDate);
      date.setHours(0, 0, 0, 0);
      return new Date(date.getTime() + min * 60000);
    });
  }

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
  }

  const getMaxSelectableTime = (endTime, durationMinutes) => {
    if (!endTime || !durationMinutes) return null;
    const end = new Date(endTime);
    end.setMinutes(end.getMinutes() - durationMinutes);
    return end;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  const handleDateChange = async (date) => {
    setFormData(prev => ({ ...prev, date }));
    setStartDate(date)
    const sessionLength = (parseInt(formData.sessionZones) !== 10)
      ? parseInt(formData.sessionZones) * 5
      : 25;

    const { reservedTimes, startTime, endTime } = await getReservedTimes(date, sessionLength);
    setExcludedTimes(reservedTimes);
    setTimeRange({
      start: startTime ? new Date(startTime) : null,
      end: endTime ? new Date(endTime) : null
    });
  }

  const handleCloseModal = () => {
    setIsTouched(false);
    setStartDate(null);
    handleClose();
  }

  const handleSubmitModal = () => {
    setIsTouched(false);
    handleSubmit();
  }

  const sessionDuration = (parseInt(formData.sessionZones) !== 10)
    ? parseInt(formData.sessionZones) * 5
    : 25;

  return (
    <Modal show={show} onHide={handleCloseModal} className="add-appointment-modal">
      <Modal.Header closeButton>
        <Modal.Title>Agendar turno</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre y apellido del cliente</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre y apellido"
              name="extraName"
              value={formData.extraName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Número de contacto del cliente</Form.Label>
            <PhoneInput
              country={"ar"}
              value={formData.extraContact}
              onBlur={() => setIsTouched(true)}
              onChange={(value) => setFormData(prev => ({ ...prev, extraContact: value }))}
              inputProps={{
                name: "extraContact",
                required: true
              }}
              placeholder="Por ej: +549..."
              enableSearch={true}
              autoFormat={false}
              isValid={(value) => {
                if (!isTouched) return true;
                const phone = parsePhoneNumberFromString(value.startsWith("+") ? value : `+${value}`);
                return phone?.isValid() || false;
              }}
              containerClass="phone-input-container"
              inputClass="form-control"
              buttonClass="phone-input-flag-button"
              id="phone-input"
            />
            <small className="phone-format-helper">
              <Warning />
              <div>
                Asegúrate de ingresar el número con el código de país y un <strong>9</strong> después.<br />
                Ejemplo: <code>+54 9 351 1234567</code>
              </div>
            </small>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cantidad de zonas</Form.Label>
            <Form.Select
              name="sessionZones"
              value={formData.sessionZones}
              onChange={handleChange}
            >
              <option value="">Seleccionar</option>
              <option value={1}>1 zona</option>
              <option value={3}>3 zonas</option>
              <option value={5}>5 zonas</option>
              <option value={10}>Full-body</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3 datepicker-admin">
            <Form.Label>Fecha y hora</Form.Label>
            <br />
            <DatePicker
              selected={startDate}
              locale="es"
              onChange={handleDateChange}
              showTimeSelect
              withPortal
              dateFormat="Pp"
              timeCaption="Hora"
              className="form-control datepicker-admin"
              placeholderText="Selecciona fecha y hora"
              minDate={new Date()}
              includeDates={includedDates}
              excludeTimes={convertToDateTimes(excludedTimes, formData.date)}
              timeIntervals={sessionDuration}
              minTime={createTimeFromBase(formData.date, timeRange.start)}
              maxTime={createTimeFromBase(
                formData.date,
                getMaxSelectableTime(timeRange.end, sessionDuration)
              )}
              disabled={!formData.sessionZones}
              onKeyDown={(e) => e.preventDefault()}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Seña abonada</Form.Label>
            <Form.Control
              type="text"
              placeholder="$"
              name="extraData"
              value={formData.extraData}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cancelar
        </Button>
        <Button variant="success" onClick={handleSubmitModal}>
          Agendar turno
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddAppointmentModal;
