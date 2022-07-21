import { HTMLTableBuilder } from "./HTMLTableBuilder.js";

export class DebugUITable {
    tw: HTMLTableBuilder;

    uiElt: HTMLElement;
    constructor(selectorOrElt: string | Node) {
        this.uiElt = qs(selectorOrElt);
        this.tw = new HTMLTableBuilder();
        this.uiElt.appendChild(this.tw.tab);
        this.nvCol = new Map<string, HTMLElement>();
    }
    nvCol: Map<string, HTMLElement>;
    end = false;
    k = 0;
    startCountingFields() {
        this.end = false;
        this.k = 0;
    }
    setLabelValue(label: string, val: any) {
        label = (++this.k) + " " + label;
        if (typeof val !== 'string') {
            val = val + "";
        }

        let tab = this.tw;

        let nvCol = this.nvCol;
        let td = nvCol.get(label) as HTMLElement;
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
