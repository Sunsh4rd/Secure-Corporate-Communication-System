import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

const RequireAuth = ({ children }) => {

    const location = useLocation();
    const { user } = useAuth();

    if (!sessionStorage.getItem('access_token')) {
        return <Navigate to='/login' state={{ from: location }} />
    }

    return children;
}

export default RequireAuth;
