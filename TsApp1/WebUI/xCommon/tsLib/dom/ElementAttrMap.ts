
export class ElementAttrMap {
    zz_attrCol?: NamedNodeMap;

    private origAttrCol: any;
    constructor(private elt: Element) {
        this.origAttrCol = {};
    }

    //=========================================================================
    switchAttr(attrName: string, attrVal: string) {
        console.log(`settingNewAttr ${attrName}=${attrVal}`);

        if (!Object.keys(this.origAttrCol).find(e => e === attrName)) {
            console.log('not yet existed');

            this.elt.hasAttribute(attrName);

            this.origAttrCol[attrName] = this.elt.getAttribute(attrName);
        }
        this.elt.setAttribute(attrName, attrVal);
    }

    //=========================================================================
    switchAttrs(newAttrs: any) {
        let attrNames = Object.keys(newAttrs);
        let i: number = 1;
        for (let attrName of attrNames) {
            let attrVal: string = newAttrs[attrName];

            this.switchAttr(attrName, attrVal);
            console.log(i);
            i++;
        }
    }

    //=========================================================================
    reset() {
        let i: number = 1;
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
