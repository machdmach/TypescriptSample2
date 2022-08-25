import { BooleanX } from "../core/BooleanX.js";

export class TogglingRadioButtonOptions {
    static setupRadioButtons_onChange(formElt: HTMLElement, callback?: Function) {
        let radioElts = qsAll(".divOptions input[type='radio']", formElt);
        for (let radioEltx of radioElts) {
            let radioElt = radioEltx as HTMLInputElement;

            radioElt.addEventListener("change", (ev) => {
                console.log("radio button changed", ev);
                this.showOrHideMoreDetailsDiv(ev.currentTarget as HTMLInputElement, callback);
            });
        }
    }

    //=========================================================================
    static showOrHideMoreDetailsDivsForForm(formElt: HTMLElement, callback?: Function) {
        let radioGroupElts = qsAll(".divTogglingRadioButtons", formElt);
        for (let radioGroupElt of radioGroupElts) {

            let radioElts = qsAll(".divOptions input[type='radio']", radioGroupElt);
            let atLeastOneRadioSelected = false;
            for (let radioEltx of radioElts) {
                let radioElt = radioEltx as HTMLInputElement;
                console.log("radioElt", radioElt);

                if (radioElt.checked) {
                    this.showOrHideMoreDetailsDiv(radioElt, callback);
                    atLeastOneRadioSelected = true;
                }
            }
            if (!atLeastOneRadioSelected) {
                let parentElt = radioGroupElt;
                let divShownOnTruthy = qsNullable(".divShownOnTruthy", parentElt);
                if (divShownOnTruthy != null) {
                    // divShownOnTruthy.style.visibility = "collapse";
                    // //divShownOnTruthy.dataset[].setAttribute("data-orig-display", divShownOnTruthy.style.display + "");
                    // //divShownOnTruthy.dataset.origDisplay = divShownOnTruthy.style.display + "";
                    divShownOnTruthy.style.display = "none";
                }
            }
        }
    }

    //=========================================================================
    static showOrHideMoreDetailsDiv(radioElt: HTMLInputElement, callback?: Function) {
        if (!radioElt.checked) {
            console.warn("radioElt not cheched", radioElt);
            return; //-------------------------------------------
        }
        let parentElt = qsClosest(".divTogglingRadioButtons", radioElt);
        let divShownOnTruthy = qsNullable(".divShownOnTruthy", parentElt);
        if (divShownOnTruthy != null) {
            if (BooleanX.isTruthy(radioElt.value)) {
                divShownOnTruthy.style.display = "block";
            }
            else {
                divShownOnTruthy.style.display = "none";
                console.log("hideDiv, radioElt=", radioElt);
            }
        }
        if (callback) {
            callback(radioElt);
        }
    }
}
