
//elt.cssList: List of Css Classes <div class='class1 class2'>
//#cssClass #cssOm
export class DOMTokenListX {
    private xzx!: DOMTokenList;

    private origClassListValue: string;
    private _classList: DOMTokenList;

    constructor(private elt: HTMLElement) {
        this._classList = this.elt.classList;
        this.origClassListValue = this.elt.classList.value;
    }
    get classList(): DOMTokenList {
        return this._classList;
    }

    appendToToken(token: string, suffix: string) {
        if (!this._classList.contains(token)) {
            throw Error("no token found: " + token + ", validTokens are: " + this._classList.value);
        }
        this._classList.replace(token, token + suffix);
    }
    reset() {
        this._classList.value = this.origClassListValue;
    }
}
