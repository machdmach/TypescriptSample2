export class ElementAttrMap {
    constructor(elt) {
        this.elt = elt;
        this.origAttrCol = {};
    }
    //=========================================================================
    switchAttr(attrName, attrVal) {
        console.log(`settingNewAttr ${attrName}=${attrVal}`);
        if (!Object.keys(this.origAttrCol).find(e => e === attrName)) {
            console.log('not yet existed');
            this.elt.hasAttribute(attrName);
            this.origAttrCol[attrName] = this.elt.getAttribute(attrName);
        }
        this.elt.setAttribute(attrName, attrVal);
    }
    //=========================================================================
    switchAttrs(newAttrs) {
        let attrNames = Object.keys(newAttrs);
        let i = 1;
        for (let attrName of attrNames) {
            let attrVal = newAttrs[attrName];
            this.switchAttr(attrName, attrVal);
            console.log(i);
            i++;
        }
    }
    //=========================================================================
    reset() {
        let i = 1;
        for (let attrName in this.origAttrCol) {
            if (!this.origAttrCol.hasOwnProperty(attrName)) {
                continue;
            }
            let attrVal = this.origAttrCol[attrName];
            console.log(`${i} settingBackAttr ${attrName}=${attrVal}`);
            if (attrVal === null || attrVal === undefined) {
                console.log(`removeAttr ${attrName}=${attrVal}`);
                this.elt.removeAttribute(attrName);
            }
            else {
                console.log(`setAttr ${attrName}=${attrVal}`);
                this.elt.setAttribute(attrName, attrVal);
            }
            i++;
        }
    }
}
