import { DOMStringMapX } from "./DOMStringMapX.js";
import { HostLocalStorage } from "../core/StorageX.js";
export class DetailsSummary {
    constructor(summaryText) {
        this.onOpen = null;
        this.onClose = null;
        let de = document.createElement("details");
        let se = document.createElement("summary");
        se.textContent = summaryText; //"  Publications "; // + re.KeyID;
        de.appendChild(se);
        this.summaryEl = se;
        this.detailsEl = de;
        this.setupEventListeners();
    }
    //=========================================================================
    setupEventListeners() {
        this.detailsEl.addEventListener("toggle", async (ev) => {
            let de = ev.target; //details, //currentTarget
            console.log("de", de.open, "Event", ev);
            if (de.open) {
                if (this.onOpen) {
                    await this.onOpen(ev);
                }
            }
            else { //close
                if (this.onClose) {
                    await this.onClose(ev);
                }
            }
        });
    }
    //=========================================================================
    showContent() {
        this.detailsEl.setAttribute("open", "true");
    }
    //=========================================================================
    hideContent() {
        this.detailsEl.removeAttribute("open");
    }
    //=========================================================================
    static showContentOfFirstChild(elt) {
        let detailsElt = qsFirstOrDefault("details", elt);
        if (detailsElt !== null) {
            detailsElt.setAttribute("open", "true");
        }
    }
    //=========================================================================
    styleLikeHyperlink() {
        let st = this.detailsEl.style;
        st.display = "inline";
        st.color = "blue";
    }
    //=========================================================================
    setKeyID(keyID) {
        this.detailsEl.setAttribute("data-key-id", keyID + "");
    }
    //=========================================================================
    static getKeyID(ev) {
        let de = ev.target; //details, //currentTarget
        let ds = new DOMStringMapX(de);
        let keyID = ds.getKeyId();
        return keyID;
    }
    //=========================================================================
    static findContentEltByKeyID(keyID) {
        let id = DetailsSummary.buildContentEltIDFromKeyID(keyID);
        let detailsContentElt = qs("#" + id);
        return detailsContentElt;
    }
    //=========================================================================
    static findContentEltByEvent(ev) {
        let keyID = DetailsSummary.getKeyID(ev);
        let id = DetailsSummary.buildContentEltIDFromKeyID(keyID);
        let detailsContentElt = qs("#" + id);
        return detailsContentElt;
    }
    //=========================================================================
    static buildContentEltIDFromKeyID(keyID) {
        let id = "detailsFor_" + keyID;
        return id;
    }
    setupOpenCloseState_HLS(keyName) { DetailsSummaryX.setupOpenCloseState_HLS(this.detailsEl, keyName); return this; }
}
//=========================================================================
export class DetailsSummaryX {
    static setupOpenCloseState_HLS(detailsElt, keyName) {
        let isDetailsOpenHLS = new HostLocalStorage(keyName + "-isOpen");
        detailsElt.addEventListener("toggle", event => {
            if (detailsElt.open) {
                isDetailsOpenHLS.setItem("true");
            }
            else {
                isDetailsOpenHLS.setItem("false");
            }
        });
        if (isDetailsOpenHLS.getItemOrDefault("false") === "true") {
            detailsElt.setAttribute("open", "");
        }
    }
}
