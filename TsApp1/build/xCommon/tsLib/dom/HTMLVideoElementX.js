export class HTMLVideoElementX {
    constructor(selectorOrElt) {
        this.vid = qs(selectorOrElt);
    }
    //=========================================================================
    buildControls(parentElt) {
        //let el = document.createElement("div");
        let controlPane = this.createEl("div", "videoControlPanel", parentElt);
        let vid = this.vid;
        if ("pause button") {
            let el = this.createButton("Pause", "pauseBtn", controlPane);
            el.addEventListener("click", (me) => {
                vid.pause();
            });
        }
        if ("play button") {
            let el = this.createButton("Play", "playBtn", controlPane);
            el.addEventListener("click", (me) => {
                vid.play();
            });
        }
    }
    //=========================================================================
    createButton(btnText, className, parentElt) {
        let el = this.createEl("button", className, parentElt);
        el.classList.add("btnx");
        el.classList.add("btnx-primary");
        el.innerHTML = btnText;
        return el;
    }
    //=========================================================================
    createEl(tagName, className, parentElt) {
        let el = document.createElement(tagName);
        el.className = className;
        parentElt.appendChild(el);
        return el;
    }
}
