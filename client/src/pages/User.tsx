import { Navigate } from "react-router-dom";
import { getUserName } from "../services/AuthService";
import { useEffect, useState } from "react";
import { z } from "zod";

const User = () => {
    const [userName, setUserName] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        getUser();
    }, []);

    async function getUser() {
        var response = await getUserName();
        if (response.status == 200) {
            setLoggedIn(true);

            try {
                var userName = z.string().parse(response.data);
                setUserName(userName);
            } catch {
                setLoggedIn(false);
                setUserName("");
            }
        }
    }

    return loggedIn ? userName : <Navigate to="/login" />;
};

export default User;
