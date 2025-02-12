import { useState } from "react";
import { convertDateToDDMMYY } from "../../helpers/converters";
import DaySelectorComponent from "./DaySelectorComponent";
import useCalendarSettingsStore from "../../store/useCalendarSettingsStore";
import DateItem from "./DateItem";

const DaysSelectors = () => {
  const { calendarDays } = useCalendarSettingsStore();
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const itemsPerPage = 5; 

  const futureDates = calendarDays.waxDays
  .filter((calendarDay) => {
    const calendarDayDate = new Date(calendarDay);
    calendarDayDate.setHours(0, 0, 0, 0); 
    return calendarDayDate.getTime() >= currentDate.getTime(); 
  })
  .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(futureDates.length / itemsPerPage);

  const paginatedDates = futureDates.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="dayselectors">
      <h3 className="service-title-admin text-center">Habilitación de fechas</h3>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <p className="text-center">Habilitador de fechas</p>
          </div>
          <div className="col-lg-6 col-md-12">
            <p className="text-center">Próximas fechas habilitadas</p>
          </div>
        </div>
      </div>
      <div className="container d-flex align-items-center" style={{ minHeight: "70vh" }}>
        <div className="row w-100">
          <div className="col-lg-6 col-md-12 mx-auto">
            <DaySelectorComponent />
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="row">
              <div className="col-6 text-center"><p>Fecha</p><hr /></div>
              <div className="col-6 text-center"><p>Deshabilitar fecha</p><hr /></div>
            </div>
            <ul className="text-center">
              {
                paginatedDates.map((calendarDay, index) => (
                  <li key={index}>
                    <DateItem date={convertDateToDDMMYY(calendarDay)} dateObj={calendarDay.toISOString()} />
                  </li>
                ))
              }
            </ul>
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
