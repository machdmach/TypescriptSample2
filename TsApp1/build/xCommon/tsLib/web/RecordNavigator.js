import { CSSStyleDeclarationX } from "../dom/CSSStyleDeclarationX.js";
import { DOMStringMapX } from "../dom/DOMStringMapX.js";
import { HtmlEntity } from "../dom/HtmlEntity.js";
export class RecordNavigator {
    //=========================================================================
    constructor(form) {
        this.gridDataRowClassName = "serpDataRow";
        this.isLastNavigationSucceeded = false;
        this.timerId = 0;
        this.uiForm = form;
        this.nextButton = qsNullable("#navNextRecord", form.formElt);
        if (this.nextButton) {
            this.prevButton = qs("#navPrevRecord", form.formElt);
        }
        else {
            let containerEltId = "recordNav";
            let containerElt = qs("#" + containerEltId);
            if (containerElt) {
                this.createNavigationButtons(containerElt);
            }
            else {
                throw Error("need some info");
            }
        }
    }
    setGridDataRowClassName(val) { this.gridDataRowClassName = val; }
    get gridDataRowSelector() { return "." + this.gridDataRowClassName; }
    setFontSize(fontSize) {
        //mess up from native dialog, icons not inherting from outside div
        this.nextButton.style.fontSize = fontSize;
        this.prevButton.style.fontSize = fontSize;
    }
    createNavigationButtons(containerEltOrSelector) {
        let containerElt = qs(containerEltOrSelector);
        if ("createPrevButton") {
            let btn = document.createElement("button");
            let st = btn.style;
            st.opacity = "0.3";
            btn.title = "Previous Record";
            btn.appendChild(HtmlEntity.arrowBackElement);
            containerElt.appendChild(btn);
            this.prevButton = btn;
        }
        if ("createSpacer") {
            let spacer = document.createElement("span");
            spacer.innerHTML = "&nbsp; ";
            containerElt.appendChild(spacer);
        }
        if ("createNextButton") {
            let btn = document.createElement("button");
            let st = btn.style;
            st.opacity = "0.3";
            btn.title = "Next Record";
            btn.appendChild(HtmlEntity.arrowForwardElement);
            containerElt.appendChild(btn);
            this.nextButton = btn;
        }
    }
    //=========================================================================
    enableNextPrevRecordButtons() {
        let form = this.uiForm;
        //if ("x") return;
        let curDataRowDiv = this.getSelectedGridRow();
        if (curDataRowDiv === null) {
            return;
        }
        let nextBut = this.nextButton;
        let prevBut = this.prevButton;
        CSSStyleDeclarationX.resetPropertyToOrig(nextBut, "opacity");
        CSSStyleDeclarationX.resetPropertyToOrig(prevBut, "opacity");
        if (true) {
            let nextDataRowDiv = curDataRowDiv.nextElementSibling;
            if (nextDataRowDiv && nextDataRowDiv.classList.contains(this.gridDataRowClassName)) {
                CSSStyleDeclarationX.setPropertySaveOrig(nextBut, "opacity", "1");
                nextBut.style.opacity = "1";
            }
            else {
                //CSSStyleDeclarationX.resetPropertyToOrig(nextBut, "opacity");
                //nextBut.style.opacity = "0.5";
            }
        }
        if (true) {
            let prevDataRowDiv = curDataRowDiv.previousElementSibling;
            if (prevDataRowDiv && prevDataRowDiv.classList.contains(this.gridDataRowClassName)) {
                CSSStyleDeclarationX.setPropertySaveOrig(prevBut, "opacity", "1");
                prevBut.style.opacity = "1";
            }
            else {
                //CSSStyleDeclarationX.resetPropertyToOrig(prevBut, "opacity");
                //nextBut.style.opacity = "0.5";
            }
        }
    }
    //=========================================================================
    registerButtonClickedCallback(callback) {
        let navFunc = async (ev) => {
            console.log("recordNav event: ", ev);
            this.isLastNavigationSucceeded = false;
            //if ("x") return;
            ev.preventDefault();
            ev.stopPropagation();
            ev.stopImmediatePropagation();
            let btnClicked = ev.currentTarget;
            let isNavNext;
            if (ev instanceof KeyboardEvent) {
                //https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
                console.log("key is: ", ev);
                if (ev.key === "ArrowRight") {
                    isNavNext = true;
                }
                else if (ev.key === "ArrowLeft") {
                    isNavNext = false;
                }
                else if (ev.key === "Enter") {
                    return; //already executed via click.  pressing return key on a focus buttons generates both click and key event.
                }
                else {
                    //other key, don't call callback, just return;
                    return; //-------------------------------------------------------
                }
            }
            else {
                //mouse click.
                isNavNext = (btnClicked === this.nextButton);
            }
            let curDataRowDiv = this.getSelectedGridRow();
            if (curDataRowDiv) {
                let nextDataRowDiv = (isNavNext ? curDataRowDiv.nextElementSibling : curDataRowDiv.previousElementSibling);
                if (nextDataRowDiv && nextDataRowDiv.classList.contains(this.gridDataRowClassName)) {
                    //<a data-key-id="1674" href="javascript:void(0);" class="editLink editLinkReservation">HND-NBAA-2011-1674</a>
                    let nextRecLink = qsMany("a", 1, 3, nextDataRowDiv)[0];
                    console.log("nextRecord: ", nextRecLink);
                    let nextKeyID = new DOMStringMapX(nextRecLink.dataset).getInt("keyId");
                    console.log("calling callback with keyID: " + nextKeyID);
                    this.isLastNavigationSucceeded = true;
                    await callback(nextKeyID);
                }
            }
        };
        this.prevButton.addEventListener("click", navFunc);
        this.prevButton.addEventListener("keyup", navFunc); //#keyup, #keydown, #keypress
        this.nextButton.addEventListener("click", navFunc);
        this.nextButton.addEventListener("keyup", navFunc);
    }
    //=========================================================================
    enableButtonsAndHilightSelectedGridRow() {
        this.enableNextPrevRecordButtons();
        let ret = this.hilightSelectedGridRow();
        return ret;
    }
    //=========================================================================
    hilightSelectedGridRow() {
        let rows = qsMany(this.gridDataRowSelector, 0, 1000);
        rows.forEach(r => {
            r.style.backgroundColor = "";
        });
        let gridRowElt = this.getSelectedGridRow();
        if (gridRowElt != null) {
            gridRowElt.style.backgroundColor = "lightyellow";
        }
        return gridRowElt;
    }
    //=========================================================================
    getSelectedGridRow() {
        let form = this.uiForm;
        let keyID = form.keyID;
        if (!form.referrerDataGridID) {
            console.log("form.referrerDataGridID is null");
            if ("x")
                throw Error("form.referrerDataGridID is null");
            return null; //------------------
        }
        let gridElt = qsNullable("#" + form.referrerDataGridID);
        if (gridElt === null) {
            console.log("form.referrerDataGridID is null");
            return null; //------------------
        }
        let recLink = qsNullable(`a[data-key-id='${keyID}']`, gridElt);
        if (recLink === null) {
            return null; //------------------
        }
        let gridRowElt = qsClosest(this.gridDataRowSelector, recLink);
        return gridRowElt;
    }
    startSlideShow(pauseTime) {
        let recordNav = this;
        console.log("slideshow starting...");
        this.timerId = setInterval(() => {
            if (!recordNav.nextButton.isConnected) {
                this.stopSlideshow();
            }
            recordNav.nextButton.click();
            if (!recordNav.isLastNavigationSucceeded) {
                this.stopSlideshow();
            }
        }, pauseTime);
    }
    //=========================================================================
    stopSlideshow() {
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = 0;
            console.log("slideshow stopped");
        }
        else {
            console.log("slideshow already stopped");
        }
    }
    //=========================================================================
    restartSlideShow(pauseTime) {
        this.stopSlideshow();
        this.startSlideShow(pauseTime);
    }
}
