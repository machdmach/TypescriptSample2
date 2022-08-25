import { MyEvents } from "./MyEvents.js";
import { ElementSwitch } from "./ElementSwitch.js";
import { ToggleDisplay } from "./ToggleDisplay.js";
import { NumberArray } from "../core/NumberArray.js";
export class DataPageNavigator {
    constructor(pageNavContainerEltOrSelector, initialPageSize = 50) {
        this.showOnlyForLongPage = false;
        this.recordsLabel = "records";
        if (typeof (pageNavContainerEltOrSelector) === "string") {
            this.pageNavContainer = qs(pageNavContainerEltOrSelector);
        }
        else {
            this.pageNavContainer = pageNavContainerEltOrSelector;
        }
        this.pageNav = document.createElement("nav");
        this.pageNavContainer.appendChild(this.pageNav);
        this.mainSwitch = new ElementSwitch(this.pageNavContainer);
        this.mainSwitch.setElementPos(this.pageNav);
        if (true) {
            let elt = document.createElement("div");
            //elt.textContent = `No ${this.recordsLabel} found`;
            elt.textContent = "no~record~found";
            elt.style.fontSize = "1.2em";
            this.mainSwitch.setElementNeg(elt);
            this.noRowsFoundElt = elt;
        }
        if (true) {
            this.pageXOfYDiv = new ElementSwitch(this.createControl());
            let elt = this.pageXOfYDiv.createElementPos("div");
            let pageNumLabel = document.createElement("label");
            pageNumLabel.textContent = "Page:";
            elt.appendChild(pageNumLabel);
            let pageNumElt = document.createElement("input");
            pageNumElt.style.borderRadius = "4px";
            pageNumElt.style.border = "1px solid #ccc";
            pageNumElt.id = "pageNavPageNumControl";
            pageNumLabel.htmlFor = pageNumElt.id;
            pageNumElt.type = "number";
            pageNumElt.style.width = "50px";
            elt.appendChild(pageNumElt);
            this.pageNumberInputText = pageNumElt;
            this.appendTextChild(elt, " of ").style.fontSize = "0.9em";
            this.numberOfPagesLabel = this.appendTextChild(elt, "?");
        }
        this.firstPageBtn = this.createAnchorElementSwitch("First Page");
        this.previousPageBtn = this.createAnchorElementSwitch("« Previous Page");
        this.whatsDisplayingInfo = this.createControl();
        this.nextPageBtn = this.createAnchorElementSwitch("Next Page »");
        this.lastPageBtn = this.createAnchorElementSwitch("Last Page");
        if (true) {
            let elt = this.createControl();
            let pageSizeLabel = document.createElement("label");
            pageSizeLabel.textContent = "Page Size:";
            elt.appendChild(pageSizeLabel);
            let sel = document.createElement("select");
            sel.style.borderRadius = "4px";
            sel.style.border = "1px solid #ccc";
            sel.id = "navPagePageSizeControl";
            pageSizeLabel.htmlFor = sel.id;
            elt.appendChild(sel);
            let pageSizes = [1, 5, 10, 20, 50, 100, 500, 1000, 2000];
            if (!pageSizes.includes(initialPageSize)) {
                NumberArray.insertOrdered(pageSizes, initialPageSize);
            }
            for (let pageSizeOption of pageSizes) {
                let optionElt = document.createElement("option");
                optionElt.value = pageSizeOption + "";
                optionElt.text = optionElt.value;
                sel.appendChild(optionElt);
            }
            this.pageSizeSelections = sel;
        }
        this.pageSizeSelections.value = initialPageSize + "";
        this.pageNumberInputText.value = "1";
        let events = new MyEvents(this, "change"); //input, change
        this.events = events;
        this.setupEventListeners();
        this.displayToggle = new ToggleDisplay(this.pageNavContainer);
    }
    hide() { this.displayToggle.hide(); }
    show() { this.displayToggle.show(); }
    //=========================================================================
    createBottomNavigator(pageNavContainerEltOrSelector) {
        let topNav = this;
        let sib = new DataPageNavigator(".pageNavigatorBottom", topNav.getPageSize());
        sib.events = topNav.events;
        topNav.siblingNav = sib;
        sib.siblingNav = topNav;
        sib.showOnlyForLongPage = true;
        return sib;
    }
    //=========================================================================
    setSiblingOfEachOther(siblingNav) {
        this.siblingNav = siblingNav;
        siblingNav.siblingNav = this;
    }
    //=========================================================================
    getCurrentPageIndex() {
        let s = this.pageNumberInputText.value;
        let ret = parseInt(s + "", 10);
        if (isNaN(ret)) {
            ret = 0;
        }
        else {
            ret -= 1;
        }
        return ret;
    }
    getPageSize() {
        let ret = parseInt(this.pageSizeSelections.value, 10);
        return ret;
    }
    //=========================================================================
    createControl() {
        let elt = document.createElement("div");
        elt.className = "pageNavigatorControl";
        this.pageNav.appendChild(elt);
        return elt;
    }
    //=========================================================================
    createAnchorElementSwitch(textContent) {
        let elt = this.createControl();
        let sw = new ElementSwitch(elt);
        let posElt = sw.createElementPos("a", textContent);
        posElt.href = "#pos";
        if (textContent.includes("Prev")) {
            posElt.rel = "prev";
        }
        else if (textContent.includes("Next")) {
            posElt.rel = "next";
        }
        let negElt = sw.createElementNeg("span", textContent);
        negElt.style.opacity = "0.6";
        negElt.href = "#neg";
        return sw;
    }
    //=========================================================================
    setupEventListeners() {
        let handleEvent = (ev, newPageIndex) => {
            console.log("Input event: ", ev);
            let elt = ev.currentTarget;
            console.log("ev.currentTarget element", elt);
            let args = { pageIndex: newPageIndex, pageSize: this.getPageSize() };
            this.events.fireEvent("change", args);
        };
        this.pageNumberInputText.addEventListener("change", (ev) => {
            handleEvent(ev, this.getCurrentPageIndex());
        });
        this.pageSizeSelections.addEventListener("change", (ev) => {
            let sel = ev.currentTarget;
            if (this.siblingNav) {
                this.siblingNav.pageSizeSelections.value = sel.value;
            }
            handleEvent(ev, 0);
        });
        this.firstPageBtn.eltPos.addEventListener("click", (ev) => {
            handleEvent(ev, 0);
        });
        this.previousPageBtn.eltPos.addEventListener("click", (ev) => {
            handleEvent(ev, this.getCurrentPageIndex() - 1);
        });
        this.nextPageBtn.eltPos.addEventListener("click", (ev) => {
            handleEvent(ev, this.getCurrentPageIndex() + 1);
        });
        this.lastPageBtn.eltPos.addEventListener("click", (ev) => {
            handleEvent(ev, -1);
        });
    }
    //=========================================================================
    appendTextChild(containerElt, text) {
        let elt = document.createElement("span");
        elt.textContent = text;
        containerElt.appendChild(elt);
        return elt;
    }
    //=========================================================================
    setValues(totalRowCount, pageIndex, numberOfRowsDisplaying) {
        this.setValues_self(totalRowCount, pageIndex, numberOfRowsDisplaying);
        if (this.siblingNav) {
            this.siblingNav.setValues_self(totalRowCount, pageIndex, numberOfRowsDisplaying);
        }
    }
    //=========================================================================
    setValues_self(totalRowCount, pageIndex, numberOfRowsDisplaying) {
        if (totalRowCount < numberOfRowsDisplaying) {
            throw Error(`Bad args: totalRowCount: ${totalRowCount} LT numberOfRowsDisplaying: ${numberOfRowsDisplaying})`);
        }
        let pageSize = this.getPageSize();
        let startRowIndex = pageIndex * pageSize;
        let endRowNumber = startRowIndex + numberOfRowsDisplaying;
        let numberOfPages = Math.ceil(totalRowCount / pageSize);
        let isFirstPage = (pageIndex < 1);
        let isLastPage = (pageIndex >= numberOfPages - 1);
        this.mainSwitch.switchToElementNeg(totalRowCount === 0);
        this.pageNumberInputText.value = (pageIndex + 1) + "";
        this.firstPageBtn.switchToElementNeg(isFirstPage);
        this.previousPageBtn.switchToElementNeg(isFirstPage);
        this.nextPageBtn.switchToElementNeg(isLastPage);
        this.lastPageBtn.switchToElementNeg(isLastPage);
        this.pageXOfYDiv.switchToElementNeg(numberOfPages < 2);
        this.numberOfPagesLabel.textContent = numberOfPages + "";
        if (startRowIndex + 1 > totalRowCount) {
            startRowIndex = -1;
        }
        if (endRowNumber > totalRowCount) {
            endRowNumber = 0;
        }
        this.whatsDisplayingInfo.textContent = `[Displaying ${startRowIndex + 1} to ${endRowNumber} of ${totalRowCount} ${this.recordsLabel} found]`;
        this.noRowsFoundElt.textContent = `No ${this.recordsLabel} found`;
        if (this.showOnlyForLongPage) {
            this.show();
            if (this.pageNavContainer.offsetTop < window.innerHeight) {
                this.hide();
            }
        }
    }
}
