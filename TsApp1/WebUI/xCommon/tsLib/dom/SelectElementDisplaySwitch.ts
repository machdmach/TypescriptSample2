export class SelectElementDisplaySwitch {
    static setupAllSwitches(switchEventCallback: Function, callbackOnInitComplete: Function) {
        let elts = qsAll(".displaySwitch");
        elts.forEach(elt => {
            let sw = new SelectElementDisplaySwitch(elt);
            sw.addChangeEventListener(switchEventCallback);
            callbackOnInitComplete(sw);
        });
    }
    //=========================================================================
    switchElt: HTMLSelectElement;
    containerElt: HTMLElement;
    caseDefaultElt = uninit as HTMLElement;
    caseElts: HTMLElement[];
    private constructor(eltOrSelector: string | HTMLElement) {
        if (typeof (eltOrSelector) === "string") {
            this.switchElt = qs(eltOrSelector) as HTMLSelectElement;
        }
        else {
            this.switchElt = eltOrSelector as HTMLSelectElement;
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

    //=========================================================================
    addChangeEventListener(switchEventCallback: Function) {
        this.switchElt.addEventListener("change", (ev: Event) => {
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
    DisplayOffValue = "none";
    //=========================================================================
    showElement(elt: HTMLElement) {
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
    hideElement(elt: HTMLElement) {
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
