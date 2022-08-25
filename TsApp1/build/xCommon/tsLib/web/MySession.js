import { AppSesisonStorage } from "../core/StorageX.js";
export class MySession {
    static get username() {
        let storage = new AppSesisonStorage("uname");
        //let p = new SearchPar
        let ret = storage.getItemOrDefault("z");
        return ret;
    }
}
