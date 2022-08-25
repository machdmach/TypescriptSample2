
export class ToggleDisplay {
    targetElt: HTMLElement;
    constructor(targetEltOrSelector: string | HTMLElement) {
        this.targetElt = qs(targetEltOrSelector);
    }

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
    DisplayOffValue = "none";
    isHiding() {
        return this.targetElt.style.display === this.DisplayOffValue;
    }
    //=========================================================================
    show() {
        let elt = this.targetElt;
        if (elt.style.display === this.DisplayOffValue) {
            //if currently off
            if (elt.dataset.originalDisplayStyleValue === undefined || elt.dataset.originalDisplayStyleValue === "null") {
                elt.style.display = "";
            }
            else {
                elt.style.display = elt.dataset.originalDisplayStyleValue;
            }
        }
        else {
            console.log("is already on");
        }
        console.log("show elt done: ", elt);
    }

    //=========================================================================
    hide() {
        let elt = this.targetElt;
        if (elt.style.display === this.DisplayOffValue) {
            console.log("is already off");
        }
        else {
            if (!elt.dataset.originalDisplayStyleValue) {
                let oldVal = elt.style.display;
                if (!oldVal) {
                    oldVal = "null";
                }
                elt.dataset.originalDisplayStyleValue = oldVal;
            }
        }
        elt.style.display = this.DisplayOffValue;
        console.log("elt3 hide done: ", elt);
    }
}
