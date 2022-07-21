import { ConfigX } from "../pDomX/ConfigX.js";
import { EntityBase } from "../pSystemX/EntityBase.js";

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
    static isRecordZZTest(rec: EntityBase) {
        let ret = false;
        ret = rec.InternalAdminNotes?.includes("zztest") ?? false;
        return ret;
    }

    //=========================================================================
    static ensureRecordDeletableByAutomatedTest(rec: EntityBase) {
        if (!this.isRecordZZTest(rec)) {
            throw Error("This record can't be deleted by automated testing");
        }
    }
}
