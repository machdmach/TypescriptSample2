import { HTMLTableBuilder } from "./HTMLTableBuilder.js";
export class DebugUITable {
    constructor(selectorOrElt) {
        this.end = false;
        this.k = 0;
        this.uiElt = qs(selectorOrElt);
        this.tw = new HTMLTableBuilder();
        this.uiElt.appendChild(this.tw.tab);
        this.nvCol = new Map();
    }
    startCountingFields() {
        this.end = false;
        this.k = 0;
    }
    setLabelValue(label, val) {
        label = (++this.k) + " " + label;
        if (typeof val !== 'string') {
            val = val + "";
        }
        let tab = this.tw;
        let nvCol = this.nvCol;
        let td = nvCol.get(label);
        if (!td) {
            let r = tab.addDataRow(label);
            if (tab.isOddRowNumber) {
                r.style.backgroundColor = "lightgray";
            }
            td = tab.addCell();
            nvCol.set(label, td);
        }
        td.textContent = val;
    }
}
