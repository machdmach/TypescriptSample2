import { StringBuilder } from "../core/StringBuilder.js";
import { HTMLInputElementX } from "./HTMLInputElementX.js";
import { JQueryLib } from "../web/pWeb3PExtentions/JQueryLib.js";
/**
 * @see HTMLFormElement
 */
export class HTMLFormElementX {
    static genNextID() {
        return "formx" + (++this.currentID);
    }
    //=========================================================================
    static setupID(formElt) {
        if (formElt.id) {
            throw Error('form already has ID set: ' + formElt.id);
        }
        formElt.id = this.genNextID();
    }
    //=========================================================================
    reset() {
        //form.reset();
        //<div style="display='none';" ><input type="reset" id="rst_form"></div>
    }
    //=========================================================================
    static setFields_ID_and_LabelFor_fromName(formElt) {
        let nodes = formElt.elements;
        let formID = formElt.id;
        if (!formID) {
            let er = "";
            console.log(er = 'formID not found', formElt);
            throw Error(er);
        }
        for (let i = 0; i < nodes.length; i++) {
            let elt = nodes.item(i);
            let eltName = elt.name;
            if (eltName) {
                if (elt.parentElement) {
                    let eltLabel = elt.parentElement.querySelector("label");
                    if (eltLabel) {
                        if (eltLabel.parentElement === elt.parentElement) {
                            if (!elt.id) {
                                elt.id = formID + '_' + eltName;
                                console.log('labelFor, id autoset: ' + elt.id);
                            }
                            else {
                                console.log('labelFor: ' + elt.id);
                            }
                            eltLabel.htmlFor = elt.id;
                        }
                    }
                }
            }
        }
    }
    //=========================================================================
    static changeDateInputsToUseJQuery(f) {
        //wrapper here, so the callers don't have to do a "import { JQueryLib } from "./JQueryLib.js";
        if (Config.isUsingJQueryDialog) {
            JQueryLib.changeDateInputsToUseJQuery(f);
        }
    }
    //=========================================================================
    static disableForm(form) {
        console.log('disabling form', form);
        qs("#formFieldset", form.formElt).disabled = true;
        Array.prototype.slice.call(form.elements).forEach((e) => {
            if (e instanceof HTMLInputElement) {
            }
            if (e.nodeName !== 'FIELDSET') {
                if (e.hasAttribute("disabled")) {
                    console.log('disabling elt: ', e, e.nodeName);
                    e.setAttribute("disabled", "disabled");
                    e.style.backgroundColor = "#eee";
                }
            }
        });
    }
    //=========================================================================
    static stringify(f) {
        let zf1 = document.querySelector("#form1");
        let zf2 = document.forms[0];
        if (!f) {
            throw Error("Invalid Argument f: " + f);
        }
        let nodes = Array.prototype.slice.call(f.elements);
        let colList = new Array(); //let col = new Array();
        let buf = new StringBuilder();
        nodes.forEach((elt) => {
            let isFormField = false;
            let col = {};
            col.nodeName = elt.nodeName; //FIELDSET, INPUT, BUTTON
            isFormField = true;
            if (elt instanceof HTMLInputElement) {
                HTMLInputElementX.stringify(elt);
                isFormField = true;
            }
            else if (elt instanceof HTMLSelectElement) {
                //eltVal = elt.value;
            }
            else if (elt instanceof HTMLElement) {
                col.isHTMLElement = true;
            }
            if (isFormField) {
                colList.push(col);
            }
        });
        colList.forEach(nv => {
            buf.appendLine(JSON.stringify(nv));
            buf.appendLine();
        });
        console.log(buf.toString());
        return buf.toString();
    }
    //=========================================================================
    static getFieldsShortInfo(frm) {
        let nodes = Array.prototype.slice.call(frm.elements);
        let buf = new StringBuilder();
        buf.appendLine("Fields for form: " + frm.id);
        nodes.forEach((e) => {
            if (e instanceof HTMLInputElement) {
                if ("1")
                    HTMLInputElementX.stringify(e);
                buf.append(`name: ${e.name}`);
            }
            else if (e instanceof HTMLElement) {
                buf.append(`tagName: ${e.tagName} `);
            }
            buf.append(`nodeName: ${e.nodeName} `); //FIELDSET, INPUT, BUTTON
            buf.appendLine();
        });
        console.log(buf.toString());
        console.log(frm);
        return buf.toString();
    }
    //=========================================================================
    static getKeyIDFromFormElement(elt) {
        let formElt = qsClosest("form", elt);
        let keyIDStr = formElt.dataset.keyId;
        if (!keyIDStr) {
            throw Error("keyId not found in parent FormElement dataset");
        }
        let ret = parseInt(keyIDStr, 10);
        return ret;
    }
    //=========================================================================
    static setupChangeInputEvents(formElt, callback) {
        let nodes = Array.prototype.slice.call(formElt.elements);
        //change event: fires only when the value is commited (pressing enter key)
        //input event: fires everytime the value changes, checkbox radio
        let elt;
        for (elt of nodes) {
            let eltName = elt.getAttribute("name");
            if (eltName == null) {
                continue; //---------------
            }
            let eventType = "?";
            let info1 = "";
            if (elt instanceof HTMLTextAreaElement) {
                info1 += "textArea.value";
                eventType = "input";
            }
            else if (elt instanceof HTMLSelectElement) {
                info1 += "select.value";
                eventType = "change";
            }
            else if (elt instanceof HTMLInputElement) {
                if (elt.type === "date") {
                    info1 += "input.date";
                    eventType = "input";
                }
                //NeedSvcPotableWater
                else if (elt.type === "radio") {
                    info1 += "radio, presetVal=" + elt.value;
                    eventType = "change";
                }
                else if (elt.type === "file") {
                    info1 += "file.";
                    eventType = "change";
                }
                else {
                    info1 += "input.else";
                    eventType = "input";
                }
            }
            else {
                throw Error("unknown elt: " + elt.nodeName);
            }
            console.log(`formElt: name: ${eltName}, eventType: ${eventType}, info: ${info1}`);
            if (eventType !== "change") {
                elt.addEventListener(eventType, callback);
            }
        } //endfor
        formElt.addEventListener('change', callback);
    }
}
HTMLFormElementX.currentID = 0;
