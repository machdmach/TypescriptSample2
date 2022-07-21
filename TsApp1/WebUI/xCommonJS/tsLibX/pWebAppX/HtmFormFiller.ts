import { ObjectX } from "../tsLibPkg.js";
import { BooleanX } from "../pSystemX/BooleanX.js";
import { ASCIIString } from "../pSystemX/ASCIIString.js";

export class HtmFormFiller {
    elt: HTMLFormElement;
    constructor(eltID: string | HTMLFormElement) {
        if (typeof eltID === "string") {
            this.elt = qs(eltID) as HTMLFormElement;
        }
        else if (eltID instanceof HTMLFormElement) {
            this.elt = eltID;
        }
        else {
            throw Error("arg invalid type: " + typeof (eltID) + ", val=" + eltID);
        }
    }

    //=========================================================================
    static filloutForm(frm: HTMLFormElement, data: any, resetForm = true) {
        ObjectX.showOwnProperties(data, "Filling out form data");

        if (resetForm) {
            frm.reset();
        }

        let nodes: HTMLElement[] = Array.prototype.slice.call(frm.elements);

        let elt: HTMLElement;
        for (elt of nodes) {
            let eltName: string | null = elt.getAttribute("name");
            if (eltName == null) {
                continue; //---------------
            }
            if (!(eltName in data)) {
                //in operator matches keys in the object's prototype chain also.
                continue; //---------------------------------------------------------
            }

            let dataVal = data[eltName];
            let eltValType = typeof dataVal;

            if (dataVal === undefined || dataVal === null) {
                dataVal = "";
            }

            let info1 = "";
            if (elt instanceof HTMLTextAreaElement) {
                elt.value = dataVal;
                info1 += "textArea.value";
            }
            else if (elt instanceof HTMLSelectElement) {
                elt.value = dataVal;
                info1 += "select.value";
            }
            else if (elt instanceof HTMLInputElement) {
                if (elt.type === "date") {
                    if (dataVal instanceof Date) {
                        //https://www.w3schools.com/js/js_date_formats.asp
                        elt.value = dataVal.toISOString().slice(0, 10);
                        //elt.value = "2018-11-29";
                    }
                    else if (typeof dataVal === "number") { //instanceof Number) {
                        let dt = new Date(dataVal);
                        elt.value = dt.toISOString().slice(0, 10);
                    }

                    else {
                        elt.value = dataVal;
                    }
                    info1 += "input.date";
                }
                //NeedSvcPotableWater
                else if (elt.type === "radio") {
                    let b1 = BooleanX.toStr(elt.value);
                    let b2 = BooleanX.toStr(dataVal);
                    if (b1 === b2) {
                        elt.checked = true;
                    }
                    info1 += "radio, presetVal=" + elt.value;
                }
                else if (elt.type === "file") {

                    info1 += "file.";
                }
                else { //type = hidden, input, select, textarea
                    if (dataVal instanceof Date) {

                        dataVal = dataVal.toLocaleDateString("en-US");
                        dataVal = ASCIIString.removeNonPrintableAndWhitespaceChars(dataVal);
                    }
                    else {
                        //ASCIIString.isValidASCIIOnlyData()
                    }
                    elt.value = dataVal;
                    info1 += "input.else";
                }
            }
            else {
                throw Error("unknown elt: " + elt.nodeName);
            }
            console.log(`filling form: ${eltName}=${dataVal} ${eltValType}, ${info1}`);
        }//endfor
    }
}
