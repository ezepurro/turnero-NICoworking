import { Navigate, Route, Routes } from "react-router-dom"
import LoginPage from "../pages/auth/LoginPage"
import RegisterPage from "../pages/auth/RegisterPage"
import AdminPage from "../pages/admin/AdminPage"
import HomePage from "../pages/home/HomePage"

const AppRouter = () => {
  return (
    <Routes>
        {/* Auth Routes */}
        <Route path="/auth/login" element={ <LoginPage /> } />
        <Route path="/auth/register" element={ <RegisterPage /> } />

        {/* Admin Routes */}
        <Route path="/admin" element={ <AdminPage /> } />

        {/* Home Routes */}
        <Route path="/" element={ <HomePage /> } />
        <Route path="/*" element={ <Navigate to="/" /> } />
    </Routes>
  )
}

export default AppRouter
