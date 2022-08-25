import { HTMLFormElementX, } from "./HTMLFormElementX.js";
export class HTMLInputElementX {
    constructor(arg) {
        if (arg instanceof HTMLInputElement) {
            this.elt = arg;
        }
        else {
            throw Error("x");
        }
        let form = this.elt.form;
    }
    //=========================================================================
    static queryElementByName(frm, name) {
        let e = frm.querySelector(`[name=${name}]`);
        if (e == null) {
            HTMLFormElementX.getFieldsShortInfo(frm);
            throw Error("No input field found for name: " + name);
        }
        if (!(e instanceof HTMLInputElement)) {
            throw Error("Not instanceof HTMLInputElement for name: " + name);
        }
        return e;
    }
    //=========================================================================
    static filloutValue(elt, val) {
        if (!(elt instanceof HTMLInputElement)) {
            throw Error("Not instanceof HTMLInputElement for name: " + name);
        }
        elt.value = val;
        return elt;
    }
    //=========================================================================
    set setElement(element) {
        this.elt = element;
    }
    get element() {
        return this.elt;
    }
    set setValue(val) {
        this.elt.value = val;
    }
    get value() {
        return this.elt.value;
    }
    //=========================================================================
    toString() {
        let rval = HTMLInputElementX.stringify(this.elt);
        return rval;
    }
    static stringify(e) {
        let col = {};
        col.nodeName = e.nodeName; //FIELDSET, INPUT, BUTTON
        col.type = e.type;
        if (e.name)
            col.name = e.name;
        if (e.value)
            col.value = e.value;
        if (e.id)
            col.id = e.id;
        if (e.maxLength !== -1)
            col.maxlength = e.maxLength;
        col.class = e.classList;
        col.instanceof = 'HTMLInputElement';
        let rval = JSON.stringify(col);
        console.log(rval);
        return rval;
    }
}
