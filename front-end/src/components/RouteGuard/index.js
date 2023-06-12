import { useContext } from "react";
import { AuthContext } from "../../auth-handler";
import { Navigate, useLocation, Outlet } from "react-router-dom";

const RouteGuard = ({ authenticated = true, type = 'any', to = '/login' }) => {
    const Auth = useContext(AuthContext);
    const location = useLocation();

    const { isAuthenticated, user: { type: userType } } = Auth;

    if(authenticated) {
        if(!isAuthenticated) {
            console.log(location.pathname);
            return <Navigate to={to} state={{next: location.pathname}} replace/>;
        }
        else if(type !== 'any' && type !== userType) {
            return <Navigate to="/" replace/>;
        }
        else return <Outlet />;
    }
    else {
        if(isAuthenticated) {
            console.log("here");
            return <Navigate to="/" replace/>;
        }
        else return <Outlet />;
    }
};

export default RouteGuard;