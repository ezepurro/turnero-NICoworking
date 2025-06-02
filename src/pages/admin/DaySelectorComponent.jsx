import { useState, useEffect } from "react";
import { useDate } from "../../hooks/useDate";
import DatePicker from "react-datepicker";
import "../../styles/components/DaySelectorComponent.css";

const defaultStartTime = '2025-06-01T12:00:00.000Z';
const defaultEndTime = '2025-06-01T23:00:00.000Z';

const DaySelectorComponent = ({ refreshData }) => {

    const [startDate, setStartDate] = useState();
    const [enabledDates, setEnabledDates] = useState([]);
    const { addDate, getDates } = useDate();



    const handleSubmit = async (event) => {
        event.preventDefault();
        if (startDate) {
            const date = new Date(startDate);
            const formattedDate = date.toISOString();
            await addDate(formattedDate, defaultStartTime, defaultEndTime);
            refreshData();
            fetchDates();
        }
    }

    const highlightDates = (date) => {
        return enabledDates.some(enabledDate =>
            enabledDate.toDateString() === date.toDateString()
        ) ? "enabled-day" : "";
    };

    const fetchDates = async () => {
        const dates = await getDates();
        const formattedDates = dates.map(date => new Date(date.date));
        setEnabledDates(formattedDates);
    };

    useEffect(() => {
        fetchDates();
    }, [])


    return (
        <form className="day-selector" onSubmit={handleSubmit}>
            <DatePicker
                selected={startDate}
                placeholderText='Seleccione una fecha y hora'
                className="form-control date-picker"
                onChange={(date) => setStartDate(date)}
                dateFormat="Pp"
                locale="es"
                timeCaption="Hora"
                onKeyDown={(e) => { e.preventDefault() }}
                minDate={new Date()}
                inline
                dayClassName={highlightDates}
                excludeDates={enabledDates}
            />
            <br />
            <button type="submit" className="btn form-button">Habilitar fecha</button>
        </form>
    )
}

export default DaySelectorComponent;