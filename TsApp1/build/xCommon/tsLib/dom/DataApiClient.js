import { ResponseData } from "../core/ResponseData.js";
import { DataApiDispatcher } from "./DataApiDispatcher.js";
import { MessageBox } from "./MessageBox.js";
import { DataFieldDefSet } from "./DataFieldDefSet.js";
import { HTMLElementOverlay } from "./HTMLElementOverlay.js";
import { MyError } from "../core/Errors.js";
export class DataApiClient {
    //=========================================================================
    constructor(baseUrl) {
        this.baseUrl = uninit;
        this.searchParams = new URLSearchParams();
        // if (!baseUrl.endsWith('/')) {
        //     baseUrl += '/';
        // }
        this.baseUrl = baseUrl;
        this.dispatcher = new DataApiDispatcher();
    }
    //=========================================================================
    buildUrl(relativeUrl, keyID) {
        if (keyID === uninit) {
            throw Error("keyID is uninit");
        }
        if (keyID) {
            //TypeError: Cannot convert a Symbol value to a string, keyId=uninit
            relativeUrl += '/' + keyID;
        }
        let url;
        if (relativeUrl) {
            // if (relativeUrl.startsWith('/')) {
            //     url = this.baseUrl + relativeUrl.substring(1);
            // }
            // else {
            //     url = this.baseUrl + relativeUrl;
            // }
            url = this.baseUrl + relativeUrl;
        }
        else {
            url = this.baseUrl;
        }
        let queryString = this.searchParams.toString();
        if (queryString.length > 0) {
            url += (url.includes("?") ? "&" : "?") + queryString;
        }
        return url;
    }
    //=========================================================================
    async post(formData) {
        let url = this.buildUrl('post');
        //FormDataX.toStr(formData, true);
        let res = await this.dispatcher.dispatch('POST', url, formData);
        return res;
    }
    //=========================================================================
    async put(keyID, formData) {
        let url = this.buildUrl('put', keyID);
        let res = await this.dispatcher.dispatch('POST', url, formData);
        return res;
    }
    //=========================================================================
    async get(keyID) {
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
    async getDataFieldDefs() {
        let defSet = this.dataFieldDefSet;
        if (!defSet) {
            let url = this.buildUrl('getDataFieldDefs');
            let resx = await this.dispatcher.dispatch('GET', url);
            let defs = resx.payload;
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
    async getNullable(keyID) {
        return this.get(1);
    }
    //=========================================================================
    async delete(keyID) {
        let res = await this.call("delete", keyID);
        return res;
    }
    //=========================================================================
    async deletable(keyID) {
        let res = await this.call("deletable", keyID);
        return res.payload;
    }
    //=========================================================================
    async call(action, keyID) {
        let url = this.buildUrl(action, keyID);
        let res = await this.dispatcher.dispatch('GET', url);
        return res;
    }
    //=========================================================================
    async search(overlayMesg, formData, delayMillis) {
        if (delayMillis === undefined) {
            delayMillis = Config.MinDataWaitTime;
        }
        let ol = uninit;
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
    async postPayload(relativeUrl, formData) {
        let url = this.buildUrl(relativeUrl);
        //if (True) throw Error("err49381");
        let res = await this.dispatcher.dispatch('POST', url, formData);
        return res.payload;
    }
    async postPayloadWithBusyMesg(busyMesg, relativeUrl, formData) {
        let ol = HTMLElementOverlay.showOverlay(busyMesg);
        try {
            let ret = this.postPayload(relativeUrl, formData);
            return ret;
        }
        finally {
            await ol.hide();
        }
    }
    //=========================================================================
    async postWithBusyMesg(busyMesg, relativeUrl, formData) {
        let ol = HTMLElementOverlay.showOverlay(busyMesg);
        try {
            let url = this.buildUrl(relativeUrl);
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
    async getPayload(relativeUrl) {
        let url = this.buildUrl(relativeUrl);
        let res = await this.dispatcher.dispatch('GET', url);
        return res.payload;
    }
    async getPayloadWithBusyMesg(busyMesg, relativeUrl = "") {
        let ol = HTMLElementOverlay.showOverlay(busyMesg);
        try {
            let url = this.buildUrl(relativeUrl);
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
    getSampleData() {
        throw Error('To be implemented by sub-class');
    }
    getDefaultData() {
        throw Error('To be implemented by sub-class');
    }
    setErrorHandler(handler) {
        this.dispatcher.setErrorHandler(handler);
    }
}
