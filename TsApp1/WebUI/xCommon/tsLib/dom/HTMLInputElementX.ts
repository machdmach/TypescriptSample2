
import { HTMLFormElementX, } from "./HTMLFormElementX.js";

export class HTMLInputElementX {
    elt: HTMLInputElement;

    constructor(arg: HTMLInputElement) {
        if (arg instanceof HTMLInputElement) {
            this.elt = arg;
        }
        else {
            throw Error("x");
        }
        let form = this.elt.form;
    }

    //=========================================================================
    static queryElementByName(frm: HTMLFormElement, name: String): HTMLInputElement {
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
    static filloutValue(elt: HTMLInputElement, val: any): HTMLInputElement {
        if (!(elt instanceof HTMLInputElement)) {
            throw Error("Not instanceof HTMLInputElement for name: " + name);
        }
        elt.value = val;
        return elt;
    }

    //=========================================================================
    private set setElement(element: HTMLInputElement) {
        this.elt = element;
    }

    get element(): HTMLInputElement {
        return this.elt;
    }
    set setValue(val: any) {
        this.elt.value = val;
    }
    public get value(): string {
        return this.elt.value;
    }
    //=========================================================================
    toString(): string {
        let rval = HTMLInputElementX.stringify(this.elt);
        return rval;
    }

    static stringify(e: HTMLInputElement): string {
        let col: NOCollection = {};
        col.nodeName = e.nodeName; //FIELDSET, INPUT, BUTTON
        col.type = e.type;
        if (e.name) col.name = e.name;
        if (e.value) col.value = e.value;
        if (e.id) col.id = e.id;
        if (e.maxLength !== -1) col.maxlength = e.maxLength;
        col.class = e.classList;
        col.instanceof = 'HTMLInputElement';

        let rval = JSON.stringify(col);
        console.log(rval);
        return rval;
    }
}
