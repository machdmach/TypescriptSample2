import { DomLib } from "./DomLib.js";
import { HtmlEntity } from "./HtmlEntity.js";

export class HTMLElementOverlay {

    overlayElt: HTMLElement | null;
    containerElt: HTMLElement;
    mesgElt: HTMLElement;
    progressBarElt: HTMLElement;
    showStartTime: number = uninit;

    //=========================================================================
    constructor(containerElt?: HTMLElement) {
        containerElt = document.body;
        this.containerElt = containerElt;
        const add_child = function (tagName: string, className: string, parentElt: HTMLElement) {
            let elt = document.createElement(tagName);
            elt.classList.add(className);
            parentElt.appendChild(elt);
            return elt;
        };

        let outerMost = add_child("div", "overlayx", containerElt);
        if (true) {
            let s = outerMost.style;
            s.position = 'fixed';
            s.top = '0';
            s.left = '0';
            s.width = '100%';
            s.height = '100%';
            s.zIndex = DomLib.getNextZIndex();
            s.display = 'none';
            this.overlayElt = outerMost;
        }
        if (true) {
            let bg = add_child("div", "overlayx-bg", outerMost);
            let s = bg.style;
            s.backgroundColor = 'lightgoldenrodyellow';
            s.opacity = ".3";
            s.width = '100%';
            s.height = '100%';
        }

        let contentElt = add_child("div", "overlayx-content", outerMost);
        if (true) {
            let s = contentElt.style;
            s.position = 'absolute';
            s.top = '30%';
            s.left = '0%';
            s.width = '100%';
            //s.height = '100%';
            s.textAlign = 'center';
        }
        if (true) {
            let div = document.createElement("div");
            contentElt.appendChild(div);
            div.appendChild(HtmlEntity.busyElement);
        }
        if (true) {
            this.mesgElt = add_child("div", "overlayx-text", contentElt);
            let s = this.mesgElt.style;
            s.fontSize = '1.8em';
            s.fontWeight = 'bold';
        }
        if (true) {
            this.progressBarElt = add_child("div", "overlayx-progressBar", contentElt);
            let s = this.progressBarElt.style;
            s.fontSize = '2.8em';
            s.fontWeight = 'bold';
        }
    }
    //=========================================================================
    static showOverlay(textLine1?: string, textLine2?: string) {
        let containerElt: HTMLElement = document.body;
        let ol = new HTMLElementOverlay(containerElt);
        ol.show(textLine1, textLine2);
        return ol;
    }
    //=========================================================================
    show(textLine1?: string, textLine2?: string) {
        if (this.overlayElt === null) {
            throw Error("overlayElt already closed?");
        }
        let promise = Promise.resolve(0);
        this.overlayElt.style.display = 'unset';

        this.showStartTime = Date.now();

        if (typeof textLine1 === 'undefined') {
            textLine1 = "Loading data";
        }
        if (typeof textLine2 === 'undefined') {
            textLine2 = "Please wait...";
        }
        let mesg = "";
        if (textLine1 != null) {
            mesg = textLine1;
        }
        if (textLine2 != null) {
            mesg += "<br>";
            mesg += `<span style='font-size: .9em'>${textLine2}</span>`;
        }
        this.mesgElt.innerHTML = mesg;
    }
    //=========================================================================
    private _hideOverlay() {
        if (this.overlayElt === null) { return; }

        this.overlayElt.style.display = 'none';
        this.overlayElt.remove();
        this.overlayElt = null;
    }
    hide(): Promise<number> {
        return this.hideWithDelay(Config.MinDataWaitTime);
    }
    //=========================================================================
    hidezz(minMillis?: number): Promise<number> {
        if (minMillis !== undefined) {
            return this.hideWithDelay(minMillis);
        }
        else {
            this._hideOverlay();
            return Promise.resolve(0);
        }
    }
    //=========================================================================
    hideWithDelay(minMillis: number): Promise<number> {
        if (this.overlayElt === null) { return Promise.resolve(0); }

        let elapsedTimeSinceShow = Date.now() - this.showStartTime;
        let timeLeftToShow = minMillis - elapsedTimeSinceShow;

        let promise: Promise<number>;
        if (timeLeftToShow > 0) {
            promise = new Promise<number>((resolve, reject) => {
                console.log('MinDataWaitTime, overlay is being delay for: ' + timeLeftToShow + ' millis');

                let countDown = Math.round(timeLeftToShow / 1000);
                setTimeout(() => {
                    this._hideOverlay();
                    resolve(timeLeftToShow);
                }, timeLeftToShow);

                this.progressBarElt.style.color = "red";
                if (countDown > 0) {
                    this.progressBarElt.textContent = "" + countDown;
                }
                countDown--;

                let intervalGuard = 0;
                let intervalHandle = setInterval(() => {
                    if (intervalGuard++ > 500) {
                        clearInterval(intervalHandle);
                        throw Error("setInterval running too many times: " + intervalGuard);
                    }
                    if (countDown < 0) {
                        clearInterval(intervalHandle);
                        console.log("hideWithDelay, interval stopped, counting down LT 0");
                    }
                    if (countDown > 0) {
                        this.progressBarElt.textContent = "" + countDown;
                    }
                    countDown--;
                    console.log("counting down: " + countDown);
                }, 1000);
            });
        }
        else {
            this._hideOverlay();
            promise = Promise.resolve(0);
        }
        return promise;
    }

    //=========================================================================
    static async tests() {
        let ol = new HTMLElementOverlay(document.body);
        ol.show('111');
        let p1 = ol.hideWithDelay(1113000);
    }
}
