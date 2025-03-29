import { Navigate, Route, Routes } from "react-router-dom"
import LoginPage from "../pages/auth/LoginPage"
import RegisterPage from "../pages/auth/RegisterPage"
import AdminPage from "../pages/admin/AdminPage"
import HomePage from "../pages/home/HomePage"
import MyAppointments from "../pages/user/MyAppointments"
import useAuthStore from "../store/useAuthStore"

const AppRouter = () => {

  const { isAuthenticated, user } = useAuthStore();

  return (
    <Routes>
      {
        (!isAuthenticated)
          ?
          <>
            {/* Auth Routes */}
            <Route path="/auth/login" element={ <LoginPage /> } />
            <Route path="/auth/register" element={ <RegisterPage /> } />

            {/* Privacy Policy */}

            {/* Home Routes */}
            <Route path="/" element={ <HomePage /> } />
            <Route path="/*" element={ <Navigate to="/" /> } />
          </>
          :
          <>
            {/* Home Routes */}
            <Route path="/" element={ <HomePage /> } />
            <Route path="/*" element={ <Navigate to="/" /> } />

            {/* User Routes */}
            <Route path="/appointments" element={ <MyAppointments /> } />

            {/* Admin Routes */}
            {user.isAdmin && ( 
              <Route path="/admin" element={<AdminPage />} />
            )}
          </>
      }
    </Routes>
  )
}

export default AppRouter
