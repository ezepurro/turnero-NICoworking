import { useEffect, useState } from "react";
import { useAuthenticationStore } from "../../hooks/useAuthenticationStore";
import { useAppointments } from "../../hooks/useAppointments";
import { addMinutes } from "date-fns";
import AppointmentWithDeleteButton from "./AppointmentWithDeleteButton";
import AddAppointmentModal from "./AddAppointmentModal";
import NoAppointments from "../user/NoAppointments";
import Search from "../../components/icons/Search";
import Reload from "../../components/icons/Reload";
import Swal from "sweetalert2";
import useAuthStore from "../../store/useAuthStore";

const ITEMS_PER_PAGE = 6;

const AppointmentList = () => {
  const { getAllAppointments, addAppointmentByAdmin } = useAppointments();
  const { user } = useAuthStore();
  const { getAllUsers } = useAuthenticationStore();
  const [ appointments, setAppointments ] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ searchTerm, setSearchTerm ] = useState("");
  const [ loading, setLoading ] = useState(true);
  const [ showModal, setShowModal ] = useState(false);
  const [ formData, setFormData ] = useState({
    extraName: "",
    extraContact: "",
    sessionZones: 1,
    extraData: "",
    date: "",
    userId: user.uid,
  });

  const refreshData = async () => {
    try {
      const fetchedAppointments = await getAllAppointments();
      const users = await getAllUsers();
      const appointmentsWithNames = fetchedAppointments.map((appointment) => {
        const user = users.find((u) => u.id === appointment.clientId);
        return {
          id: appointment.id,
          title: user?.name || "Sin nombre",
          start: new Date(appointment.date),
          end: addMinutes(new Date(appointment.date), appointment.sessionLength),
          contact: appointment.contact,
          sessionZones: appointment.sessionZones,
          status: appointment.status,
          clientId: appointment.clientId,
          type: appointment.type,
          isoDate: appointment.date,
          extraName: appointment.extraName,
          extraContact: appointment.extraContact,
          extraData: appointment.extraData,
        };
      });
      setAppointments(appointmentsWithNames);
      setLoading(false);
    } catch (error) {
      console.error("Error al recargar los datos:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const reloadData = () => {
    refreshData();
    Swal.fire({
      icon: "success",
      title: "Información actualizada exitosamente",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleAddAppointment = () => setShowModal(true);

  const handleModalClose = () => {
    setShowModal(false);
    setFormData({
      extraName: "",
      extraContact: "",
      sessionZones: 1,
      extraData: "",
      date: "",
      userId: user.uid
    });
  };

  const handleModalSubmit = () => {
    if (!formData.extraName || !formData.extraContact || !formData.sessionZones || !formData.date || !formData.extraData) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, completa todos los campos",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    console.log("Turno a guardar:", formData);
    addAppointmentByAdmin(formData)
    Swal.fire({
      icon: "success",
      title: "Turno creado correctamente",
      timer: 1500,
      showConfirmButton: false,
    });
    handleModalClose();
    refreshData();
  };

  const sortedAppointments = [...appointments].sort((a, b) => new Date(a.start) - new Date(b.start));
  const filteredAppointments = sortedAppointments.filter((appointment) =>
    appointment.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredAppointments.length / ITEMS_PER_PAGE);
  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const hasAppointments = paginatedAppointments.length > 0;

  return (
    <div className="delete-appointment">
      <div className="service-title-admin d-flex justify-content-between align-items-center mb-3 mx-5">
        <h2 className="">Administrar turnos</h2>
        <div className="d-flex gap-2">
          <button onClick={handleAddAppointment} className="btn re-schedule">
            Agendar turno
          </button>
          <button onClick={reloadData} className="btn-reload">
            <Reload />
          </button>
        </div>
      </div>

      <AddAppointmentModal
        show={showModal}
        handleClose={handleModalClose}
        handleSubmit={handleModalSubmit}
        formData={formData}
        setFormData={setFormData}
      />

      <div className="search-container text-center">
        <div className="input-wrapper">
          <Search classname="search-icon" color="currentColor" />
          <input
            type="text"
            placeholder="Buscar por cliente..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="search-input"
          />
        </div>
      </div>

      {loading ? (
        <div className="loading-message">
          <div className="spinner"></div>
          <h2>Cargando turnos...</h2>
        </div>
      ) : (
        <>
          {hasAppointments && (
            <div className="container">
              <div className="row">
                <div className="col-md-2"><p>Cliente y número de contacto</p></div>
                <div className="col-md-2"><p>Tipo de turno</p></div>
                <div className="col-md-2"><p>Fecha y hora</p></div>
                <div className="col-md-2"><p>Estado del turno</p></div>
                <div className="col-md-2"><p>Gestionar turno</p></div>
                <div className="col-md-2"><p>Eliminar turno</p></div>
                <hr />
              </div>
            </div>
          )}

          <div className="container">
            {hasAppointments ? (
              paginatedAppointments.map((appointment) => (
                <AppointmentWithDeleteButton
                  key={appointment.id}
                  appointmentData={appointment}
                  refreshData={refreshData}
                />
              ))
            ) : (
              <>
                <br />
                <NoAppointments admin={true} />
              </>
            )}
          </div>

          {hasAppointments && (
            <div className="pagination-buttons text-center">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="btn btn-pag"
              >
                Anterior
              </button>
              <span>Página {currentPage} de {totalPages}</span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="btn btn-pag"
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AppointmentList;
