import { ResponseData } from "../pSystemX/ResponseData.js";
import { DataApiDispatcher } from "./DataApiDispatcher.js";
import { MessageBox } from "./MessageBox.js";
import { DataFieldDefSet, DataFieldDef } from "./DataFieldDefSet.js";
import { HTMLElementOverlay } from "./HTMLElementOverlay.js";
import { MyError } from "../pSystemX/Errors.js";

export class DataApiClient {

    baseUrl = uninit as string;
    dispatcher: DataApiDispatcher;
    searchParams = new URLSearchParams();

    //=========================================================================
    constructor(baseUrl: string) {
        if (!baseUrl.endsWith('/')) {
            baseUrl += '/';
        }
        this.baseUrl = baseUrl;
        this.dispatcher = new DataApiDispatcher();
    }

    //=========================================================================
    buildUrl(relativeUrl: string, keyID?: number | string): string {
        //let relativeUrl = method;
        if (keyID === uninit) {
            throw Error("keyID is uninit");
        }
        if (keyID) {
            //TypeError: Cannot convert a Symbol value to a string, keyId=uninit
            relativeUrl += '/' + keyID;
        }

        if (relativeUrl.startsWith('/')) {
            relativeUrl = relativeUrl.substring(1);
        }
        let url = this.baseUrl + relativeUrl;

        let queryString = this.searchParams.toString();
        if (queryString.length > 0) {
            url += (url.includes("?") ? "&" : "?") + queryString;
        }
        return url;
    }
    //=========================================================================
    async post(formData: FormData): Promise<ResponseData> {
        let url = this.buildUrl('post');
        //FormDataX.toStr(formData, true);
        let res = await this.dispatcher.dispatch('POST', url, formData);
        return res;
    }
    //=========================================================================
    async put(keyID: number, formData: FormData) {
        let url = this.buildUrl('put', keyID);
        let res = await this.dispatcher.dispatch('POST', url, formData);
        return res;
    }
    //=========================================================================
    async get(keyID: number | string): Promise<any> {
        if (!keyID) {
            throw Error("KeyID is not available: " + keyID);
        }
        let url = this.buildUrl('get', keyID);
        let resx = await this.dispatcher.dispatch('GET', url);
        if (!resx.payload) {
            //already thrown from server
            let errMesg = 'No record found for keyID: ' + keyID;
            errMesg += ResponseData.getErrorInfoShort(resx);
            errMesg += `url: <a href='${url}' target='_error'> ${url}</a>`;

            console.error(errMesg);
            console.trace(errMesg);

            let myErr = new MyError(errMesg);
            MessageBox.showSystemError(myErr, "error.get.api");
            throw myErr;
        }
        let dataRec = resx.payload;
        if (resx.isPayloadUserError) {
            let err = new MyError("userDataError");
            err.handled = true;
            throw err;
        }

        let defSet = await this.getDataFieldDefs();
        defSet.parsePropertyValues(dataRec);
        return dataRec;
    }
    //=========================================================================
    dataFieldDefSet?: DataFieldDefSet;
    async getDataFieldDefs(): Promise<DataFieldDefSet> {
        let defSet = this.dataFieldDefSet;
        if (!defSet) {
            let url = this.buildUrl('getDataFieldDefs');
            let resx = await this.dispatcher.dispatch('GET', url);

            let defs = resx.payload as DataFieldDef[];

            defs.forEach(def => {
                // ReferenceError: number is not defined
                //JSType = "number";
                //let pd = Object.getOwnPropertyDescriptor(def, 'jsPrimitiveType');
                let pd = Object.getOwnPropertyDescriptor(def, 'jsReferenceType');
                if (pd) {
                    let jsType = pd.value;
                    try {
                        //def.Type = eval(jsType);
                        // let f = Function("return " + jsType);
                        // def.Type = f();
                        def.Type = Function("return " + jsType)();
                    }
                    catch (err) {
                        console.error("fail to eval jsType: " + jsType, err);
                    }
                }
            });
            defSet = new DataFieldDefSet(resx.payload);

            console.log('dataFieldDefs fetched: ', defSet);
            this.dataFieldDefSet = defSet;
        }
        else {
            console.log('dataFieldDefs fetched: already exist', defSet);
        }
        return defSet;
    }
    //=========================================================================
    async getNullable(keyID: number | string): Promise<ResponseData> {
        return this.get(1);
    }
    //=========================================================================
    async delete(keyID: number | string): Promise<ResponseData> {
        let res = await this.call("delete", keyID);
        return res;
    }
    //=========================================================================
    async deletable(keyID: number | string): Promise<any> {
        let res = await this.call("deletable", keyID);
        return res.payload;
    }
    //=========================================================================
    async call(action: string, keyID: number | string): Promise<ResponseData> {
        let url = this.buildUrl(action, keyID);
        let res = await this.dispatcher.dispatch('GET', url);
        return res;
    }

    //=========================================================================
    async search(overlayMesg?: string, formData?: FormData, delayMillis?: number): Promise<ResponseData> {
        if (delayMillis === undefined) {
            delayMillis = Config.MinDataWaitTime;
        }
        let ol = uninit as HTMLElementOverlay;
        if (overlayMesg) {
            ol = HTMLElementOverlay.showOverlay(overlayMesg);
        }
        let url = this.buildUrl('search');
        try {
            let res = await this.dispatcher.dispatch('POST', url, formData);
            if (ol !== uninit) {
                await ol.hideWithDelay(delayMillis);
            }
            return res;
        }
        catch (err) {
            if (ol !== uninit) {
                await ol.hideWithDelay(delayMillis);
            }
            throw err;
        }
    }

    //=========================================================================
    async postWithBusyMesg(busyMesg: string, apiMethod: string, formData?: FormData): Promise<ResponseData> {

        let ol = HTMLElementOverlay.showOverlay(busyMesg);
        try {
            let url = this.buildUrl(apiMethod);
            let res = await this.dispatcher.dispatch('POST', url, formData);
            await ol.hide();
            return res; //.payload;
        }
        catch (err) {
            await ol.hide();
            throw err;
        }
    }

    //=========================================================================
    async fetchPayloadWithBusyMesg(busyMesg: string, apiMethod: string = ""): Promise<any> {

        let ol = HTMLElementOverlay.showOverlay(busyMesg);
        try {
            let url = this.buildUrl(apiMethod);
            let res = await this.dispatcher.dispatch('GET', url);
            await ol.hide();
            return res.payload;
        }
        catch (err) {
            await ol.hide();
            throw err;
        }
    }

    //=========================================================================
    async fetchPayloadNoBusyMesg(apiMethod: string): Promise<any> {
        let url = this.buildUrl(apiMethod);
        let res = await this.dispatcher.dispatch('GET', url);
        return res.payload;
    }
    //=========================================================================
    getSampleData(): unknown {
        throw Error('To be implemented by sub-class');
    }
    getDefaultData() {
        throw Error('To be implemented by sub-class');
    }
    setErrorHandler(handler: (err: any, errType: string) => any) {
        this.dispatcher.setErrorHandler(handler);
    }
}
