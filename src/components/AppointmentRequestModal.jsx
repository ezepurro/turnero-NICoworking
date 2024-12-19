import AppointmentRequestForm from './AppointmentRequestForm';
import AuthenticationRedirect from './AuthenticationRedirect';

// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import '../styles/components/appointmentRequestModal.css';


const AppointmentRequestModal = ( {service, ...props}) => {

    const user_authenticated = false;

    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {
              (user_authenticated)
                ? `Sacar turno a ${service.toLowerCase()}`
                : 'Ingresar a Nueva Identidad Coworking'
              }
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              (user_authenticated)
                ? <AppointmentRequestForm />
                : <AuthenticationRedirect />
            }
          </Modal.Body>
          <Modal.Footer>
            {/* <Button onClick={props.onHide}>Cerrar</Button> */}
          </Modal.Footer>
        </Modal>
      );
}

export default AppointmentRequestModal;
