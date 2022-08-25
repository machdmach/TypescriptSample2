import { StringBuilder } from "./StringBuilder.js";
import { AssertX } from "./AssertX.js";
/*
Content-Type: application/x-www-form-urlencoded
Content-Type: multipart/form-data; boundary=----formdata-polyfill-0.3122345992898219
*/

export class FormDataX {

    static buildURLSearchPart(fd: FormData, includePrefixQuestionMark = true) { //aka. InterrogationPoint
        function encode(t: string) {
            return encodeURIComponent(t).replace(/%20/g, '+');
        }
        let buf = new StringBuilder();
        let k = 0;
        if (includePrefixQuestionMark) {
            buf.append("?");
        }

        AssertX.functionExists("entries", fd, "buildURL");
        let entries = fd.entries();

        for (let pair of entries) {
            let key = pair[0];
            let fdEntryValue = pair[1];

            if (k > 0) {
                buf.append("&");
            }
            buf.append(key);
            buf.append("=");
            if (fdEntryValue instanceof File) {
                let errMesg = "cannot build URLSearchPart from File, key=" + key;
                console.error(errMesg);
                throw Error(errMesg);
            }
            let uriComponentEncoded = encode(fdEntryValue);
            buf.append(uriComponentEncoded);
            k++;
        }
        return buf.toString();
    }

    //=========================================================================
    static containsFileEntries(fd: FormData) {
        if (TrueTodo) throw "unimplemented";
        if (TrueTodo) return false;

        AssertX.functionExists("entries", fd, "containsFile");
        for (let pair of fd.entries()) {
            let key = pair[0];
            let fdEntryValue: FormDataEntryValue = pair[1];
            if (fdEntryValue instanceof File) {
                return true;
            }
        }
        return false;
    }

    //=========================================================================
    static toObject(formData: FormData) {
        let ret = {} as any;
        formData.forEach(function (value, key) {
            ret[key] = value;
        });
        //var json = JSON.stringify(ret);
        return ret;
    }

    static toStr(fd: FormData, isDebug: boolean = false): string {
        const buf: StringBuilder = new StringBuilder();
        try {
            let entryCount = 0;

            for (let pair of fd.entries()) {
                buf.appendLine(`${entryCount + 1} ${pair[0]}: ${pair[1]}`);
                entryCount++;
            }
            buf.prependLine("#OfEntries: " + entryCount);

            const rval = buf.toString();
            if (isDebug) {
                console.log('FormData.toStr', fd, rval);
            }
            return rval;
        }
        catch (err) {
            return "MS.Edge issue:" + err;
        }
    }

    //=========================================================================
    static GetSampleFormData(): FormData {
        //https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
        const fd = new FormData();

        fd.append("username", "Groucho");
        fd.append("accountnum", "123456"); // number 123456 is immediately converted to a string "123456"

        // HTML file input, chosen by user
        //<input id="the-file" name="file" type="file">
        //const fileInputElt = document.getElementById('the-file');
        //formData.append("userfile", fileInputElt.files[0]);

        // JavaScript file-like object
        const content = '<a id="a"><b id="b">hey!</b></a>'; // the body of the new file...
        const blob = new Blob([content], { type: "text/xml" });

        fd.append("webmasterfile", blob);
        return fd;
    }
    //=========================================================================
    static fromObject2(obj: any, fd: FormData, namespace = ''): FormData {
        //let formData = form || new FormData();
        for (let propertyName in obj) {
            if (!obj.hasOwnProperty(propertyName) || obj[propertyName] === undefined) continue;
            let formKey = namespace ? `${namespace}[${propertyName}]` : propertyName;
            if (obj[propertyName] instanceof Date) {
                //formData.append(formKey, this.to.dateTimeToString(model[propertyName]));
            }
            else if (obj[propertyName] instanceof Array) {
                obj[propertyName].forEach((element: any, index: number) => {
                    if (typeof element !== 'object')
                        fd.append(`${formKey}[]`, element);
                    else {
                        const tempFormKey = `${formKey}[${index}]`;
                        //this.convertModelToFormData(element, fd, tempFormKey);
                    }
                });
            }
            else if (typeof obj[propertyName] === 'object' && !(obj[propertyName] instanceof File)) {
                //this.convertModelToFormData(obj[propertyName], fd, formKey);
            }
            else {
                fd.append(formKey, obj[propertyName].toString());
            }
        }
        return fd;
    }
    //=========================================================================
    static fromObject3(obj1: object, rootName?: string, ignoreList?: any[]) {
        const formData = new FormData();

        function appendFormData(obj: any, root: string = '') {
            if (!ignore(root)) {
                root = root || '';
                if (obj instanceof File) {
                    formData.append(root, obj);
                } else if (Array.isArray(obj)) {
                    for (let i = 0; i < obj.length; i++) {
                        appendFormData(obj[i], root + '[' + i + ']');
                    }
                } else if (typeof obj === 'object' && obj) {
                    for (const key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            if (root === '') {
                                appendFormData(obj[key], key);
                            } else {
                                appendFormData(obj[key], root + '.' + key);
                            }
                        }
                    }
                } else {
                    if (obj !== null && typeof obj !== 'undefined') {
                        formData.append(root, obj);
                    }
                }
            }
        }

        function ignore(root: string) {
            return Array.isArray(ignoreList)
                && ignoreList.some(function (x) { return x === root; });
        }

        appendFormData(obj1, rootName);

        return formData;
    }
}
