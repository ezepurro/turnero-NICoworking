import { create } from 'zustand';
import { persist } from 'zustand/middleware';


const useAppointmentsStore = create(persist(
    (set) => ({
    waxAppointments: [], 
    
    // setWaxAppointments
    setWaxAppointments: ( data ) => {
        set({ waxAppointments: data })
    },

    // clearCalendarDays
    clearWaxAppointments: () => {
        set({ waxAppointments: [] });
    },

    }),
    {
    name: 'appointments-storage', 
    getStorage: () => localStorage, 
    }
));


export default useAppointmentsStore;

