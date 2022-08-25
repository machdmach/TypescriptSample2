import { DetailsSummary } from "./DetailsSummary.js";
import { JElt } from "./JElt.js";
import { RangeX } from "./RangeX.js";

export class SideNavBar {
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

        let linksElt = JElt.qsNullable("#serverDevLinks");
        if (linksElt === null) {
            console.log("serverDevLinks not found");
            return; //------------------------------------------
        }

        let range = document.createRange();

        range.setStartBefore(document.body.firstChild!);
        range.setEndAfter(document.body.lastChild!);

        let newBodyDiv = new JElt(document.body).createDiv("bodyDiv");
        newBodyDiv.createSection("linksEltSection").el.appendChild(linksElt.el);

        let origBodyContents = newBodyDiv.createSection("origBodyContents");
        RangeX.appendTo(range, origBodyContents.el);

        let detsum = new DetailsSummary(".").setupOpenCloseState_HLS("serverDevLinks");
        let st = detsum.detailsEl.style;
        linksElt.surroundsWith(detsum.detailsEl);
    }
}
