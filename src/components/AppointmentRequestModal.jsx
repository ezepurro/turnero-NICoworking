import AppointmentRequestForm from './AppointmentRequestForm';
import AuthenticationRedirect from './AuthenticationRedirect';
import Modal from 'react-bootstrap/Modal';
import '../styles/components/appointmentRequestModal.css';
import useAuthStore from '../store/useAuthStore';


const AppointmentRequestModal = ( {service, ...props}) => {

    const { isAuthenticated } = useAuthStore();

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
              (isAuthenticated)
                ? `Sacar turno a ${service.toLowerCase()}`
                : 'Ingresar a Nueva Identidad Coworking'
              }
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              ( isAuthenticated )
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
