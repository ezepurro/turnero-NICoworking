import { useEffect, useState } from "react";
import { convertDateToDDMMYY } from "../../helpers/converters";
import { useDate } from "../../hooks/useDate";
import DaySelectorComponent from "./DaySelectorComponent";
import DateItem from "./DateItem";

const DaysSelectors = () => {

  const { getObjectDates } = useDate()
  const [ currentPage, setCurrentPage ] = useState(0);
  const [ dates, setDates ] = useState([]);


  const fetchData = async () => {
    try {
      const response = await getObjectDates();

      if (response?.ok && Array.isArray(response.dates)) {
        const sortedDates = response.dates.sort((a, b) => new Date(a.date) - new Date(b.date));
        setDates(sortedDates);
      } else {
        console.error("Respuesta inválida:", response);
      }

    } catch (error) {
      console.error("Error al recargar los datos:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(dates.length / itemsPerPage);

  const paginatedDates = dates.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="dayselectors">
      <h3 className="service-title-admin text-center">Habilitación de fechas de depilación</h3>
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
            <DaySelectorComponent refreshData={fetchData} enabledDates={dates} />
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="row">
              <div className="col-2 text-center"><p><b>Fecha</b></p></div>
              <div className="col-2 text-center"><p><b>Desde</b></p></div>
              <div className="col-2 text-center"><p><b>Hasta</b></p></div>
              <div className="col-3 text-center"><p><b>Modificar horarios</b></p></div>
              <div className="col-3 text-center"><p><b>Deshabilitar fecha</b></p></div>
              <hr />
            </div>
            <ul className="text-center">
              {
                paginatedDates.map((calendarDay, index) => (
                  <li key={index}>
                    <DateItem date={convertDateToDDMMYY(calendarDay.date)} dateObj={calendarDay} refreshData={fetchData} />
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
