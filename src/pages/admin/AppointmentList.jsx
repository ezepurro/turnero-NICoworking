import { useEffect, useState } from "react";
import AppointmentWithDeleteButton from "./AppointmentWithDeleteButton";
import NoAppointments from "../user/NoAppointments";
import Search from "../../components/icons/Search";
import { useAppointments } from "../../hooks/useAppointments";
import { useAuthenticationStore } from "../../hooks/useAuthenticationStore";
import { addMinutes } from "date-fns";
import Swal from "sweetalert2";
import Reload from "../../components/icons/Reload";

const ITEMS_PER_PAGE = 6;

const AppointmentList = () => {

    const { getAllAppointments } = useAppointments();
    const { getAllUsers } = useAuthenticationStore();
    const [appointments, setAppointments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    const refreshData = async () => {
      try {
        const fetchedAppointments = await getAllAppointments();
        const users = await getAllUsers();
        const appointmentsWithNames = fetchedAppointments.map(appointment => {
          const user = users.find(u => u.id === appointment.clientId);
          return {
            id: appointment.id,
            title: user.name,
            start: new Date(appointment.date),
            end: addMinutes(new Date(appointment.date), appointment.sessionLength),
            contact: appointment.contact,
            sessionZones: appointment.sessionZones,
            status: appointment.status,
            clientId: appointment.clientId,
            type: appointment.type,
            isoDate: appointment.date,
          };
        });
        setAppointments(appointmentsWithNames);
      } catch (error) {
        console.error("Error al recargar los datos:", error);
      }
    };

    useEffect(() => {
      refreshData();
      Swal.fire({
        text: 'Cargando la información necesaria',
        showConfirmButton: false, 
        timer: 1500,         
        timerProgressBar: true    
      });
    }, []); 

    const reloadData = () => {
      refreshData();
      Swal.fire({
        icon: 'success',
        title: 'Información actualizada exitosamente',
        showConfirmButton: false, 
        timer: 1500,   
      });
    }

    const sortedAppointments = Array.isArray(appointments)
        ? [...appointments].sort((a, b) => new Date(a.start) - new Date(b.start))
        : [];

    const filteredAppointments = sortedAppointments.filter(appointment =>
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
            <div className="service-title-admin text-center">
                Administrar turnos<button onClick={reloadData} className="btn-reload"><Reload /></button>
            </div>
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

            {hasAppointments && (
                <div className="container">
                    <div className="row">
                        <div className="col-md-2"><p>Cliente y número de contacto</p></div>
                        <div className="col-md-2"><p>Tipo de turno</p></div>
                        <div className="col-md-2"><p>Fecha y hora</p></div>
                        <div className="col-md-2"><p>Estado del turno</p></div>
                        <div className="col-md-2"><p>Eliminar turno</p></div>
                        <div className="col-md-2"><p>Reagendar turno</p></div>
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
                    <span> Página {currentPage} de {totalPages} </span>
                    <button 
                        onClick={() => setCurrentPage(currentPage + 1)} 
                        disabled={currentPage === totalPages}
                        className="btn btn-pag"
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </div>
    );
}

export default AppointmentList;