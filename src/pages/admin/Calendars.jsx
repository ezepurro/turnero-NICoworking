import CalendarComponent from "./CalendarComponent"



const Calendars = ({ waxAppointments }) => {

  // const { getWaxAppointments } = useAppointments();
  // const [waxAppointments, setwaxAppointments] = useState();
  // const { getAllUsers } = useAuthenticationStore();


  // useEffect(() => {
  //   const fetchAppointments = async () => {
  //     try {
  //       const fetchedAppointments = await getWaxAppointments();
  //       const users = await getAllUsers(); 
  //       const appointmentsWithNames = fetchedAppointments.map(appointment => {
  //         const user = users.find(u => u.id === appointment.clientId);
  //         return {
  //           title: user.name,
  //           notes: appointment.type,
  //           start: new Date(appointment.date),
  //           end: addMinutes(new Date(appointment.date), appointment.sessionLength),
  //           contact: appointment.contact,
  //           sessionZones: appointment.sessionZones
  //         };
  //       });
  //       setwaxAppointments(appointmentsWithNames);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchAppointments();
  // }, []);
  

  return (
    <div className="calendars">
      <div className="wax">
        {/* Depilación */}
        <h3 className="service-title-admin text-center">Próximos turnos</h3>
        <div className="calendar-admin-container w-50 mx-auto">
          <CalendarComponent events={ waxAppointments }/>
        </div>
      </div>
      <div className="nails">

      </div>
    </div>
  )
}

export default Calendars
