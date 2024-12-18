import AppointmentRequestForm from './AppointmentRequestForm';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import '../styles/components/appointmentRequestModal.css';


const AppointmentRequestModal = ( {service, ...props}) => {
    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Sacar turno a {service.toLowerCase()}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AppointmentRequestForm />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Cerrar</Button>
          </Modal.Footer>
        </Modal>
      );
}

export default AppointmentRequestModal;
