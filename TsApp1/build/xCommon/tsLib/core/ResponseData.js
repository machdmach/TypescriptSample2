import { StringBuilder } from "./StringBuilder.js";
export class ResponseData {
    constructor() {
        this.method = uninit;
        this.keyID = uninit;
        this.exception = uninit; //payload=userErrMesg, exception=UserDataInputException stack
        this.sqlStatements = uninit;
        this.debugInfo = uninit;
        this.totalRowCount = uninit; //delete count=0?
        this.pageIndex = uninit;
        //pageSize = uninit as any;
        this.payload = uninit;
        this.payloadType = uninit;
        this.apiVersion = uninit;
    }
    get isPayloadJSON() {
        return this.payloadType === "json";
    }
    get isPayloadHTML() {
        return this.payloadType === "html";
    }
    get isPayloadUserError() {
        return this.payloadType === "usererror";
    }
    get isPayloadException() {
        return this.payloadType === "exception";
    }
    //=========================================================================
    static getErrorInfoShort(e) {
        let buf = new StringBuilder();
        buf.appendLineBR(e.payload);
        buf.appendLineBR(e.sqlStatements);
        buf.appendLineBR(`payloadType: ${e.payloadType}`);
        return buf.toString();
    }
    static assignFrom(src) {
        if (typeof src === 'string') {
            const err = "src must not of string type";
            console.error(err, src);
            throw Error(err);
        }
        let res = new ResponseData();
        Object.assign(res, src);
        if (!res.payloadType) {
            const err = "payloadType cannot be null or blank";
            console.error(err, src);
            throw Error(err);
        }
        res.payloadType = res.payloadType.toLowerCase();
        if (!this.validPayloadTypes.includes(res.payloadType)) {
            let err = "Invalid payloadType: " + res.payloadType + " , valid types=" + this.validPayloadTypes.join(",");
            console.error(err, res, src);
            throw Error(err);
        }
        return res;
    }
}
//=========================================================================
ResponseData.validPayloadTypes = ["json", "html", "plaintext", "usererror", "syserror", "exception"];
