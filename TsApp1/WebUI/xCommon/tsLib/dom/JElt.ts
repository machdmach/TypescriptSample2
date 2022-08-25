import { JTags_Simple } from "./JElt_TagsSimple.js";

export class JElt extends JTags_Simple {
    constructor(el: HTMLElement) {
        super(el);
    }
    static body: JElt;
    static {
        JElt.body = new JElt(document.body);
    }

    static qs(eltOrSelector: string | Element | JElt) {
        if (eltOrSelector instanceof JElt) {
            return eltOrSelector;
        }
        else {
            return new JElt(qs(eltOrSelector));
        }
    }
    static qsNullable(eltOrSelector: string | Element | JElt) {
        if (eltOrSelector instanceof JElt) {
            return eltOrSelector;
        }
        else {
            let e = qsNullable(eltOrSelector);
            if (e === null) {
                return null;
            }
            return new JElt(e);
        }
    }

    //=========================================================================
    static qsElement(eltOrSelector: string | Element | JElt) {
        let ret: Element;
        if (eltOrSelector instanceof JElt) {
            ret = eltOrSelector.el;
        }
        else {
            return ret = qs(eltOrSelector);
        }
        return ret;
    }

    //=========================================================================
    surroundsWith(outerElt: Element | JElt) {
        let outerEl = JElt.qsElement(outerElt);
        let parent = this.el.parentElement;
        if (parent) {
            parent.insertBefore(outerEl, this.el);
        }
        outerEl.appendChild(this.el);
        return this;
    }

    //=========================================================================
    static createRoot(tagName: string, classOrStyle?: string) {
        let newEl = document.createElement(tagName);
        if (classOrStyle) {
            if (classOrStyle.includes(':')) {
                newEl.setAttribute('style', classOrStyle);
            }
            else {
                newEl.className = classOrStyle;
            }
        }
        return new JElt(newEl);
    }

    createDetailsSummary(summaryText: string, classOrStyle?: string) {
        let ret = this.createChild("details", classOrStyle);
        ret.createChild("summarry").el.innerHTML = summaryText;
        //DetailsSummaryX.setupOpenCloseState_HLS(detailsElt, "devLinks");
        return ret;
    }
}
