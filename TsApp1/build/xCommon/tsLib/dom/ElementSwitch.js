export class ElementSwitch {
    constructor(containerElt) {
        this.eltPos = uninit;
        this.eltNeg = uninit;
        let elt = document.createElement("div");
        containerElt.appendChild(elt);
        this.containerElt = elt;
    }
    //=========================================================================
    createElementPos(tagName, textContent) {
        let elt = document.createElement(tagName);
        if (textContent) {
            //elt.textContent = textContent;
            elt.innerHTML = textContent;
        }
        this.setElementPos(elt);
        return elt;
    }
    createElementNeg(tagName, textContent) {
        let elt = document.createElement(tagName);
        if (textContent) {
            elt.innerHTML = textContent;
        }
        this.setElementNeg(elt);
        return elt;
    }
    //=========================================================================
    setElementPos(elt) {
        this.eltPos = elt;
        this.containerElt.appendChild(elt);
        this.showElement(elt);
    }
    setElementNeg(elt) {
        this.eltNeg = elt;
        this.containerElt.appendChild(elt);
        this.hideElement(elt);
    }
    //=========================================================================
    switchToElementPos(flag = true) {
        this.switchElement(flag);
    }
    switchToElementNeg(flag = true) {
        this.switchElement(!flag);
    }
    switchElement(isPos) {
        if (isPos) {
            this.showElement(this.eltPos);
            this.hideElement(this.eltNeg);
        }
        else {
            this.showElement(this.eltNeg);
            this.hideElement(this.eltPos);
        }
    }
    hideElement(elt) {
        if (elt && elt !== uninit) {
            let st = elt.style;
            st.display = "none";
        }
    }
    showElement(elt) {
        if (elt && elt !== uninit) {
            let st = elt.style;
            st.display = "";
        }
    }
}
