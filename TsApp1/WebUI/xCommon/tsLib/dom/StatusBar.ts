import { ElementX } from "./ElementX.js";
import { ElementDimensionsLib } from "./ElementDimensionsLib.js";
import { ThreadX } from "../core/ThreadX.js";

export class StatusBar {
    static statusBarElt: HTMLElement;
    static statusBarTextElt: HTMLElement;
    static statusBarMesgWrapperElt: HTMLElement;
    private static isEnabled = true;
    static disable() { this.isEnabled = false; }

    static init(topBarMenuElt: HTMLElement | null) {
        if (topBarMenuElt === null) {
            topBarMenuElt = qs("body>header");
        }
        if (!this.isEnabled) {
            console.log("not useStatusBar, not init");
            return;
        }

        let createEl = (className: string, parentElt: Element, tagName = "div") => {
            let elt = document.createElement(tagName); //#createElement
            if (className) { elt.className = className; }
            parentElt.appendChild(elt);
            return elt;
        };

        let el = document.createElement("section");
        el.className = "statusBar";
        this.statusBarElt = el;

        let statusBarButtonWrapperElt = createEl("statusBarButtonWrapper", el);

        if ("x") {
            let btn = createEl("", statusBarButtonWrapperElt, "button");
            btn.title = "Toggle info message";

            btn.innerHTML = "&#8560;";
            let st2 = btn.style;
            st2.fontWeight = "bold";
            st2.fontSize = "20pt";
            btn.addEventListener("click", () => {
                this.toggleMessageElt();
            });
        }

        let st = this.statusBarElt.style;
        st.visibility = "visible";

        let topPos = topBarMenuElt.getBoundingClientRect().bottom;
        if (topPos < topBarMenuElt.getBoundingClientRect().height) {
            topPos = ElementDimensionsLib.getOuterHeight(topBarMenuElt);
        }
        st.top = topPos + "px";

        console.log("statusBar top set to: " + topPos);
        this.statusBarMesgWrapperElt = createEl("statusBarMesgWrapper", el);
        document.body.appendChild(el);
    }
    static ensureInit() {
        if (!this.statusBarElt) {
            let errMesg = "statusBar hasn not been init";
            console.error(errMesg);
            throw Error(errMesg);
        }
    }
    static setTop(ordinate: number) {
        let st = this.statusBarElt.style;
        st.top = ordinate + "px";
    }

    //=========================================================================
    static currentTextMesg = "uninit";
    static async setText(mesg: string, isPermanent = false) {
        if (!this.isEnabled) {
            console.log("not useStatusBar, mesg=" + mesg);
            return;
        }
        this.ensureInit();

        this.hideMessageElt();
        await ThreadX.sleep(300);
        this.currentTextMesg = mesg;

        if (this.timeoutHandle) {
            clearTimeout(this.timeoutHandle);
        }

        let el = document.createElement("div");
        this.statusBarTextElt = el;
        el.className = "statusBarMesg";
        el.textContent = mesg;
        console.log("Setting status bar mesg to: " + mesg);

        this.statusBarMesgWrapperElt.style.display = "";
        if (location.href.includes("zzstay")) { isPermanent = true; } //for testing purpose

        if (!isPermanent) {
            setTimeout(() => {
                let st = el.style;
                st.opacity = "0.5";
                this.timeoutHandle = setTimeout(() => {
                    this.hideMessageElt();
                }, 4000); //hide the elt completely after 3 secs of fading out
            }, 3000); //initially displays for 3 secs before fading out
        }
        ElementX.replaceInnerHTML(this.statusBarMesgWrapperElt, el);
    }
    static timeoutHandle: number;

    //=========================================================================
    static toggleMessageElt() {
        let st = this.statusBarMesgWrapperElt.style;
        if (st.display === "none") {
            this.showMessageElt();
        }
        else {
            this.hideMessageElt();
        }
    }
    static showMessageElt() {
        clearTimeout(this.timeoutHandle);
        let st = this.statusBarMesgWrapperElt.style;
        st.display = "";
        this.statusBarTextElt.style.opacity = "1";
    }
    static hideMessageElt() {
        let st = this.statusBarMesgWrapperElt.style;
        st.display = "none";
    }
    static async test1() {
        let mesg = "This is a test mesg to see it it works well!";
        StatusBar.setText(mesg);

        let k = 1;
        document.addEventListener("click", () => {
            //StatusBar.setText(k + mesg);
        });
    }
}
