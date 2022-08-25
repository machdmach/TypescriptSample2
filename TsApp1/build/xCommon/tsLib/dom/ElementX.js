import { StringBuilder } from "../core/StringBuilder.js";
export class ElementX {
    //static article: HtmLArti
    //=========================================================================
    createElt_eg2(className, parentElt, tagName = "div") {
        let elt = document.createElement(tagName);
        elt.className = className;
        parentElt.appendChild(elt);
        return elt;
    }
    createElt_eg(tagName, className, parentElt) {
        let elt = document.createElement(tagName);
        elt.className = className;
        parentElt.appendChild(elt);
        return elt;
    }
    //=========================================================================
    static insertBefore(newChild, refChildOrSelector) {
        let refChild = qs(refChildOrSelector);
        let parentElt = refChild.parentElement;
        if (!parentElt)
            throw "parent Element is null for: " + getTagNameIDClass(refChild);
        parentElt.insertBefore(newChild, refChild);
    }
    //=========================================================================
    static insertAfter(newChild, refChildOrSelector) {
        let refChild = qs(refChildOrSelector);
        let parentElt = refChild.parentElement;
        if (!parentElt)
            throw "parent Element is null for: " + getTagNameIDClass(refChild);
        parentElt.insertBefore(newChild, refChild.nextSibling);
    }
    //=========================================================================
    static replaceChild(newChild, oldChildOrSelector) {
        let oldChild = qs(oldChildOrSelector);
        let parentElt = oldChild.parentElement;
        if (!parentElt)
            throw "parent Element is null for: " + getTagNameIDClass(oldChild);
        parentElt.replaceChild(newChild, oldChild);
    }
    //=========================================================================
    static replaceInnerHTML(targetEltOrSelector, newChild) {
        let targetElt = qs(targetEltOrSelector);
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
    static toStr(elt, isDebug = false) {
        let buf = new StringBuilder();
        let sel;
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
    static gotoBottom(selector) {
        let elt = qs(selector);
        elt.scrollTop = elt.scrollHeight - elt.clientHeight;
    }
    //=========================================================================
    static isTheEndOfItsScroll(element) {
        //return element.scrollHeight - element.scrollTop === element.clientHeight;
        return element.scrollHeight - element.clientHeight === element.scrollTop;
    }
    static getSiblings(el, filter) {
        let siblings = [];
        if (el.parentNode !== null) {
            el = el.parentNode.firstChild;
            do {
                if (!filter || filter(el))
                    siblings.push(el);
                el = el.nextSibling;
            } while (el);
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
    static selectElementContents(el) {
        let range = document.createRange();
        range.selectNodeContents(el);
        let sel = window.getSelection();
        if (sel !== null) {
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }
    //=========================================================================
    static selectElementPart(elm) {
        let fc = elm.firstChild;
        let lc = elm.lastChild;
        let range = document.createRange();
        elm.focus();
        if (fc === null)
            throw "fc";
        if (lc === null)
            throw "lc";
        range.setStart(fc, 1);
        range.setEnd(lc, 3);
        let sel = window.getSelection();
        if (sel !== null) {
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }
    //=========================================================================
    static createHotspot(containerElt, callback, width = "100%", height = "40px") {
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
        e.addEventListener("click", async (ev) => {
            callback();
        });
        return e;
    }
}
