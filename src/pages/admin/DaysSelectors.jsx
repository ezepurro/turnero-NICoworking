import { useEffect, useState } from "react";
import { convertDateToDDMMYY } from "../../helpers/converters";
import DaySelectorComponent from "./DaySelectorComponent";
import DateItem from "./DateItem";
import Swal from "sweetalert2";
import { useDate } from "../../hooks/useDate";

const DaysSelectors = () => {
  const { getDates } = useDate()
  const [ selectorsType, setSelectorsType ] = useState("");
  const [ currentPage, setCurrentPage ] = useState(0);
  const [ dates, setDates ] = useState([])



  const fetchData = async () => {
      try {
        const availableDates = await getDates();
        setDates(availableDates)
  
      } catch (error) {
          console.error("Error al recargar los datos:", error);
      }
  };

  useEffect(() => {
      const chooseCalendar = async () => {
          const inputOptions = new Promise((resolve) => {
              setTimeout(() => {
                  resolve({
                      "Depilación": "Depilación",
                      // "Peluqueria": "Peluqueria",
                  });
              }, 250);
          });

          const { value: service } = await Swal.fire({
              title: "Seleccione tipo de turno",
              input: "radio",
              inputOptions,
              confirmButtonText: "Seleccionar",
              allowOutsideClick: false,
              allowEscapeKey: false,
              inputValidator: (value) => {
                  if (!value) {
                      return "Por favor, seleccione tipo de turno";
                  }
              },
          });

          if (service) {
            setSelectorsType(service);
            fetchData();
          }
      };

      chooseCalendar();
  }, []);

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const itemsPerPage = 5; 

  //const totalPages = Math.ceil(futureDates.length / itemsPerPage);

  // const paginatedDates = futureDates.slice(
  //   currentPage * itemsPerPage,
  //   (currentPage + 1) * itemsPerPage
  // );

  return (
    <div className="dayselectors">
      <h3 className="service-title-admin text-center">Habilitación de fechas de {selectorsType.toLocaleLowerCase()}</h3>
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
            <DaySelectorComponent refreshData={fetchData} />
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="row">
              <div className="col-6 text-center"><p>Fecha</p></div>
              <div className="col-6 text-center"><p>Deshabilitar fecha</p></div>
              <hr />
            </div>
            <ul className="text-center">
              {
                dates.map((calendarDay, index) => (
                  <li key={index}>
                    <DateItem date={convertDateToDDMMYY(calendarDay.date)} dateObj={calendarDay} refreshData = {fetchData}  />
                  </li>
                ))
              }
            </ul>
            {/* {totalPages > 1 && (
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
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaysSelectors;
