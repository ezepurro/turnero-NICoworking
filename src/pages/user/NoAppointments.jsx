import '../../styles/components/noAppointments.css';


const NoAppointments = () => {
  return (
    <div className="text-center no-appointments">
      <h3>No hay turnos para mostrar :(</h3>
      <p>En caso de que desee sacar un turno, <a href="/#services">presione acá</a></p>
    </div>
  )
}

export default NoAppointments
