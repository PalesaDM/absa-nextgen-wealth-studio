import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute() {
    const { auth } = useAuth();
    if (!auth.isAuthed) return <Navigate to="/login" replace />;
    return <Outlet />;
}