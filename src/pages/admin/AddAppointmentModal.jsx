import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { setHours, setMinutes } from "date-fns";
import DatePicker, { registerLocale } from "react-datepicker";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { es } from "date-fns/locale";
import PhoneInput from 'react-phone-input-2';
import Warning from "../../components/icons/Warning";
import 'react-phone-input-2/lib/style.css';
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/components/addAppointmentModal.css";

registerLocale('es', es);

const AddAppointmentModal = ({ show, handleClose, handleSubmit, formData, setFormData }) => {

  const [ isTouched, setIsTouched ] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({ ...prev, date: date }));
  };

  const handleCloseModal = () => {
    setIsTouched(false);
    handleClose();
  }

  const handleSubmitModal = () => {
    setIsTouched(false);
    handleSubmit();
  }

  return (
    <Modal show={show} onHide={handleClose} className="add-appointment-modal">
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
              country={'ar'}
              value={formData.extraContact}
              onBlur={() => setIsTouched(true)}
              onChange={(value) => setFormData(prev => ({ ...prev, extraContact: value }))}
              inputProps={{
                name: 'extraContact',
                required: true,
              }}
              placeholder='Por ej: +549...'
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
                Asegúrate de ingresar el número con el código de país y un <strong>9</strong> después.<br />Ejemplo: <code>+54 9 351 1234567</code>
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
              selected={formData.date ? new Date(formData.date) : null}
              locale="es"
              onChange={handleDateChange}
              showTimeSelect
              withPortal
              dateFormat="Pp"
              timeCaption="hora"
              className="form-control datepicker-admin"
              placeholderText="Selecciona fecha y hora"
              minTime={setHours(setMinutes(new Date(), 0), 9)}
              maxTime={setHours(setMinutes(new Date(), 0), 20)}
              minDate={new Date()}
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
