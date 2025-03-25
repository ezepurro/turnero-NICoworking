import { useEffect, useState } from "react";
import NoPaidAppointmentWithDeleteButton from "./NoPaidAppointmentWithDeleteButton";
import NoAppointments from "../user/NoAppointments";
import Search from "../../components/icons/Search";
import { useAppointments } from "../../hooks/useAppointments";
import { useAuthenticationStore } from "../../hooks/useAuthenticationStore";
import Swal from "sweetalert2";
import Reload from "../../components/icons/Reload";

const ITEMS_PER_PAGE = 6;

const NoPaidAppointmentList = () => {
    const { getNoPaidAppointments } = useAppointments();
    const { getAllUsers } = useAuthenticationStore();
    const [appointments, setAppointments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [totalPages, setTotalPages] = useState(1);

    const fetchAppointments = async () => {
        try {
            const { appointments, totalPages } = await getNoPaidAppointments(currentPage, ITEMS_PER_PAGE);
            const users = await getAllUsers();
            
            const appointmentsWithNames = appointments.map(appointment => {
                const user = users.find(u => u.id === appointment.clientId);
                return {
                    ...appointment,
                    clientName: user ? user.name : "Desconocido"
                };
            });

            setAppointments(appointmentsWithNames);
            setTotalPages(totalPages);
        } catch (error) {
            console.error("Error al obtener los turnos no pagados:", error);
        }
    };

    useEffect(() => {
        fetchAppointments();
        Swal.fire({
            text: 'Cargando turnos no pagados...',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true
        });
    }, [currentPage]);

    const reloadData = () => {
        fetchAppointments();
        Swal.fire({
            icon: 'success',
            title: 'Información actualizada exitosamente',
            showConfirmButton: false,
            timer: 1500,
        });
    };

    const filteredAppointments = appointments.filter(appointment =>
        appointment.clientName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="no-paid-appointments">
            <div className="service-title-admin text-center">
                Turnos vencidos<button onClick={reloadData} className="btn-reload"><Reload /></button>
            </div>
            {/* <div className="search-container text-center">
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
            </div> */}

            {filteredAppointments.length > 0 ? (
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">Cliente</div>
                        <div className="col-md-2">Zonas</div>
                        <div className="col-md-3">Fecha y hora</div>
                        <div className="col-md-2">Estado</div>
                        <div className="col-md-2">Eliminar turno</div>
                        <hr />
                    </div>
                    {filteredAppointments.map((appointment) => (
                        <NoPaidAppointmentWithDeleteButton
                            key={appointment.id}
                            appointmentData={appointment}
                            refreshData={fetchAppointments}
                        />
                    ))}
                </div>
            ) : (
                <NoAppointments admin={true} />
            )}

            {filteredAppointments.length > 0 && (
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
};

export default NoPaidAppointmentList;