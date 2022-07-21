import { FormDataX } from "../pSystemX/FormDataX.js";
import { MyError } from "../pSystemX/Errors.js";
import { NavigatorX } from "./NavigatorX.js";
import { MapX } from "../pSystemX/MapX.js";
import { ConfigX } from "./ConfigX.js";

//https://blog.garstasio.com/you-dont-need-jquery/ajax/

export class XMLHttpRequestX {

    async dispatchReturningJSON(method: string, url: string, formData?: FormData): Promise<any> {

        let xhr = await this.dispatch(method, url, formData);

        let responseType: XMLHttpRequestResponseType = xhr.responseType;
        // "" | "arraybuffer" | "blob" | "document" | "json" | "text";
        if (responseType && responseType !== "json") {
            let errMesg = "XMLHttpRequestX, Response is not json1: [" + responseType + "]<br>";
            console.error(errMesg, xhr);

            throw Error(errMesg);
        }
        let responseText: any = xhr.response;
        let jsonObj = JSON.parse(responseText);

        let promise = new Promise<any>((resolve, reject) => {
            resolve(jsonObj);
        });
        return promise;
    }

    //=========================================================================
    async get(url: string): Promise<XMLHttpRequest> {
        let ret = this.dispatch("GET", url);
        return ret;
    }

    //=========================================================================
    async dispatch(method: string, url: string, formData?: FormData): Promise<XMLHttpRequest> {
        if (db) console.log("XML Http Req url=" + url);

        if (formData && method !== "POST") {
            throw Error("method must be POST to send formData");
        }
        /*
let serialisedJson = JSON.stringify(anyObject);
let formData = new FormData();
formData.append('initializationData', serialisedJson);
// fileObject is an instance of File
if (fileObject) {
    // the 'jsonFile' name might cause some confusion:
    // in this case, the uploaded file is actually a textfile containing json data
    formData.append('jsonFile', fileObject);
}
*/
        //https://www.html5rocks.com/en/tutorials/file/xhr2/
        // jQuery.ajax({
        //     url: url,
        //     type: 'POST',
        //     data: formData,
        //     contentType: false,      // tell jQuery not to adjust content-type
        //     processData: false,      // tell jQuery not to convert raw data to string
        //     success: function (data) {
        //     },
        // });

        let promise = new Promise<XMLHttpRequest>((resolve, reject) => {
            let xhr = new XMLHttpRequest();

            xhr.onload = () => {
                if (xhr.status !== 200) {
                    if (db) console.error("err: response not OK, failed to fetch url=" + url, xhr);

                    let exc = new MyError(`url=${url} (${xhr.status}: ${xhr.statusText})`);

                    exc.htmlMessage += `<br><br>url: <a href='${url}' target='_error'> ${url}</a>`;
                    console.trace("DataApiDispatcher.fetch.response.NotOK", exc);
                    reject(exc); //code after reject will continue to run
                }
                else {
                    let headers = this.getHeaders(xhr);
                    headers = MapX.lowercaseKeys(headers);
                    const contentType = headers.get("content-type");
                    if (!contentType) {
                        let errMesg = `unknown respond content type for url ${url}, map=` + MapX.toStr(headers);
                        console.error(errMesg, headers);
                        throw Error(errMesg); //-------------------------
                    }
                    resolve(xhr);
                }
            };
            xhr.onerror = (err) => {
                console.error("XMLHttpRequestX.onerror: ", err);
                reject(err);
            };
            xhr.open(method, url, true);

            if (formData) {
                windowExtBag.formData = formData;
                let httpBody: any = null;

                if (False || NavigatorX.isAntiquatedBrowser) {
                    if (FormDataX.containsFileEntries(formData)) {
                        if (NavigatorX.isAntiquatedBrowser) {
                            throw Error("File upload not yet supported in IE11");
                        }
                        httpBody = formData;
                    }
                    else {
                        httpBody = FormDataX.buildURLSearchPart(formData, false);
                        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    }
                }
                else {
                    httpBody = formData;
                }
                //xhr.setRequestHeader('Content-Type', 'multipart/form-data'); //; boundary=---------------------------314911788813839
                //xhr.setRequestHeader('Content-Type', 'text/plain; charset=utf-8'); //default

                //xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
                //httpBody = JSON.stringify(formData);

                xhr.send(httpBody);
                //xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                //xhr.send(encodeURI('name=' + 'john smiths'));
                //xhr.send(JSON.stringify(formData));
            }
            else {
                xhr.send();
            }
        });
        return promise;
    }
    /*
    -------------------------------------------------------
    Content-Type: application/x-www-form-urlencoded

    foo=bar&baz=The+first+line.%0D%0AThe+second+line.%0D%0A

    -------------------------------------------------------
    Content-Type: text/plain

    foo=bar
    baz=The first line.
    The second line.
    -------------------------------------------------------

Content-Type: multipart/form-data; boundary=---------------------------314911788813839

-----------------------------314911788813839
Content-Disposition: form-data; name="foo"

bar
-----------------------------314911788813839
Content-Disposition: form-data; name="baz"

The first line.
The second line.

-----------------------------314911788813839--
    */
    //=========================================================================
    getHeaders(xhr: XMLHttpRequest): Map<string, string> {

        let headersStr = xhr.getAllResponseHeaders();
        let headers = new Map<string, string>();
        // Cache-Control: max-age=31536000
        // Content-Length: 4260
        // Content-Type: image/png
        // Date: Sat, 08 Sep 2012 16:53:16 GMT

        // allHeaders.split('\r\n')
        //     .reduce((result: any, current: string) => {
        //         let [name, value] = current.split(': ');
        //         result[name] = value;
        //         return result;
        //     }, {});
        if (ConfigX.isDebug) {
            console.log("parsin headers: " + headersStr);
        }
        // accept-ranges: bytes
        // connection: keep-alive
        // content-length: 1483
        // content-type: text/html; charset=UTF-8
        // date: Thu, 30 Jan 2020 16:37:11 GMT
        // etag: W/"5cb-T59qmRlEszzK9rZ9wqTpfFSyqiI"
        // x-powered-by: Express

        let arr: string[] = headersStr.split('\r\n');
        arr.forEach(s => {
            if (s) {
                let [name, value] = s.split(': ');

                try {
                    //headers.append(name, value);
                    headers.set(name, value);
                }
                catch (err) {
                    //TypeError: Failed to execute 'append' on 'Headers': Invalid name
                    let errMesg = `fail to append, name=[${name}], value = [${value}]`;
                    console.warn(errMesg, err);
                }
            }
        });
        // headers['Content-Type'] = 'image/png'
        return headers;
    }

    static arrayBufferToBase64String(buffer: ArrayBuffer) {
        let binaryString = '';
        let bytes = new Uint8Array(buffer);
        for (let i = 0; i < bytes.byteLength; i++) {
            let b: number = bytes[i];
            let s = String.fromCharCode(b);
            binaryString += s;
        }
        return window.btoa(binaryString);
        //let strByteArray:string = btoa(String.fromCharCode.apply(null, myUint8Array));
        //C# byte[] myByteArray = Convert.FromBase64String(strByteArray);
    }
}

/*

var fileSize = new FileInfo(filePathAbs).Length;
context.Response.AddHeader("Content-Length", fileSize.ToString());
context.Response.AddHeader("content-disposition", "inline;filename=" + fileName);

var req = new XMLHttpRequest();

req.open('GET', '/EReader/GetDocument?p=@Model.EncodedTempFilePath');
req.responseType = "arraybuffer";
req.onprogress = function (event) {
    if (event.lengthComputable) {
        percentage = Math.floor(event.loaded * 100 / event.total); // give the percentage
        var elem = document.getElementById("bar");
        elem.style.width = percentage + '%';
    }
};
------------
   req = new XMLHttpRequest();
    if(req.overrideMimeType){
        req.overrideMimeType( "text/json" );
    }

HTTP/1.1 200 OK
ETag: "hKXdZA"
Date: Wed, 20 Jun 2012 20:17:17 GMT
Expires: Wed, 20 Jun 2012 20:17:17 GMT
Cache-Control: private, max-age=3600
X-AppEngine-Estimated-CPM-US-Dollars: $0.000108
X-AppEngine-Resource-Usage: ms=2 cpu_ms=0 api_cpu_ms=0
Content-Type: application/json
Content-Encoding: gzip
Server: Google Frontend
Content-Length: 621606

ProgressEvent Properties and Methods
lengthComputable	Returns whether the length of the progress can be computable or not (whether the total size of the operation is known)
indicating if the resource concerned by the ProgressEvent has a length that can be calculated. If not, the ProgressEvent.total property has no significant value.
loaded	Returns how much work has been loaded
total	Returns the total amount of work that will be loaded

*/
