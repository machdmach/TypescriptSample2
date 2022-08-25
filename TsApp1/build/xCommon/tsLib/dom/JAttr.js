import { JStyle } from "./JStyle.js";
export class JAttr extends JStyle {
    attr(name, val) {
        if (typeof val === "number") {
            this.el.setAttribute(name, val.toString());
        }
        else if (val) {
            this.el.setAttribute(name, val);
        }
        else {
            //nada
        }
        return this;
    }
    cols(numOfChars) { return this.attr("cols", numOfChars); }
    readonly(force) { this.el.toggleAttribute("readonly", force !== null && force !== void 0 ? force : true); return this; }
    required(force) { this.el.toggleAttribute("required", force !== null && force !== void 0 ? force : true); return this; }
    rows(numOfLines) { return this.attr("rows", numOfLines); }
    src(val) { return this.attr("src", val); }
    style(val) { return this.attr("style", val); }
    target(val) { return this.attr("target", val); }
    x(val) { return this.attr("", val); }
}
