import { ConfigX } from "../dom/ConfigX.js";
import { DataApiClient } from "../dom/DataApiClient.js";
import { AppCurrentUser } from "./AppCurrentUser.js";

export class AppLib {
    static get username() { return AppCurrentUser.username; }
    static get userRoles() { return AppCurrentUser.userRoles; }
    static get dbEnv() { return ConfigX._dbEnv; }
    static get isDbProd() { return ConfigX.isDbProd; }

    static newDataApiClient(relativeUrl = "") {
        const url = this.getDataApiUrl(relativeUrl);
        const dataApiClient = new DataApiClient(url);
        return dataApiClient;
    }
    public static getDataApiUrl(relPath: string) {
        return ConfigX.DataApiUrlBase + relPath;
    }
    public static getResourceUrl(relPath: string) {
        return ConfigX.clientSideBaseUrl + relPath;
    }
}
