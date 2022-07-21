import { StringBuilder } from "../pSystemX/StringBuilder.js";

export class ElementX { // HTMLElement - Element - Node - EventTarget
    //static main1: HTMLMainElement;
    static header: HTMLHeadElement;
    //static footer: Footer
    //static section: HtmlSection
    static svgzz: SVGElement;
    static htmlzz: HTMLElement;
    //static article: HtmLArti

    //=========================================================================
    createElt_eg2(className: string, parentElt: Element, tagName = "div") {
        let elt = document.createElement(tagName);
        elt.className = className;
        parentElt.appendChild(elt);
        return elt;
    }

    createElt_eg(tagName: string, className: string, parentElt: Element) {
        let elt = document.createElement(tagName);
        elt.className = className;
        parentElt.appendChild(elt);
        return elt;
    }

    //=========================================================================
    static insertBefore(newChild: Element, refChildOrSelector: HTMLElement | string) {
        let refChild: Element = qs(refChildOrSelector);
        let parentElt = refChild.parentElement;
        if (!parentElt) throw "parent Element is null for: " + getTagNameIDClass(refChild);
        parentElt.insertBefore(newChild, refChild);
    }
    //=========================================================================
    static insertAfter(newChild: Element, refChildOrSelector: HTMLElement | string) {
        let refChild: Element = qs(refChildOrSelector);
        let parentElt = refChild.parentElement;
        if (!parentElt) throw "parent Element is null for: " + getTagNameIDClass(refChild);
        parentElt.insertBefore(newChild, refChild.nextSibling);
    }

    //=========================================================================
    static replaceChild(newChild: Element, oldChildOrSelector: HTMLElement | string) {
        let oldChild: Element = qs(oldChildOrSelector);
        let parentElt = oldChild.parentElement;
        if (!parentElt) throw "parent Element is null for: " + getTagNameIDClass(oldChild);
        parentElt.replaceChild(newChild, oldChild);
    }
    //=========================================================================
    static replaceInnerHTML(targetEltOrSelector: HTMLElement | string, newChild: Node) {
        let targetElt: Element = qs(targetEltOrSelector);
        //debugger
        if (!(targetElt instanceof Element)) {
            throw Error(`${targetEltOrSelector} is not an Html Element`);
        }
        targetElt.innerHTML = "";
        if (!(newChild instanceof Node)) {
            throw Error(`${newChild} is not a type of  Node`);
        }

        targetElt.appendChild(newChild);
    }

    //=========================================================================
    static toStr(elt: Element, isDebug: boolean = false): string {
        let buf: StringBuilder = new StringBuilder();

        let sel: HTMLSelectElement;
        //sel.options
        //elt.setAttribute

        //sel.onclick

        let rval = buf.toString();
        if (isDebug) {
            console.log('FormData.toStr', elt, rval);
        }
        return rval;
    }

    //=========================================================================
    static gotoBottom(selector: string | HTMLElement) {
        let elt = qs(selector);
        elt.scrollTop = elt.scrollHeight - elt.clientHeight;
    }

    //=========================================================================
    static isTheEndOfItsScroll(element: Element) {
        //return element.scrollHeight - element.scrollTop === element.clientHeight;
        return element.scrollHeight - element.clientHeight === element.scrollTop;
    }

    static getSiblings(el: Element, filter: Function) {
        let siblings = [];
        if (el.parentNode !== null) {
            el = el.parentNode.firstChild as Element;
            do {
                if (!filter || filter(el)) siblings.push(el);
                el = el.nextSibling as Element;
            }
            while (el);
        }
        return siblings;
    }
    /*
    //https://plainjs.com/javascript/traversing/get-siblings-of-an-element-40/
    function getNextSiblings(el, filter) {
        var siblings = [];
        while (el= el.nextSibling) { if (!filter || filter(el)) siblings.push(el); }
        return siblings;
    }
    function getPreviousSiblings(el, filter) {
        var siblings = [];
        while (el = el.previousSibling) { if (!filter || filter(el)) siblings.push(el); }
        return siblings;
    }
    */

    //=========================================================================
    static selectElementContents(el: Element) {
        let range = document.createRange();
        range.selectNodeContents(el);
        let sel = window.getSelection();
        if (sel !== null) {
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }
    //=========================================================================
    static selectElementPart(elm: HTMLElement) {

        let fc = elm.firstChild;
        let lc = elm.lastChild;
        let range = document.createRange();

        elm.focus();
        if (fc === null) throw "fc";
        if (lc === null) throw "lc";

        range.setStart(fc, 1);
        range.setEnd(lc, 3);
        let sel = window.getSelection();
        if (sel !== null) {
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }

    //=========================================================================
    static createHotspot(containerElt: HTMLElement, callback: any, width = "100%", height = "40px"): HTMLElement {
        let e = document.createElement("div");
        e.className = "hotspot";
        let st = e.style;
        st.position = "absolute";
        st.top = "0px";
        //st.bottom = "0px";
        //st.right = "0px";
        st.left = "0px";

        width = "40px";
        //st.maxWidth = "40px";
        height = "200px";
        //st.maxHeight = "200px";
        st.width = width;
        st.height = height; // + "px";

        containerElt.appendChild(e);
        //st.backgroundColor = "green";

        e.addEventListener("click", async (ev: MouseEvent) => {
            callback();
        });
        return e;
    }
}
