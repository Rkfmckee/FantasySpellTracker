import Typography from "@mui/material/Typography";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import queryClient from "../../config/queryClient";
import { logout } from "../../services/AuthService";

export default function Logout() {
    const navigate = useNavigate();

    const { mutate: logOut } = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.clear();

            navigate("/login", {
                replace: true,
            });
        },
    });

    useEffect(() => {
        logOut();
    }, []);

    return <Typography variant="body1">Logging out...</Typography>;
}
