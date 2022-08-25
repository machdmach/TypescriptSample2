import { StringBuilder } from "../core/StringBuilder.js";
//https://javascript.info/size-and-scroll
export class HTMLElementMetrics {
    static getInfo(e) {
        if (!e) {
            console.error("invalid argument, null or undefined", e);
            throw Error("invalid argument, null or undefined");
        }
        let buf = new StringBuilder();
        let map = new Map();
        //padding, scrollBar, border, magrin
        buf.append(getTagNameIDClass(e));
        buf.append("<table border=1>");
        this.addProp(buf, "clientLeft", e.clientLeft, "");
        this.addProp(buf, "clientTop", e.clientTop, "");
        this.addProp(buf, "clientWidth", e.clientWidth, "eq scrollWidth");
        this.addProp(buf, "clientHeight", e.clientHeight, "");
        this.addProp(buf, "offsetParent", getTagNameIDClass(e.offsetParent), "nearest positioned ancestor, which offset values are determined");
        this.addProp(buf, "offsetLeft", e.offsetLeft, "offset from parent left to leftMargin");
        this.addProp(buf, "offsetTop", e.offsetTop, "offset from parent top to topMargin");
        this.addProp(buf, "offsetWidth", e.offsetWidth, "eq clientWidth + scrollBar.width + border.width");
        this.addProp(buf, "offsetHeight", e.offsetHeight, "");
        this.addProp(buf, "scrollWidth", e.scrollWidth, "if scrollWidth, total Width");
        this.addProp(buf, "scrollHeight", e.scrollHeight, "is scrollBarVert, total height, if not, eq to clientHeight");
        this.addProp(buf, "scrollLeft", e.scrollLeft, "if scrollBarHoriz, 0 if scroll all left");
        this.addProp(buf, "scrollTop", e.scrollTop, "if scrollBarVert, 0 if scroll all to top");
        buf.append("</table>");
        let ret = buf.toString();
        return ret;
    }
    static addProp(buf, propName, propVal, desc) {
        buf.append("<tr>");
        buf.append(`<td>${propName}</td>`);
        buf.append(`<td>${propVal}</td>`);
        buf.append(`<td>${desc}</td>`);
        buf.append("</tr>");
    }
    //=========================================================================
    static getScrollbarWidth() {
        let outer = document.createElement("div");
        outer.style.visibility = "hidden";
        outer.style.width = "100px";
        //outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps
        outer.style.overflow = "scrollbar"; // needed for WinJS apps
        document.body.appendChild(outer);
        let widthNoScroll = outer.offsetWidth;
        // force scrollbars
        outer.style.overflow = "scroll";
        // add innerdiv
        let inner = document.createElement("div");
        inner.style.width = "100%";
        outer.appendChild(inner);
        let widthWithScroll = inner.offsetWidth;
        // remove divs
        if (outer.parentNode) {
            outer.parentNode.removeChild(outer);
        }
        return widthNoScroll - widthWithScroll;
    }
    //=========================================================================
    static hasVerticalScroll(node) {
        let body = document.body;
        let html = document.documentElement;
        let height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        let ret;
        if (!node) {
            if (window.innerHeight) {
                ret = body.offsetHeight > window.innerHeight;
            }
            else {
                ret = (html.scrollHeight > html.offsetHeight) || (body.scrollHeight > body.offsetHeight);
            }
        }
        else {
            ret = node.scrollHeight > node.offsetHeight;
        }
        return ret;
    }
}
