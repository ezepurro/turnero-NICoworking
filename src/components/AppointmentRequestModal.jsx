import AppointmentRequestForm from './AppointmentRequestForm';
import AuthenticationRedirect from './AuthenticationRedirect';
import Modal from 'react-bootstrap/Modal';
import useAuthStore from '../store/useAuthStore';
import '../styles/components/appointmentRequestModal.css';


const AppointmentRequestModal = ( {service, type, ...props}) => {
  
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
                ? <AppointmentRequestForm type={type} />
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
