import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import zukeeper from 'zukeeper';


const useAuthStore = create(persist(zukeeper(
      (set) => ({
        // isAuthenticated
        isAuthenticated: false, 
        setAuthenticationState: ( value ) => set({ isAuthenticated: value }),

        // user
        user: null,
        setUser: ( value ) => set({ user: value }),

        // errorMessage
        errorMessage: null,
        setErrorMessage: ( value ) => set({ errorMessage: value }),
        

        // onLogin
        onLogin: ( user = {}, token ) => {
          localStorage.setItem('token', token);
          set({ isAuthenticated: true, user, errorMessage: null });
        },

        // onLogout
        onLogout: () => {
          localStorage.removeItem('token');
          set({ isAuthenticated: false, user: null, errorMessage: null });
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

// window.store = useAuthStore;

export default useAuthStore;

