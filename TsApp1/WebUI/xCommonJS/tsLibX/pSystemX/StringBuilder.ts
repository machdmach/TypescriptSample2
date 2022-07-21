import { StringX } from "./StringX.js";

export class StringBuilder {
    strings: any[] = new Array();
    length = 0;

    append(x?: any) {
        if (typeof x === "undefined" || x === null) {
            return;
        }
        let s = x.toString();
        this.length += s.length;
        this.strings.push(s); //[this.strings.length] = s;

    }

    appendFormat(fmt: string, ...args: any[]) {
        let s = StringX.format(fmt, ...args);
        this.append(s);
    }

    prepend(x?: any) {
        if (x) {
            let s = x.toString();
            this.length += s.length;
            this.strings.unshift(s);
        }
    }
    //------------------------------------------
    prependLine(s?: any) {
        this.prepend('\n');
        this.prepend(s);
    }
    appendLine(s?: any) {
        this.append(s);
        this.append('\n');
    }
    appendLineBR(s?: any) {
        this.append(s);
        this.append('<br>\n');
    }
    clear() { this.strings = []; }
    isEmpty() { return this.strings.length === 0; }
    toString() { return this.strings.join(""); }
}
