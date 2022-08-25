//elt.cssList: List of Css Classes <div class='class1 class2'>
//#cssClass #cssOm
export class DOMTokenListX {
    constructor(elt) {
        this.elt = elt;
        this._classList = this.elt.classList;
        this.origClassListValue = this.elt.classList.value;
    }
    get classList() {
        return this._classList;
    }
    appendToToken(token, suffix) {
        if (!this._classList.contains(token)) {
            throw Error("no token found: " + token + ", validTokens are: " + this._classList.value);
        }
        this._classList.replace(token, token + suffix);
    }
    reset() {
        this._classList.value = this.origClassListValue;
    }
}
