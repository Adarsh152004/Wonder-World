import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext"
import { useEffect } from "react";

function ProtectedRoute({children}) {
    const {isAuthenticated} = useAuth();
    const navigate = useNavigate();

    useEffect(function() {
        if(!isAuthenticated) navigate('/');
    });

    return isAuthenticated ? children : '';
}

export default ProtectedRoute;
