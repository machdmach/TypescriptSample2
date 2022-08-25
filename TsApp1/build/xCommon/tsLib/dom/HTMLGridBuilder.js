import { DateTimeFormatter } from "../core/DateTimeFormatter.js";
import { DateTimeParser } from "../core/DateTimeParser.js";
import { AriaRole } from "./AriaRole.js";
//#gridBuilder
export class HTMLGridBuilder {
    constructor(tableTagName = "div") {
        this.currentRowIndex = -1;
        this.currentColumnIndex = -1;
        this.isAutoRowNumCell = false;
        this.rowNumClassName = "uninit";
        this.rowOddBackgroundColor = "";
        this.rowEvenBackgroundColor = "";
        this.maxRows = 1000;
        this.tab = document.createElement(tableTagName);
        let st = this.tab.style;
        if (tableTagName === "table") {
            this.thead = document.createElement("thead");
            this.tbody = document.createElement("tbody");
            this.rowTagName = "tr";
            this.cellTagName = "td";
            AriaRole.table(this.tab);
        }
        else {
            this.thead = document.createElement(tableTagName);
            this.tbody = document.createElement(tableTagName);
            this.rowTagName = tableTagName;
            this.cellTagName = tableTagName;
            st.border = "1px solid #777";
            AriaRole.grid(this.tab);
        }
        this.tab.appendChild(this.thead);
        this.tab.appendChild(this.tbody);
        AriaRole.rowgroup(this.tbody);
        AriaRole.rowgroup(this.thead);
        this.appendNewLine(this.tab);
        this.rowSeperator = document.createTextNode("\n");
        this.cellSeperator = document.createTextNode("\n  ");
    }
    get isOddRowNumber() {
        return this.currentRowIndex % 2 === 0;
    }
    get rowCount() { return this.currentRowIndex + 1; }
    setAutoRowNumCell(flag, rowNumClassName = "rowNum") {
        this.isAutoRowNumCell = flag;
        this.rowNumClassName = rowNumClassName;
        if (this.currentColumnIndex >= 0) {
            throw Error("Invalid Operation, dataRows already started");
        }
        if (this.headerRow) {
            throw Error("Invalid Operation, headerRow already started");
        }
    }
    getTableElement() {
        return this.tab;
    }
    replaceTbody(newTbody) {
        this.tab.replaceChild(newTbody, this.tbody);
    }
    //=========================================================================
    setupRow(row, isHeaderRow = false) {
        let st = row.style;
        if (row instanceof HTMLDivElement) {
            st.display = "flex";
            //flex-wrap: wrap;, nowrap(default: all elts in one line), wrap-reverse: line2 is reversed to top of line1
            st.flexWrap = "wrap";
            if (isHeaderRow) {
                st.backgroundColor = "#c3d3d3";
                st.paddingBottom = "2px";
                st.fontWeight = "bold";
            }
            else {
                st.borderTop = this.tab.style.border;
                st.padding = "5px 0px";
                if (this.currentRowIndex % 2 === 0) {
                    st.backgroundColor = this.rowOddBackgroundColor;
                }
                else {
                    st.backgroundColor = this.rowEvenBackgroundColor;
                }
            }
        }
    }
    //=========================================================================
    addHeaderRow(...cellValues) {
        if (this.headerRow) {
            throw Error("headerRow already exists");
        }
        let row = document.createElement(this.rowTagName);
        AriaRole.row(row);
        this.headerRow = row;
        this.setupRow(row, true);
        if (this.isAutoRowNumCell) {
            this.addHeaderCell("#").className = this.rowNumClassName;
        }
        this.thead.appendChild(row);
        if (this.rowSeperator) {
            this.tab.appendChild(this.rowSeperator.cloneNode(true));
        }
        for (let i = 0; i < cellValues.length; i++) {
            let cellVal = cellValues[i];
            this.addHeaderCell(cellVal);
        }
        return this.headerRow;
    }
    getOrAddHeaderRow() {
        if (!this.headerRow) {
            this.headerRow = this.addHeaderRow();
        }
        return this.headerRow;
    }
    getHeaderRow(throwOnNotExist = true) {
        if (!this.headerRow) {
            if (throwOnNotExist) {
                throw Error("headerRow does not exist");
            }
        }
        return this.headerRow;
    }
    //=========================================================================
    addDataRow(...cellValues) {
        if (this.currentRowIndex > this.maxRows) {
            throw Error("too many rows, exceed: " + this.maxRows);
        }
        let row = document.createElement(this.rowTagName);
        AriaRole.row(row);
        this.dataRow = row;
        this.setupRow(row);
        this.tbody.appendChild(row);
        if (this.rowSeperator) {
            this.tab.appendChild(this.rowSeperator.cloneNode(true));
        }
        this.currentRowIndex++;
        this.currentColumnIndex = 0;
        if (this.isAutoRowNumCell) {
            this.addCell((this.currentRowIndex + 1) + "").className = this.rowNumClassName;
        }
        for (let i = 0; i < cellValues.length; i++) {
            let cellVal = cellValues[i];
            this.addCell(cellVal);
        }
        return row;
    }
    getOrAddDataRow() {
        if (!this.dataRow) {
            this.dataRow = this.addDataRow();
        }
        return this.dataRow;
    }
    //=========================================================================
    addHeaderCell(cellVal) {
        let row = this.getOrAddHeaderRow();
        let cell = this.createCell(cellVal);
        AriaRole.rowheader(cell);
        row.appendChild(cell);
        if (this.cellSeperator) {
            row.appendChild(this.cellSeperator.cloneNode(true));
        }
        return cell;
    }
    //=========================================================================
    addCellLocaleDateString(cellVal, cssClassNameOrColHeader) {
        let d1 = DateTimeParser.parseISO8601(cellVal);
        let dateFormatted = DateTimeFormatter.formatLocaleDateString(d1, "");
        return this.addCell(dateFormatted, cssClassNameOrColHeader);
    }
    addCellLocaleDateTimeString(cellVal, cssClassNameOrColHeader) {
        let d1 = DateTimeParser.parseISO8601(cellVal);
        let dateFormatted = DateTimeFormatter.formatLocaleString(d1, "");
        return this.addCell(dateFormatted, cssClassNameOrColHeader);
    }
    addCell(cellVal, cssClassNameOrColHeader) {
        let cssClassName = null;
        let colHeader = null;
        if (cssClassNameOrColHeader) {
            if (cssClassNameOrColHeader instanceof HTMLElement) {
                colHeader = cssClassNameOrColHeader;
            }
            else if (typeof cssClassNameOrColHeader === "string") {
                cssClassName = cssClassNameOrColHeader;
            }
            else {
                throw Error("unknown type: " + Object.prototype.toString.call(cssClassNameOrColHeader));
            }
        }
        let row = this.getOrAddDataRow();
        let cell = this.createCell(cellVal);
        AriaRole.cell(cell);
        row.appendChild(cell);
        if (this.cellSeperator) {
            row.appendChild(this.cellSeperator.cloneNode(true));
        }
        if (this.currentRowIndex === 0 && colHeader) {
            this.addHeaderCell(colHeader);
        }
        if (!cssClassName) {
            if (colHeader) {
                cssClassName = colHeader.className;
            }
        }
        if (cssClassName) {
            cell.className = cssClassName;
        }
        return cell;
    }
    //=========================================================================
    addRow(...cellValues) {
        return this.addDataRow(cellValues);
    }
    //=========================================================================
    createCell(cellVal, className) {
        let cell;
        if (cellVal !== undefined) {
            if (cellVal instanceof Node) { //textNode, HTMLElement...
                if (cellVal instanceof HTMLAnchorElement) {
                    cell = document.createElement(this.cellTagName);
                    cell.appendChild(cellVal);
                }
                else {
                    cell = cellVal;
                }
            }
            else {
                cell = document.createElement(this.cellTagName);
                if (cellVal === null) {
                    cell.textContent = "";
                }
                else if (typeof cellVal === "string") {
                    cell.textContent = cellVal;
                }
                else {
                    cell.textContent = cellVal + "";
                }
            }
        }
        else {
            cell = document.createElement(this.cellTagName);
        }
        if (className) {
            cell.className = className;
        }
        return cell;
    }
    //=========================================================================
    toHtml() {
        let ret = this.tab.outerHTML;
        return ret;
    }
    appendNewLine(elt) {
        elt.appendChild(document.createTextNode("\n"));
    }
}
