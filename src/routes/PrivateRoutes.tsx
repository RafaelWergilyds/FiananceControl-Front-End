import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthHook";

export function PrivateRoutes() {
    const auth = useAuth()

    if (!auth || auth.loading) {
        return <div>carregando...</div>
    }

    return auth.signed ? <Outlet /> : <Navigate to="/login" />
}