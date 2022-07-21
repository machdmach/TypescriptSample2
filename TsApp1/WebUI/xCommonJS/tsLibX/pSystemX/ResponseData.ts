import { StringBuilder } from "./StringBuilder.js";

type ResponseDataBag = { appStartedTime: number };

export class ResponseData {
    method = uninit as string;
    keyID = uninit as string | number;
    exception = uninit as string; //payload=userErrMesg, exception=UserDataInputException stack
    sqlStatements = uninit as string;
    debugInfo = uninit as string;

    totalRowCount = uninit as any; //delete count=0?
    pageIndex = uninit as any;
    sortedBy?: string;
    //pageSize = uninit as any;

    payload = uninit as any;
    payloadType = uninit as string;
    bag?: ResponseDataBag;
    tag1?: any;
    apiVersion = uninit as string;

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
    static getErrorInfoShort(e: ResponseData) {
        let buf = new StringBuilder();
        buf.appendLineBR(e.payload);
        buf.appendLineBR(e.sqlStatements);
        buf.appendLineBR(`payloadType: ${e.payloadType}`);
        return buf.toString();
    }

    //=========================================================================
    static validPayloadTypes = ["json", "html", "plaintext", "usererror", "syserror", "exception"];
    static assignFrom(src: any) {
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
