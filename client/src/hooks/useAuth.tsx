import Keycloak from "keycloak-js";
import { useEffect, useRef, useState } from "react";
import appConfig from "../config/appconfig.json";

export default function useAuth() {
    const hasBeenRun = useRef(false);
    const [loggedIn, setLoggedIn] = useState(true);

    useEffect(() => {
        if (hasBeenRun.current) return;
        hasBeenRun.current = true;

        const client = new Keycloak({
            url: appConfig.keycloak.url,
            realm: appConfig.keycloak.realm,
            clientId: appConfig.keycloak.clientId,
        });

        client.init({ onLoad: "login-required" }).then((res) => setLoggedIn(res));
    }, []);

    return loggedIn;
}
