import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import zukeeper from 'zukeeper';


const useAuthStore = create(persist(zukeeper(
      (set) => ({
        // isAuthenticated
        isAuthenticated: false, 
        setAuthenticationState: ( value ) => set({ isAuthenticated: value }),

        // user
        user: {},
        setUser: ( value ) => set({ user: value }),

        // errorMessage
        errorMessage: null,
        setErrorMessage: ( value ) => set({ errorMessage: value }),
        

        // onLogin
        onLogin: ( user = {} ) => {
          set({ isAuthenticated: true });
          set({ user: user });
          set({ errorMessage: null });
        },

        // onLogout
        onLogout: ( errorMessage ) => {
          set({ isAuthenticated: false });
          set({ user: {} });
          set({ errorMessage: errorMessage });
        },

        // clearErrorMessage
        clearErrorMessage: () => {
          set({ errorMessage: null });
        },
      }),
      {
        name: 'auth-storage', 
        getStorage: () => localStorage, 
      }
)));

window.store = useAuthStore;

export default useAuthStore;

