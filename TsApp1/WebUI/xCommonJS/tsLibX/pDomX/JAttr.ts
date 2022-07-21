import { JStyle } from "./JStyle.js";

export class JAttr extends JStyle {

    attr(name: string, val: string | number) {
        if (typeof val === "number") {
            this.el.setAttribute(name, val.toString());
        }
        else {
            this.el.setAttribute(name, val);
        }
        return this;
    }

    cols(numOfChars: number) { return this.attr("cols", numOfChars) }

    readonly(force?: boolean) { this.el.toggleAttribute("readonly", force ?? true); return this }
    required(force?: boolean) { this.el.toggleAttribute("required", force ?? true); return this }

    rows(numOfLines: number) { return this.attr("rows", numOfLines) }
    src(val: string) { return this.attr("src", val) }
    style(val: string) { return this.attr("style", val) }

    target(val: string) { return this.attr("target", val) }

    x(val: string) { return this.attr("", val) }

}
