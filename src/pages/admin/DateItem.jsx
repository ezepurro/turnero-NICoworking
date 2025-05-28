import { useDate } from "../../hooks/useDate";
const DateItem = ({date, dateObj, refreshData }) => {
  const { removeDate } = useDate();

  const handleDelete = async() => {
    await removeDate(dateObj.id)
    refreshData()
  };

  return (
    <>
      <div className="row date-item">
          <div className="col-6">
            {date}
          </div>
          <div className="col-6">
            <button
              className="btn"
              onClick={ handleDelete }
            >
              Deshabilitar fecha
            </button>

          </div>
      </div>
      <hr />
    </>
  )
}

export default DateItem;
