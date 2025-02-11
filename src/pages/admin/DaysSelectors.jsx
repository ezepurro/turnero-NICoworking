import { useState } from "react";
import { convertDateToDDMMYY } from "../../helpers/converters";
import DaySelectorComponent from "./DaySelectorComponent";
import useCalendarSettingsStore from "../../store/useCalendarSettingsStore";

const DaysSelectors = () => {
  const { calendarDays } = useCalendarSettingsStore();
  const currentDate = new Date();
  const itemsPerPage = 10; 

  const futureDates = calendarDays.waxDays
    .filter((calendarDay) => new Date(calendarDay) > currentDate)
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(futureDates.length / itemsPerPage);

  const paginatedDates = futureDates.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="dayselectors">
      <h3 className="service-title-admin text-center">Habilitación de días</h3>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <p className="text-center">Habilitador de días</p>
            <DaySelectorComponent />
          </div>
          <div className="col-lg-6 col-md-12">
            <p className="text-center">Próximos días habilitados</p>
            <ul className="text-center">
              {paginatedDates.map((calendarDay, index) => (
                <li key={index}>
                  {convertDateToDDMMYY(calendarDay)}
                  <hr />
                </li>
              ))}
            </ul>

            {/* Oculta la paginación si solo hay una página */}
            {totalPages > 1 && (
              <div className="pagination-controls text-center">
                <button
                  className="btn mx-2 pag-btn"
                  disabled={currentPage === 0}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                  Anterior
                </button>
                <span>Página {currentPage + 1} de {totalPages}</span>
                <button
                  className="btn mx-2 pag-btn"
                  disabled={currentPage + 1 >= totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  Siguiente
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default DaysSelectors;
