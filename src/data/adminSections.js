import AppointmentList from "../pages/admin/AppointmentList";
import Calendars from "../pages/admin/Calendars";
import DaysSelectors from "../pages/admin/DaysSelectors";
import NoPaidAppointmentList from "../pages/admin/NoPaidAppointmentList";



export const adminSections = [
    {
        id: "appointments-calendars",
        title: "Ver turnos",
        component: Calendars
    },
    {
        id: "appointments-days",
        title: "Administrar fechas para turnos",
        component: DaysSelectors
    },
    {
        id: "manage-appointment",
        title: "Administrar turnos",
        component: AppointmentList
    },
    {
        id: "no-paid-appointments",
        title: "Turnos sin seña",
        component: NoPaidAppointmentList
    },
]