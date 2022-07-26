import { ResponseData } from "../core/ResponseData.js";
import { MessageBox } from "./MessageBox.js";
import { DevLib } from "../web/DevLib.js";
import { FetchAPI } from "../core/FetchAPI.js";
import { XMLHttpRequestX } from "./XMLHttpRequestX.js";
import { MyError } from "../core/Errors.js";
import { UrlX } from "../core/UrlX.js";
import { LocationUrl } from "./LocationUrl.js";

/**
 * @see FetchAPI
 */
export class DataApiDispatcher {
    resData?: ResponseData;
    lastRequestedUrl = "uninit";
    //=========================================================================
    dispatch(apiMethod: string, url: string, formData?: FormData): Promise<ResponseData> {
        //if (True) throw Error("err3092: dispatch");
        console.log("dispatching to url: " + url);
        this.lastRequestedUrl = url;

        let promise = new Promise<ResponseData>((resolve, reject) => {
            let fetcher = new XMLHttpRequestX();

            fetcher.dispatchReturningJSON(apiMethod, url, formData)
                .then(async (jsonObj: any) => {
                    if (db) console.log('DataApiResult received from ' + url, jsonObj);
                    let resData = ResponseData.assignFrom(jsonObj);
                    this.resData = resData;
                    if (db) {
                        console.log('Modified DataApiResult received from ' + url, resData);
                        console.log("sqlStatements: " + resData.sqlStatements);
                    }
                    DevLib.setServerDebugInfo(resData.debugInfo);
                    if (resData.exception) {
                        if (resData.isPayloadUserError) {
                            let userError = new MyError(resData.exception);
                            if (this.errorHandler) {
                                await this.errorHandler(userError, "DataApiDispatcher.dispatch.catch");
                            }
                            else {
                                //Not await, just display the error and continue on
                                MessageBox.showUserError(resData.payload, "User Error");
                            }
                            userError.handled = true;
                            reject(userError); //reject the promise, the catch below will not be executed.
                        }
                        else {
                            let err = `not success, exception = <pre> [${resData.exception}] \n SQL: ${resData.sqlStatements} </pre>`;
                            throw Error(err);
                        }
                    }
                    else {
                        resolve(resData);
                    }
                })
                .catch(async (err) => {
                    let myErr: MyError;
                    if (err instanceof MyError) {
                        myErr = err;
                        if (myErr.handled) {
                            //nothing, already handled
                            return;
                        }
                    }
                    else {
                        let errMesg = `err=${err}`;
                        if (err instanceof ProgressEvent) {
                            errMesg += ", " + `#ProgressEvent, loaded=${err.loaded}, total=${err.total}, lengthComputable:${err.lengthComputable} resource failed to load`;
                        }
                        myErr = new MyError(errMesg);

                        let apiDebugUrl = UrlX.setQueryNV(LocationUrl.makeUrlfullyQualified(url), "zzhtml", "1");
                        myErr.htmlMessage = `<br><br>url4html: <a href='${apiDebugUrl}' target='_error'> ${apiDebugUrl}</a>`;

                    }
                    if (this.errorHandler) {
                        await this.errorHandler(myErr, "DataApiDispatcher.dispatch.catch");
                    }
                    else {
                        //Not await, just display the error and continue on
                        MessageBox.showSystemError(myErr, "DataApiDispatcher.dispatch.catch2");
                    }
                    reject(myErr);
                });
        });
        return promise;
    }

    //=========================================================================
    private errorHandler?: (err: any, errType: string) => any;
    setErrorHandler(handler: (err: any, errType: string) => any) {
        this.errorHandler = handler;
    }
    static errCount = 0;
    static ErrorToConsoleOnlyHandler(err: any, errType: string) {
        if (DataApiDispatcher.errCount < 3) {
            console.error(DataApiDispatcher.errCount + ", ErrorToConsoleOnly: errType=" + errType + ", err=", err);
        }
        else {
            //nothing, enough errors output
        }
        DataApiDispatcher.errCount++;
    }
}
