import { useContext } from "react";
import { AuthContext } from "../../auth-handler";
import { Navigate, useLocation, Outlet } from "react-router-dom";

const RouteGuard = ({ authenticated = true, type = 'any', to = '/login' }) => {
    const Auth = useContext(AuthContext);
    const location = useLocation();

    const { isAuthenticated, user: { type: userType } } = Auth;

    if(authenticated) {
        if(!isAuthenticated) {
            return <Navigate to={to} state={{next: location.pathname}}/>;
        }
        else if(type !== 'any' && type !== userType) {
            return <Navigate to="/"/>;
        }
        else return <Outlet />;
    }
    else {
        if(isAuthenticated) {
            return <Navigate to="/"/>;
        }
        else return <Outlet />;
    }
};

export default RouteGuard;