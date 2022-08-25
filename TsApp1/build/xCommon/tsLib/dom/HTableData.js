import { MOutput } from "../core/MOutput.js";
import { JElt } from "./JElt.js";
export class HTableData {
    constructor(tab) {
        this.tab = tab;
    }
    static readData(tab) {
        var _a;
        let headerRow = (_a = tab.tHead) === null || _a === void 0 ? void 0 : _a.rows.item(1);
        let tBody = tab.tBodies[0];
        let rowCount = tBody.rows.length;
        let colCount = headerRow.cells.length;
        let matrix = []; //Array(rowCount);
        if (headerRow) {
            let rowData = [];
            for (let cell of headerRow.cells) {
                rowData.push(cell.textContent + "");
            }
            matrix.push(rowData);
        }
        if (tBody) {
            for (let row of tBody.rows) {
                let rowData = [];
                for (let cell of row.cells) {
                    rowData.push(cell.textContent + "");
                }
                matrix.push(rowData);
            }
        }
        return matrix;
    }
    //=========================================================================
    static toHtml(matrix) {
        let jel = JElt.createRoot("table");
        jel.attr("border", "1");
        for (let row of matrix) {
            let tr = jel.createChild("tr");
            if (row) {
                for (let cell of row) {
                    let td = tr.createChild("td");
                    td.el.innerText = cell + "";
                }
            }
            else {
                tr.createChild("td").innerText("row is empy");
            }
        }
        return jel.el;
    }
    //=========================================================================
    static tests() {
        let matrix = [[1, "a"], ["bb", 22]];
        MOutput.div(this.toHtml(matrix));
    }
}
