export class ElementSwitch {

    containerElt: HTMLElement;
    eltPos = uninit as HTMLElement;
    eltNeg = uninit as HTMLElement;
    constructor(containerElt: HTMLElement) {
        let elt = document.createElement("div");
        containerElt.appendChild(elt);
        this.containerElt = elt;
    }

    //=========================================================================
    createElementPos(tagName: string, textContent?: string) {
        let elt = document.createElement(tagName);
        if (textContent) {
            //elt.textContent = textContent;
            elt.innerHTML = textContent;
        }
        this.setElementPos(elt);
        return elt;
    }
    createElementNeg(tagName: string, textContent?: string) {
        let elt = document.createElement(tagName);
        if (textContent) {
            elt.innerHTML = textContent;
        }
        this.setElementNeg(elt);
        return elt;
    }

    //=========================================================================
    setElementPos(elt: HTMLElement) {
        this.eltPos = elt;
        this.containerElt.appendChild(elt);
        this.showElement(elt);
    }
    setElementNeg(elt: HTMLElement) {
        this.eltNeg = elt;
        this.containerElt.appendChild(elt);
        this.hideElement(elt);
    }

    //=========================================================================
    switchToElementPos(flag: boolean = true) {
        this.switchElement(flag);
    }
    switchToElementNeg(flag: boolean = true) {
        this.switchElement(!flag);
    }
    switchElement(isPos: boolean) {
        if (isPos) {
            this.showElement(this.eltPos);
            this.hideElement(this.eltNeg);
        }
        else {
            this.showElement(this.eltNeg);
            this.hideElement(this.eltPos);
        }
    }

    hideElement(elt: HTMLElement) {
        if (elt && elt !== uninit) {
            let st = elt.style;
            st.display = "none";
        }
    }
    showElement(elt: HTMLElement) {
        if (elt && elt !== uninit) {
            let st = elt.style;
            st.display = "";
        }
    }
}
