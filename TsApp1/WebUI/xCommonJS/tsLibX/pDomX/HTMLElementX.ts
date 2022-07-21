import { StringBuilder } from "../pSystemX/StringBuilder.js";
import { DOMTokenListX, ElementAttrMap, CSSStyleDeclarationSwitch } from "../tsLibPkg.js";
import { MessageBox } from "./MessageBox.js";

export class HTMLElementX {

    static toStr(elt: Element, isDebug: boolean = false): string {
        let buf: StringBuilder = new StringBuilder();

        let rval = buf.toString();
        if (isDebug) {
            console.log('FormData.toStr', elt, rval);
        }

        return rval;
    }
    //=========================================================================
    static makeContentAhrefOrShowErr(elt: HTMLElement, errMesg?: string) {
        let ahref = document.createElement("a") as HTMLAnchorElement;
        ahref.href = "javascript:void(0);";

        let eltContent = elt.textContent;
        if (eltContent === null) {
            let em = "textContent is null, " + errMesg;
            console.trace(em);
            MessageBox.showSystemError(em, "makeContentAHref");
            throw Error(em);
        }
        eltContent = eltContent.trim();
        if (eltContent.length === 0) {
            eltContent = "LinkLabel123";
        }
        ahref.textContent = eltContent;
        elt.innerHTML = "";
        elt.appendChild(ahref);
        return ahref;
    }
    //=========================================================================
    static setContentAhref(elt: HTMLElement, htmlContent: string, href: string | number = "javascript:void(0);") {
        let ahref = document.createElement("a") as HTMLAnchorElement;
        ahref.href = "" + href;
        ahref.innerHTML = htmlContent;
        elt.innerHTML = "";
        elt.appendChild(ahref);
        return ahref;
    }

    //=========================================================================
    static disableTemporarily(elt: HTMLElement, duration: number) {
        elt.setAttribute("disabled", "disabled");
        setTimeout(() => {
            elt.removeAttribute("disabled");
        }, 2000);
    }

    //=========================================================================
    isBusy: boolean = false;
    static timerID: number = 0;
    removeBusy() {
        throw ReferenceError("setBusy method must implement this method");
    }
    setBusy(btn: HTMLElement) {
        console.log('set Busy....................................');
        this.isBusy = true;
        let style: CSSStyleDeclaration = btn.style;
        let origInnerHtml = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + btn.textContent;
        let cssInlinex = new CSSStyleDeclarationSwitch(btn);

        let cssClassx = new DOMTokenListX(btn);
        let attrsx = new ElementAttrMap(btn);
        attrsx.switchAttrs({ disabled: 'disabled' });

        cssInlinex.switchStyles({ "zfont-size": "smaller", "color": "#bbb", "padding": "5px" });
        cssClassx.appendToToken("dialogx-button", "-disabled");

        let busyDuration = 'busyDuration-MDB' + (++HTMLElementX.timerID) + "Timer";
        console.time(busyDuration);

        this.removeBusy = () => {
            if (this.isBusy) {
                btn.innerHTML = origInnerHtml;
                cssInlinex.reset();
                cssClassx.reset();
                attrsx.reset();
                console.log('Busy removed.......................................');
                console.timeEnd(busyDuration);
                this.isBusy = false;
            }
        };
    }

    //=========================================================================
    static getOuterWidth(el: HTMLElement) {
        let width = el.offsetWidth;
        let style = getComputedStyle(el);
        width += parseInt(style.marginLeft, 10) + parseInt(style.marginRight, 10);
        return width;
    }
    //=========================================================================
    static getOuterHeight(el: HTMLElement) {
        let width = el.offsetHeight;
        let style = getComputedStyle(el);
        width += parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10);
        return width;
    }
}
