import { ConfigX } from "../dom/ConfigX.js";
export class AppTestLib {
    static get isToRunAppTests() {
        let ret = false;
        if (ConfigX.isLocalhost) {
            if (location.href.includes("zztest")) {
                if (ConfigX.isDbProd) {
                    throw Error("cannot test in Prod");
                }
                if (!ConfigX.isDbDev) {
                    throw Error("can run test in Dev only");
                }
                ret = true;
            }
        }
        return ret;
    }
    //=========================================================================
    static isRecordZZTest(rec) {
        var _a, _b;
        let ret = false;
        ret = (_b = (_a = rec.InternalAdminNotes) === null || _a === void 0 ? void 0 : _a.includes("zztest")) !== null && _b !== void 0 ? _b : false;
        return ret;
    }
    //=========================================================================
    static ensureRecordDeletableByAutomatedTest(rec) {
        if (!this.isRecordZZTest(rec)) {
            throw Error("This record can't be deleted by automated testing");
        }
    }
}
