import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/UseAuth";
import Loader from "../Loader";

const AuthContainer = () => {
    const { user, isLoading } = useAuth();

    return isLoading ? (
        <Loader centered />
    ) : user ? (
        // Authenticated, show child components
        <Outlet />
    ) : (
        // Not Authenticated, redirect to login
        <Navigate
            to="login"
            replace
            state={{
                redirectUrl: window.location.pathname,
            }}
        />
    );
};

export default AuthContainer;
