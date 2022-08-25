
export class HTMLVideoElementX {

    vid: HTMLVideoElement;
    constructor(selectorOrElt: string | HTMLElement) {
        this.vid = qs(selectorOrElt) as HTMLVideoElement;
    }

    //=========================================================================
    buildControls(parentElt: HTMLElement) {
        //let el = document.createElement("div");
        let controlPane = this.createEl("div", "videoControlPanel", parentElt);
        let vid = this.vid;

        if ("pause button") {
            let el = this.createButton("Pause", "pauseBtn", controlPane);
            el.addEventListener("click", (me: MouseEvent) => {
                vid.pause();
            });
        }
        if ("play button") {
            let el = this.createButton("Play", "playBtn", controlPane);
            el.addEventListener("click", (me: MouseEvent) => {
                vid.play();
            });
        }

    }

    //=========================================================================
    createButton(btnText: string, className: string, parentElt: HTMLElement) {
        let el = this.createEl("button", className, parentElt);
        el.classList.add("btnx");
        el.classList.add("btnx-primary");
        el.innerHTML = btnText;
        return el;
    }

    //=========================================================================
    createEl(tagName: string, className: string, parentElt: HTMLElement) {
        let el = document.createElement(tagName);
        el.className = className;
        parentElt.appendChild(el);
        return el;
    }
}
