import { useState } from "react";
import { convertDateToDDMMYY, convertDateToHHMM } from "../../helpers/converters";
import AppointmentWithDeleteButton from "./AppointmentWithDeleteButton";

const ITEMS_PER_PAGE = 9;

const AppointmentList = ({ waxAppointments }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    const sortedAppointments = Array.isArray(waxAppointments)
        ? waxAppointments.slice().sort((a, b) => new Date(a.start) - new Date(b.start))
        : [];

    const filteredAppointments = sortedAppointments.filter(appointment =>
        appointment.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredAppointments.length / ITEMS_PER_PAGE);

    const paginatedAppointments = filteredAppointments.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className="delete-appointment">
            <h3 className="service-title-admin text-center">Eliminar turnos</h3>

            {/* Input con icono de brújula */}
            <div className="search-container text-center">
                <div className="input-wrapper">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="currentColor" 
                        className="search-icon"
                    >
                        <path d="M10 2a8 8 0 105.29 14.71l4.71 4.7a1 1 0 001.42-1.42l-4.7-4.71A8 8 0 0010 2zm0 2a6 6 0 014.69 9.69l-.15.15-.15.14A6 6 0 1110 4z"/>
                    </svg>
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
            
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <p>Cliente y número de contacto</p>
                    </div>
                    <div className="col-3">
                        <p>Tipo de turno</p>
                    </div>
                    <div className="col-3">
                        <p>Fecha y hora</p>
                    </div>
                    <div className="col-3">
                        <p>Eliminar turno</p>
                    </div>
                    <hr />
                </div>
            </div>

            <div className="container">
                {paginatedAppointments.length > 0 ? (
                    paginatedAppointments.map((appointment) => (
                        <AppointmentWithDeleteButton 
                            key={appointment.id} 
                            id={appointment.id} 
                            name={appointment.title} 
                            date={convertDateToDDMMYY(appointment.start)}
                            hour={convertDateToHHMM(appointment.start)}
                            type={appointment.notes}
                            contact={appointment.contact}
                        />
                    ))
                ) : (
                    <p>No hay turnos disponibles.</p>
                )}
            </div>

            {/* Paginación */}
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
        </div>
    );
}

export default AppointmentList;
