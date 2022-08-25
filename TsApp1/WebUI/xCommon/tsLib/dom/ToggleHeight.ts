import { ElementDimensionsLib } from "./ElementDimensionsLib.js";

export class ToggleHeight {
    targetElt: HTMLElement;

    constructor(eltOrSelector: string | HTMLElement) {
        let targetElt = qs(eltOrSelector);
        this.targetElt = targetElt;
    }

    //=========================================================================
    toggle(flag?: boolean) {
        if (flag === undefined) {
            if (this.isShowing()) {
                this.hide();
            }
            else {
                this.show();
            }
        }
        else {
            if (flag) this.show();
            else this.hide();
        }
        return this.isShowing();
    }
    isShowing() {
        return !this.isHiding();
    }
    isHiding() {
        return this.targetElt.style.height === this.DisplayOffValue;
    }

    DisplayOffValue = "0px";
    //=========================================================================
    show() {
        let elt = this.targetElt;
        if (elt.style.height === this.DisplayOffValue) {
            //if currently off

            if (elt.childElementCount !== 1) {
                throw Error("Too many child elements");
            }
            let childElt = elt.children[0];
            elt.style.height = ElementDimensionsLib.getOuterHeight_px(childElt);
        }
        else {
            console.log("is already on");
        }
        console.log("show elt done: ", elt);
    }

    //=========================================================================
    hide() {
        let elt = this.targetElt;
        if (elt.style.height === this.DisplayOffValue) {
            console.log("is already off");
        }
        else {
        }
        elt.style.height = this.DisplayOffValue;
        console.log("elt3 hide done: ", elt);
    }
}
