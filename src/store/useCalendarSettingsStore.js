import { create } from 'zustand';
import { persist } from 'zustand/middleware';


const useCalendarSettingsStore = create(
    (set) => ({
    calendarDays: {}, 
    reservedTimes: {},
    
    // setCalendarDays
    setCalendarDays: ( data ) => {
        set({ calendarDays: data })
    },

    // setReservedTimes
    setReservedTimes: ( data ) => {
        set({ reservedTimes: data })
    },

    // clearCalendarDays
    clearCalendarDays: () => {
        set({ calendarSettings: {} });
    },

    // clearReservedTimes
    clearReservedTimes: () => {
        set({ reservedTimes: {} });
    },

    }),
    {
    name: 'calendarSettings-storage', 
    getStorage: () => localStorage, 
    }
);


export default useCalendarSettingsStore;

