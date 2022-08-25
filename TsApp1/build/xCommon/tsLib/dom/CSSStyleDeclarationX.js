import { CssOmLib } from "./CssOmLib.js";
import { DOMStringMapX } from "./DOMStringMapX.js";
export class CSSStyleDeclarationX {
    constructor(elt, propertyName) {
        this.elt = elt;
        this.propertyName = propertyName;
    }
    static createNew() {
        let css = document.createElement('div').style;
        return css;
    }
    setWaitCusor() {
    }
    static showProperties(elt) {
        let style = elt.style;
        let s3 = Object.assign({}, style);
        console.log({ s3 });
        console.log(JSON.stringify(s3));
        let propNames = Object.getOwnPropertyNames(s3);
        console.log({ propNames });
        console.log('color', style.getPropertyValue("color"));
        let compStyles = window.getComputedStyle(elt);
        console.log('color', compStyles.getPropertyValue("color"));
    }
    //=========================================================================
    static getStyleDeclaration(selectorText, styleElt, errorMesgOnNotFound) {
        if (!errorMesgOnNotFound) {
            errorMesgOnNotFound = `No css Rule found for selectorText: ${selectorText} in style element with id: ${styleElt.id}`;
        }
        let styleRule = CssOmLib.getStyleRuleNullable(selectorText, styleElt, errorMesgOnNotFound);
        if (styleRule === null)
            throw "never";
        let styleDecl = styleRule.style;
        //styleDecl.removeProperty("display");
        return styleDecl;
    }
    //=========================================================================
    static setPropertySaveOrig(elt, propertyName, val) {
        this.saveProperty(elt, propertyName);
        elt.style.setProperty(propertyName, val);
    }
    //=========================================================================
    static saveProperty(elt, propertyName) {
        let propVal = elt.style.getPropertyValue(propertyName);
        let origVal = new DOMStringMapX(elt.dataset).get(propertyName, null);
        if (origVal === null) {
            elt.dataset[propertyName] = propVal;
        }
    }
    //=========================================================================
    static resetPropertyToOrig(elt, propertyName) {
        let origVal = new DOMStringMapX(elt.dataset).get(propertyName, null);
        if (origVal != null) {
            elt.style.setProperty(propertyName, origVal);
        }
    }
}
