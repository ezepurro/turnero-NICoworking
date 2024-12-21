import { create } from 'zustand';
import { persist } from 'zustand/middleware';


const useAuthStore = create(
    persist(
      (set) => ({
        isAuthenticated: false, 
        setAuthenticationState: (value) => set({ isAuthenticated: value }),
      }),
      {
        name: 'auth-storage', 
        getStorage: () => localStorage, 
      }
    )
  );

export default useAuthStore;

