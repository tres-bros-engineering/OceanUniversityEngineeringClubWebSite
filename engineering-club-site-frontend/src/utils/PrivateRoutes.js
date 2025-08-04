import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoutes = ({ navigate }) => {
    const location = useLocation();
    const auth = useAuth();

    return(
        auth.user ? <Outlet /> : <Navigate to={navigate} state={{ path: location.pathname }} />
    );
};

export default PrivateRoutes;