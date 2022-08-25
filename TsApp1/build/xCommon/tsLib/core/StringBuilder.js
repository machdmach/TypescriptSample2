import { StringX } from "./StringX.js";
export class StringBuilder {
    constructor() {
        this.strings = new Array();
        this.length = 0;
    }
    append(x) {
        if (typeof x === "undefined" || x === null) {
            return;
        }
        let s = x.toString();
        this.length += s.length;
        this.strings.push(s); //[this.strings.length] = s;
    }
    appendFormat(fmt, ...args) {
        let s = StringX.format(fmt, ...args);
        this.append(s);
    }
    prepend(x) {
        if (x) {
            let s = x.toString();
            this.length += s.length;
            this.strings.unshift(s);
        }
    }
    //------------------------------------------
    prependLine(s) {
        this.prepend('\n');
        this.prepend(s);
    }
    appendLine(s) {
        this.append(s);
        this.append('\n');
    }
    appendLineBR(s) {
        this.append(s);
        this.append('<br>\n');
    }
    clear() { this.strings = []; }
    isEmpty() { return this.strings.length === 0; }
    toString() { return this.strings.join(""); }
}
