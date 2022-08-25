import { HTMLGridBuilder } from "./HTMLGridBuilder.js";

export class HTMLTableBuilder extends HTMLGridBuilder {
    static tests() {
        let b: HTMLGridBuilder = new HTMLGridBuilder(); //"divz");
        b = new HTMLGridBuilder("zz");

        b.addRow("a", "b", 11);
        b.addRow("aaa", "bbb", 22, document.createElement("td"), "after cempty");
        b.addCell(document.createElement("td"));
        b.addRow();
        let cell1 = b.addCell("ddd");
        cell1.style.fontWeight = "bolD";
        console.log(b.toHtml());
    }

    constructor() {
        super("table");
    }
}
