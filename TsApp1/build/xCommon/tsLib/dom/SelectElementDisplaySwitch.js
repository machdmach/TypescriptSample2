export class SelectElementDisplaySwitch {
    constructor(eltOrSelector) {
        this.caseDefaultElt = uninit;
        this.DisplayOffValue = "none";
        if (typeof (eltOrSelector) === "string") {
            this.switchElt = qs(eltOrSelector);
        }
        else {
            this.switchElt = eltOrSelector;
        }
        this.containerElt = qsClosest(".displaySwitchContainer", this.switchElt);
        this.caseElts = qsMany(".displaySwitchCase", 1, 10, this.containerElt);
        this.caseElts.forEach(caseElt => {
            let caseVal = caseElt.dataset.displaySwitchCase + "";
            if (caseVal.localeCompare("default", undefined, { sensitivity: 'base' }) === 0) {
                this.caseDefaultElt = caseElt;
            }
        });
        this.process_showHideElements();
    }
    static setupAllSwitches(switchEventCallback, callbackOnInitComplete) {
        let elts = qsAll(".displaySwitch");
        elts.forEach(elt => {
            let sw = new SelectElementDisplaySwitch(elt);
            sw.addChangeEventListener(switchEventCallback);
            callbackOnInitComplete(sw);
        });
    }
    //=========================================================================
    addChangeEventListener(switchEventCallback) {
        this.switchElt.addEventListener("change", (ev) => {
            this.process_showHideElements();
            switchEventCallback(this);
        });
    }
    //=========================================================================
    process_showHideElements() {
        console.log("Handling Switch Change event...");
        let selectedVal = this.switchElt.value;
        let caseEltDisplayedCount = 0;
        this.caseElts.forEach(caseElt => {
            let caseVal = caseElt.dataset.displaySwitchCase + "";
            if (caseVal.localeCompare(selectedVal, undefined, { sensitivity: 'base' }) === 0) {
                this.showElement(caseElt);
                caseEltDisplayedCount++;
            }
            else {
                this.hideElement(caseElt);
            }
        });
        if (caseEltDisplayedCount === 0) {
            if (this.caseDefaultElt !== uninit) {
                this.showElement(this.caseDefaultElt);
            }
        }
    }
    //=========================================================================
    showElement(elt) {
        if (elt.style.display === this.DisplayOffValue) {
            //if currently off
            if (elt.dataset.originalDisplayStyleValue === undefined
                || elt.dataset.originalDisplayStyleValue === "null") {
                elt.style.display = "";
            }
            else {
                elt.style.display = elt.dataset.originalDisplayStyleValue;
            }
        }
        else {
            console.log("is already on (not off)");
        }
        console.log("show elt done: ", elt);
    }
    hideElement(elt) {
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
        console.log("elt2 hide done: ", elt);
    }
}
