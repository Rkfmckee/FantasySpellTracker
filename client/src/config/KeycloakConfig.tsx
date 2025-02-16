import Keycloak from "keycloak-js";
import appConfig from "../config/appconfig.json";

const keycloak = new Keycloak({
    url: appConfig.keycloak.url,
    realm: appConfig.keycloak.realm,
    clientId: appConfig.keycloak.clientId,
});

export default keycloak;
