import { ToggleDisplay } from "./ToggleDisplay.js";
import { DocumentX } from "./DocumentX.js";

/*
            <div style="text-align: right">
                <a id="email-requestor-link" class="anchor-classic-blue hideOnCanceled" title="Email Requestor of Changes"><i class="fas fa-envelope"></i>
                    Email Requestor</a>

                <a id="un-waitlist-link" class="anchor-classic-blue hideOnCanceled" title="Change from waitlist to reserved"><i class="fas fa-check"></i>
                    Un-Waitlist</a>

                <a id="edit-reservation-link" class="anchor-classic-blue hideOnCanceled" title="Edit Reservation Record"> <i class='fas fa-edit'></i> Edit </a>

                <a id="reactivate-reservation-link" class="anchor-classic-blue showOnCanceled"> Reactivate it</a>
            </div>

                let showHide_CancelBtn = new ElementDisplay2GroupsToggle(this.formElt, ".showOnCanceled", ".hideOnCanceled");
                showHide_CancelBtn.toggle(GarsReservationManager.isRecordCanceled(data));

*/
export class ToggleDisplay2Groups { //2 groups of elements being toggled on/off
    //=========================================================================
    positiveSwitches: ToggleDisplay[] = [];
    negativeSwitches: ToggleDisplay[] = [];
    containerElt!: HTMLElement;

    /*
    clicking on button1 will display, button2 will hide.
    */
    constructor(containerEltOrSelector?: string | HTMLElement, positiveSelector?: string | null, negativeSelector?: string | null) {
        if (!containerEltOrSelector) {
            return;
        }
        let elt = qs(containerEltOrSelector);
        this.containerElt = elt;

        //this.targetElt = elt;
        if (positiveSelector === undefined) {
            positiveSelector = ".casePositive";
        }
        if (negativeSelector === undefined) {
            negativeSelector = ".caseNegative";
        }

        if (positiveSelector !== null) {
            let positiveElts = qsMany(positiveSelector, 1, 100, elt);
            positiveElts.forEach(e => {
                this.positiveSwitches.push(new ToggleDisplay(e));
            });
        }
        if (negativeSelector !== null) {
            let negativeElts = qsMany(negativeSelector, 1, 100, elt);
            negativeElts.forEach(e => {
                this.negativeSwitches.push(new ToggleDisplay(e));
            });
        }
    }

    //=========================================================================
    toggle(flag?: boolean) {
        if (flag === undefined) {
            //if now is positive then toggle to negative(by setting flag=opposite(false))
            flag = !this.isPositive();
        }

        this.positiveSwitches.forEach(e => {
            e.toggle(flag);
        });
        this.negativeSwitches.forEach(e => {
            e.toggle(!flag);
        });
    }
    togglePositve() {
        this.toggle(true);
    }
    toggleNegative() {
        this.toggle(false);
    }
    //=========================================================================
    isPositive() {
        if (this.positiveSwitches.length === 0) {
            throw Error("At least 1 positive Element must be set");
        }
        return this.positiveSwitches[0].isShowing();
    }
    isNegative() {
        return !this.isPositive();
    }

    //=========================================================================
    callback?: Function;
    addEventListener(eventName: string, callback: Function) {
        this.callback = callback;
    }
    //=========================================================================
    addPositiveElement(eltOrSelector: HTMLElement | string) {
        let elt = qs(eltOrSelector);
        this.positiveSwitches.push(new ToggleDisplay(elt));
        return elt;
    }
    //=========================================================================
    appendPositiveElement(eltOrSelector: HTMLElement | string) {
        let elt = this.addPositiveElement(eltOrSelector);
        this.containerElt.appendChild(elt);
    }
    //=========================================================================
    appendPositiveElementWithDownAngleIconOnLeft(textContent: string) {
        let elt = DocumentX.createSpanElementWithDownAngleIconOnLeft(textContent);
        this.appendPositiveElement(elt);
        return elt;
    }
    //=========================================================================
    addNegativeElement(eltOrSelector: HTMLElement | string) {
        let elt = qs(eltOrSelector);
        this.negativeSwitches.push(new ToggleDisplay(elt));
        return elt;
    }
    //=========================================================================
    appendNegativeElement(eltOrSelector: HTMLElement | string) {
        let elt = this.addNegativeElement(eltOrSelector);
        this.containerElt.appendChild(elt);
        return elt;
    }
    //=========================================================================
    appendNegativeElementWithRightAngleIconOnLeft(textContent: string) {
        let elt = DocumentX.createSpanElementWithRightAngleIconOnLeft(textContent);
        this.appendNegativeElement(elt);
        return elt;
    }
}

//=========================================================================
export class ToggleDisplayOnClick extends ToggleDisplay2Groups {
    /*
        <div id="moreSearchOptionsSwitch" style="float: right; zfont-weight: bold" class="zbtnx btnx-link">
                <div class="caseNegative">
                    <i class="fas fa-angle-right"></i>
                    More Search Options
                </div>
                <div class="casePositive" zstyle="display: none">
                    <i class="fas fa-angle-up"></i>
                    Less Search Options
                </div>
        </div>

        let t = new ElementDisplayClickToggle("#moreSearchOptionsSwitch");
        t.addPositiveElement("#moreSearchOptions");
        //t.toggleNegative();
        t.togglePositve();
    */
    constructor(containerEltOrSelector: string | HTMLElement, positiveSelector?: string | null, negativeSelector?: string | null) {
        super();

        this.containerElt = qs(containerEltOrSelector);

        //this.targetElt = elt;
        if (positiveSelector === undefined) {
            positiveSelector = ".casePositive";
        }
        if (negativeSelector === undefined) {
            negativeSelector = ".caseNegative";
        }

        if (positiveSelector !== null) {
            let positiveElt = qs(positiveSelector, this.containerElt);
            this.positiveSwitches.push(new ToggleDisplay(positiveElt));
        }
        if (negativeSelector !== null) {
            let negativeElt = qs(negativeSelector, this.containerElt);
            this.negativeSwitches.push(new ToggleDisplay(negativeElt));
        }

        this.containerElt.addEventListener("click", () => {
            this.toggle();
            if (this.callback) {
                this.callback(this.isPositive());
            }
        });
    }

    static newInstanceEmpty(containerEltOrSelector: string | HTMLElement) {
        let ret = new ToggleDisplayOnClick(containerEltOrSelector, null, null);
        return ret;
    }
}
