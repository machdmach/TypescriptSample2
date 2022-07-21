import { CssOmLib } from "./CssOmLib.js";
import { DOMStringMapX } from "./DOMStringMapX.js";

export class CSSStyleDeclarationX {

    static createNew(): CSSStyleDeclaration {
        let css: CSSStyleDeclaration = document.createElement('div').style;
        return css;
    }

    constructor(private elt: HTMLElement, private propertyName: string) {
    }

    setWaitCusor() {
    }
    static showProperties(elt: HTMLElement) {
        let style = elt.style;
        let s3: CSSStyleDeclaration = Object.assign({}, style);

        console.log({ s3 });
        console.log(JSON.stringify(s3));

        let propNames = Object.getOwnPropertyNames(s3);
        console.log({ propNames });

        console.log('color', style.getPropertyValue("color"));

        let compStyles = window.getComputedStyle(elt);
        console.log('color', compStyles.getPropertyValue("color"));
    }

    //=========================================================================
    static getStyleDeclaration(selectorText: string, styleElt: HTMLStyleElement, errorMesgOnNotFound?: string): CSSStyleDeclaration {
        if (!errorMesgOnNotFound) {
            errorMesgOnNotFound = `No css Rule found for selectorText: ${selectorText} in style element with id: ${styleElt.id}`;
        }
        let styleRule = CssOmLib.getStyleRuleNullable(selectorText, styleElt, errorMesgOnNotFound);
        if (styleRule === null) throw "never";

        let styleDecl = styleRule.style;
        //styleDecl.removeProperty("display");
        return styleDecl;
    }

    //=========================================================================
    static setPropertySaveOrig(elt: HTMLElement, propertyName: string, val: string) {
        this.saveProperty(elt, propertyName);
        elt.style.setProperty(propertyName, val);
    }

    //=========================================================================
    static saveProperty(elt: HTMLElement, propertyName: string) {
        let propVal = elt.style.getPropertyValue(propertyName);
        let origVal = new DOMStringMapX(elt.dataset).get(propertyName, null);
        if (origVal === null) {
            elt.dataset[propertyName] = propVal;
        }
    }

    //=========================================================================
    static resetPropertyToOrig(elt: HTMLElement, propertyName: string) {
        let origVal = new DOMStringMapX(elt.dataset).get(propertyName, null);
        if (origVal != null) {
            elt.style.setProperty(propertyName, origVal);
        }

    }

}
