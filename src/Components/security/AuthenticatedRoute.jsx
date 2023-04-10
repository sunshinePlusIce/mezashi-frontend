import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

export default function AuthenticatedRoute({children, to}) {
    const authContext = useAuth();
    if (authContext.isAuthenticated) {
        return children;
    } else {
        return <Navigate to={to} />
    }
}