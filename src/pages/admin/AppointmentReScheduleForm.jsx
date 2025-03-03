import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { setHours, setMinutes } from 'date-fns';
import { useAppointments } from '../../hooks/useAppointments';
import Swal from 'sweetalert2';
import 'react-datepicker/dist/react-datepicker.css';

const AppointmentReScheduleForm = ({ show, handleClose, appointment }) => {
    const [startDate, setStartDate] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const { updateAppointment, getReservedTimes } = useAppointments();
    const [excludedTimes, setExcludedTimes] = useState([]);

    useEffect(() => {
        if (appointment) {
            setStartDate(new Date(appointment.date));
            setSelectedOption(appointment.sessionZones.toString());
        }
    }, [appointment]);

    const handleDateChange = async (date) => {
        setStartDate(date);
        const sessionLength = (parseInt(selectedOption) !== 10) ? parseInt(selectedOption) * 5 : 25;
        const reservedTimes = await getReservedTimes(date, sessionLength);
        setExcludedTimes(reservedTimes);
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

        await updateAppointment(appointment.id, {
            date: startDate,
            sessionZones: parseInt(selectedOption),
            userId: appointment.clientId
        });

        

        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} aria-hidden={!show} centered className='re-schedule-form'>
            <Modal.Header closeButton>
                <Modal.Title>Editar Turno de {appointment.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Contacto</Form.Label>
                        <Form.Control type="text" value={appointment?.contact || ''} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Cantidad de Zonas</Form.Label>
                        <Form.Select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
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
                            onChange={handleDateChange}
                            dateFormat="Pp"
                            showTimeSelect
                            locale="es"
                            timeCaption="Hora"
                            timeIntervals={parseInt(selectedOption) * 5 || 5}
                            minDate={new Date()}
                            minTime={setHours(setMinutes(new Date(), 0), 9)}
                            maxTime={setHours(setMinutes(new Date(), 0), 20)}
                            excludeTimes={excludedTimes}
                            className="form-control"
                            withPortal
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose} className='cancel-button'>Cancelar</Button>
                <Button onClick={handleSaveChanges} className='save-changes-button'>Guardar Cambios</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AppointmentReScheduleForm;
