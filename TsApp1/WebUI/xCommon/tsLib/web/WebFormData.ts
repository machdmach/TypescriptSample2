
import { ASCIIString } from "../core/ASCIIString.js";
import { NavigatorX } from "../dom/NavigatorX.js";
import { FormDataX } from "../core/FormDataX.js";

/*
Content-Type: application/x-www-form-urlencoded
Content-Type: multipart/form-data; boundary=----formdata-polyfill-0.3122345992898219
*/

export class WebFormData {

    //=========================================================================
    static collectFormData(frm: HTMLFormElement, isDebug: boolean = true): FormData {
        let fdx = new FormData(frm);
        if (NavigatorX.isAntiquatedBrowser) {
            fdx = this.collectFormData2(frm);
        }
        return fdx;
    }

    //=========================================================================
    static collectFormData2(frm: HTMLFormElement, isDebug: boolean = true): FormData {

        //https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
        const fd = new FormData();

        let nodes: HTMLElement[] = Array.prototype.slice.call(frm.elements);

        let elt: HTMLElement;
        for (elt of nodes) {
            let info = "";
            let eltName: string | null = elt.getAttribute("name");
            if (eltName == null) {
                console.log("elt doesn't contain attribute [name]: " + elt.tagName);
                continue;
            }
            let eltVal: string | null = '';

            if (elt instanceof HTMLInputElement) {
                if (elt.type === "date") {
                    eltVal = elt.value;
                }
                if (elt.type === "file") {
                    if (elt.files != null) {
                        let fileList: FileList = elt.files;

                        console.log('elt', elt);

                        if (elt.hasAttribute("multiple")) {
                            console.error("multiple files", elt);
                            throw Error("multiple files");
                        }
                        if (fileList.length > 0) {
                            let file: File | null = fileList.item(0);
                            if (file != null) {
                                fd.append(eltName, file);
                            }
                        }
                    }
                }
                else if (elt.type === "checkbox") {
                    if (elt.checked) {

                        eltVal = elt.value;
                    }
                    else {
                        continue;
                    }
                }
                else {
                    eltVal = elt.value;
                }
            }
            else if (elt instanceof HTMLTextAreaElement) {
                eltVal = elt.value;
            }
            else if (elt instanceof HTMLSelectElement) {
                eltVal = elt.value;
            }

            console.log(`eltName=${eltName}, eltVal=${eltVal}, type=${elt.constructor}`);

            let [ok, err] = ASCIIString.isValidASCIIOnlyData(eltVal);
            if (!ok) {
                throw Error("Field: " + eltName + "<br> " + err);
            }
            fd.append(eltName, eltVal || "");
        }//endfor

        return fd;
    }
    //=========================================================================
    static stringifyFormData(formElt: HTMLFormElement): string {
        let fd = new FormData(formElt);
        //let fdStr = FormDataX.toStr(fd);
        let fdObj = FormDataX.toObject(fd);
        let ret = JSON.stringify(fdObj);
        return ret;
    }
}
