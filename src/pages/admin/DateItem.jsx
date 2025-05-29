import { useState } from "react";
import { useDate } from "../../hooks/useDate";
import { Button, Modal, Form } from "react-bootstrap";
import { convertDateToHHMM } from "../../helpers/converters";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateItem = ({ date, dateObj, refreshData }) => {

  const { removeDate, changeDateTime } = useDate();
  const [ showModal, setShowModal ] = useState(false);
  const [ startTime, setStartTime ] = useState(new Date(dateObj.startTime));
  const [ endTime, setEndTime ] = useState(new Date(dateObj.endTime));

  const handleDelete = async () => {
    await removeDate(dateObj.id);
    refreshData();
  };

  const handleAdjustDate = () => {
    setShowModal(true);
  };

  const handleSaveChanges = async () => {
    const newStartISO = startTime.toISOString();
    const newEndISO = endTime.toISOString();
    await changeDateTime(dateObj.id, newStartISO, newEndISO);
    refreshData();
    setShowModal(false);
  };

  return (
    <>
      <div className="row date-item">
        <div className="col-2">{date}</div>
        <div className="col-2">{convertDateToHHMM(dateObj.startTime)} HS</div>
        <div className="col-2">{convertDateToHHMM(dateObj.endTime)} HS</div>
        <div className="col-3">
          <button className="btn change-button" onClick={handleAdjustDate}>
            Modificar
          </button>
        </div>
        <div className="col-3">
          <button className="delete-button btn" onClick={handleDelete}>
            Deshabilitar
          </button>
        </div>
      </div>
      <hr />

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modificar horario del {date}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="text-center">
              <Form.Label>Hora de inicio</Form.Label>
              <br />
              <DatePicker
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Hora"
                dateFormat="HH:mm"
                className="form-control"
              />
            </Form.Group>
            <Form.Group className="mt-3 mb-5 text-center">
              <Form.Label>Hora de fin</Form.Label>
              <br />
              <DatePicker
                selected={endTime}
                onChange={(date) => setEndTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Hora"
                dateFormat="HH:mm"
                className="form-control"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="success" onClick={handleSaveChanges}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DateItem;
