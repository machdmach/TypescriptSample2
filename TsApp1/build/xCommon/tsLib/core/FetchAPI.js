import { FormDataX } from "./FormDataX.js";
import { MyError } from "./Errors.js";
import { MessageBox } from "../tsLibPkg.js";
export class FetchAPI {
    //=========================================================================
    constructor() {
        this.reqInit = FetchAPI.createRequestInit();
        this.headers = new Headers();
        if ("") {
            let headers = this.headers;
            headers.set("X-App-Entry-URL", location.href);
            headers.set("X-Pass", "1234");
            this.reqInit.headers = headers;
        }
        // var content = "Hello World";
        // var myHeaders = new Headers();
        // myHeaders.append("Content-Type", "text/plain");
        // myHeaders.append("Content-Length", content.length.toString());
        // myHeaders.append("X-Custom-Header", "ProcessThisImmediately");
        // myHeaders.append("X-Custom-Header", "AnotherValue");
        // console.log(myHeaders.get("X-Custom-Header")); // ["ProcessThisImmediately", "AnotherValue"]
        // myHeaders.delete("X-Custom-Headerzz");
    }
    //=========================================================================
    static createRequestInit() {
        let reqInit = {
            method: "uninit", // *GET, POST, PUT, DELETE, etc.
            //mode: "cors", //default=cors
            //mode: "no-cors", //get opaque response
            //mode: "same-origin", //throws error: Request mode is "same-origin" but the URL's origin is not same as the request origin http://localhost:8080.
            //cache: "no-cache", // (no-cache: default), reload, force-cache, only-if-cached (ChromeTools: Pragma: no-cache)
            //credentials: "include", // include, *same-origin, omit
            // headers: {
            //     //"Content-Type": "application/json; charset=utf-8",
            //     // "Content-Type": "application/x-www-form-urlencoded",
            //     //"x-pass": "abcd12",
            //     //x-app-entry-url:
            //     //'X-Custom-Header': 'hello world',
            // },
            //redirect: "follow", // manual, *follow, error
            //referrer: "client", // no-referrer, *client
            //body: JSON.stringify(jsonData), // body data type must match "Content-Type" header
            //body: formData
        };
        return reqInit;
    }
    //=========================================================================
    async dispatchReturningJSON(method, url, formData) {
        let response = await this.dispatch(method, url, formData);
        let respondContentType = response.headers.get("content-type") + "";
        if (respondContentType.includes("application/json")) {
            if (db)
                console.log('response is json');
            let ret = response.json(); //deserialized to ResponseData
            return ret; //-------------
        }
        else {
            response.text().then((responseText) => {
                if (db)
                    console.error("response text: ", responseText);
            });
            throw Error("Response is not json2: " + respondContentType);
        }
    }
    //=========================================================================
    async get(url) {
        let ret = this.dispatch("GET", url);
        return ret;
    }
    //=========================================================================
    async dispatch(method, url, formData) {
        if (formData && method !== "POST") {
            throw Error("method must be POST to send formData");
        }
        this.reqInit.method = method;
        this.reqInit.body = undefined;
        if (formData) {
            this.reqInit.body = formData;
            if (db)
                console.log("Posting FormData", FormDataX.toStr(this.reqInit.body));
            windowExtBag.formDataSubmitted = formData;
        }
        const req = new Request(url, this.reqInit);
        if (db)
            console.log('start fetchin...', { url, req });
        let promise = fetch(req)
            .then((response) => {
            if (db)
                console.log('fetchResponse received:', response);
            if (!response.ok) {
                //With no-cors you can perform requests to other origins, even if they don't set the required CORS headers, but you'll get an opaque response.
                //An opaque filtered response is a filtered response whose type is "opaque", URL list is
                //the empty list, status is 0, status message is the empty byte sequence,header list is empty, and body is null.
                //
                //With same-origin you can perform requests only to your origin, otherwise the request will result in an error.
                let exc = new MyError(`probably no-cors, url=${url}, httpStatusText=${response.statusText}`);
                exc.htmlMessage += `<br><br>url: <a href='${url}' target='_error'> ${url}</a>`;
                //console.trace(exc.message);
                console.trace("DataApiDispatcher.fetch.response.NotOK", exc);
                console.error("DataApiDispatcher.fetch.response.NotOK", response);
                throw exc;
            }
            else {
                let contentType = response.headers.get("content-type");
                if (!contentType) {
                    let errMesg = `unknown respond content type for url ${url}`;
                    throw Error(errMesg); //-------------------------
                }
                return response;
            }
        })
            .catch(err => {
            MessageBox.showAlert("aa");
            throw new Error("aa");
        });
        return promise;
    }
}
