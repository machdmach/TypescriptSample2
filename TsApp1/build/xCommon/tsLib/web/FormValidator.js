export class FormValidator {
    static showValidationErrorElements(frm) {
        let nodes = frm.querySelectorAll(".val-err");
        nodes.forEach(e => {
            e.textContent = "err ";
        });
    }
    //=========================================================================
    setupMaxLengthForInputNumber(selector) {
        let elt = qs(selector);
        elt.addEventListener("input", function () {
            if (this.value.length > this.maxLength) {
                this.value = this.value.slice(0, this.maxLength);
            }
        });
        //oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
        //<input type="number"
        //oninput="this.value = this.value.replace(/[^0-9.]/g, ''); this.value = this.value.replace(/(\..*)\./g, '$1');"
        //onKeyDown="if(this.value.length==10 && event.keyCode!=8) return false;">
    }
}
