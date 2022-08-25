//A CSS rule-set consists of a selector and a declaration block:
// p { color:red; text-align:center}
//https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration
export class CSSStyleDeclarationSwitch {
    constructor(elt) {
        this.elt = elt;
        this.origStyleDecl = Object.assign({}, elt.style);
        this.style = this.elt.style;
        this.newProperties = {};
    }
    //=========================================================================
    switch(pName, pVal) {
        console.log(`settingNewCSS ${pName}=${pVal}`);
        this.style.setProperty(pName, pVal);
        this.newProperties[pName] = pVal;
    }
    //=========================================================================
    switchStyles(newProps) {
        let propNames = Object.getOwnPropertyNames(newProps);
        //console.log('newProperties', newProperties);
        let i = 1;
        for (let pName of propNames) {
            if (typeof pName === 'number') {
                continue;
            }
            let pVal;
            if (newProps instanceof CSSStyleDeclaration) {
                pVal = newProps.getPropertyValue(pName);
            }
            else {
                pVal = newProps[pName];
            }
            // console.log(`${i} settingNewCSS ${pName}=${pVal}`);
            this.switch(pName, pVal);
            i++;
        }
    }
    //=========================================================================
    reset() {
        this.switchBackToOrig();
    }
    switchBackToOrig() {
        let i = 1;
        let propNames = Object.keys(this.newProperties);
        if (propNames.length === 0) {
            console.log('no css to switchback');
        }
        for (let pName of propNames) {
            let pVal = this.origStyleDecl[pName];
            console.log(`${i} settingBackCSS ${pName}=${pVal}`);
            this.style.setProperty(pName, pVal);
            i++;
        }
    }
    toggle() {
        throw Error("Not implemented");
    }
}
//=========================================================================
export class CSSStyleDeclarationSwitchOne {
    constructor(elt, propertyName) {
        this.elt = elt;
        this.propertyName = propertyName;
        this.origStyleDecl = Object.assign({}, elt.style);
        this.style = this.elt.style;
    }
    switch(newPropertyValue) {
        let propName = this.propertyName;
        console.log(`setting propName=${propName}, newPropertyValue= ${newPropertyValue}`);
        this.style.setProperty(propName, newPropertyValue);
    }
    switchBackToOrig() {
        let origVal = this.origStyleDecl[this.propertyName];
        this.style.setProperty(this.propertyName, origVal);
    }
    toggle() {
        throw Error("Not implemented");
    }
}
