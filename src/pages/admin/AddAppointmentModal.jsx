import { Modal, Button, Form } from "react-bootstrap";
import Warning from "../../components/icons/Warning";
import "../../styles/components/addAppointmentModal.css";

const AddAppointmentModal = ({ show, handleClose, handleSubmit, formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Modal show={show} onHide={handleClose} className="add-appointment-modal">
      <Modal.Header closeButton>
        <Modal.Title>Añadir nuevo turno</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre y apellido del cliente</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Número de contacto del cliente</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: +54 351..."
              name="contact"
              value={formData.contact}
              onChange={handleChange}
            />
            <small className="phone-format-helper">
                <Warning />
                <div>
                    Asegúrate de ingresar tu número con el código de país y un <strong>9</strong> después.<br />Ejemplo: <code>+54 9 351 1234567</code>
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
              <option value="1">1 zona</option>
              <option value="3">3 zonas</option>
              <option value="5">5 zonas</option>
              <option value="10">Full-body</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Fecha y hora</Form.Label>
            <Form.Control
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Seña abonada</Form.Label>
            <Form.Control
              type="text"
              placeholder="$"
              name="extra"
              value={formData.extra}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Guardar turno
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddAppointmentModal;
