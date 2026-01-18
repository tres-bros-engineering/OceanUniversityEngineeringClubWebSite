import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

const hash = require("./hashing");

const PrivateRoutes = ({ navigate }) => {
    const location = useLocation();
    const auth = useAuth();
    var user = null

    //set user state
    if (typeof (Storage) !== "undefined") {
        const path = location.pathname
        const siteName = path.split("/")[1]
        const localStroe = auth.getLocalStorageWithExpiry(siteName) || []
        const isLogin = localStroe[0]
        user = hash.checkHash(isLogin, true)
        
    } else {
        user = auth.user; // when browser not support local storage
    }

    //return the required output page according to user state
    if (user) {
        return <Outlet />
    } else {
        return (
            <Navigate to={navigate} state={{ path: location.pathname }} />
        );
    }

};

export default PrivateRoutes;