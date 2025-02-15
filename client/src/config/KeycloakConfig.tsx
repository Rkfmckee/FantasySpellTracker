import axios from "axios";
import Keycloak from "keycloak-js";

export default function InitializeKeycloak() {
    const initializationOptions = {
        url: "http://localhost:18080/",
        realm: "fst",
        clientId: "fst-client",
    };

    const keycloak = new Keycloak(initializationOptions);

    keycloak
        .init({
            onLoad: "login-required",
            checkLoginIframe: true,
            pkceMethod: "S256",
        })
        .then((auth) => {
            if (!auth) {
                window.location.reload();
                return;
            }

            axios.defaults.headers.common["Authorization"] = `Bearer ${keycloak.token}`;
        });
}
