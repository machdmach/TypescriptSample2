import { ConfigX } from "../pDomX/ConfigX.js";
import { DataApiClient } from "../pDomX/DataApiClient.js";
import { AppCurrentUser } from "./AppCurrentUser.js";

export class AppLib {
    static get username() { return AppCurrentUser.username; }
    static get userRoles() { return AppCurrentUser.userRoles; }
    static get dbEnv() { return ConfigX._dbEnv; }
    static get isDbProd() { return ConfigX.isDbProd; }

    static newDataApiClient(apiEntity: string) {
        const url = this.getDataApiUrl(apiEntity);
        const dataApiClient = new DataApiClient(url);
        return dataApiClient;
    }
    public static getDataApiUrl(relPath: string) {
        return ConfigX.DataApiUrlBase + relPath;
    }
}
