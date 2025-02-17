import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "bootstrap/dist/css/bootstrap.css";

import { ReactKeycloakProvider } from "@react-keycloak/web";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import InitializeAxios from "./config/AxiosConfig.tsx";
import keycloak from "./config/KeycloakConfig.tsx";
import Loader from "./components/Loader.tsx";

InitializeAxios();

createRoot(document.getElementById("root")!).render(
    <ReactKeycloakProvider authClient={keycloak} LoadingComponent={<Loader centered />}>
        <StrictMode>
            <App />
        </StrictMode>
    </ReactKeycloakProvider>
);
