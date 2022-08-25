import * as c from "../deno_std/fmt/colors.js";
class TermColor {
}
//#TermColor
//https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
//https://en.wikipedia.org/wiki/ANSI_escape_code#Colors
TermColor.Reset = "\x1b[0m";
TermColor.Bright = "\x1b[1m";
TermColor.Dim = "\x1b[2m";
TermColor.Underscore = "\x1b[4m";
TermColor.Blink = "\x1b[5m";
TermColor.Reverse = "\x1b[7m";
TermColor.Hidden = "\x1b[8m";
TermColor.FgBlack = "\x1b[30m";
TermColor.FgRed = "\x1b[31m";
TermColor.FgGreen = "\x1b[32m";
TermColor.FgYellow = "\x1b[33m";
TermColor.FgBlue = "\x1b[34m";
TermColor.FgMagenta = "\x1b[35m";
TermColor.FgCyan = "\x1b[36m";
TermColor.FgWhite = "\x1b[37m";
TermColor.BgBlack = "\x1b[40m";
TermColor.BgRed = "\x1b[41m";
TermColor.BgGreen = "\x1b[42m";
TermColor.BgYellow = "\x1b[43m";
TermColor.BgBlue = "\x1b[44m";
TermColor.BgMagenta = "\x1b[45m";
TermColor.BgCyan = "\x1b[46m";
TermColor.BgWhite = "\x1b[47m";
//=========================================================================
export class tc {
    static toStr(str) {
        c.setColorEnabled(true);
        //const noColor = globalThis.Deno?.noColor ?? true;
        if (str === undefined) {
            return "undefined";
        }
        else if (str === null) {
            return "null";
        }
        else if (typeof str === "string") {
            return str;
        }
        else {
            return str + "";
        }
    }
    static red(str) {
        return c.red(this.toStr(str));
    }
    static green(str) {
        return c.green(this.toStr(str));
    }
    static blue_tooDim(str) {
        return c.blue(this.toStr(str)); //too dim
    }
    static magenta(str) {
        return c.magenta(this.toStr(str));
    }
    static cyan(str) {
        return c.cyan(this.toStr(str));
    }
    static yellow(str) {
        return c.yellow(this.toStr(str));
    }
    //-------------------bold
    static bold(str) {
        return c.bold(this.toStr(str));
    }
    static boldCyan(str) {
        return c.bold(c.cyan(this.toStr(str)));
    }
    static boldGreen(str) {
        return c.bold(c.green(this.toStr(str)));
    }
    static boldYellow(str) {
        return c.bold(c.yellow(this.toStr(str)));
    }
    //-------------------background
    static bgBlue(str) {
        return c.bgBlue(this.toStr(str));
    }
    static bgRed(str) {
        //return c.bgRed(this.yellow(this.toStr(str)));
        return c.bgRed(this.toStr(str));
    }
    static bgMagenta(str) {
        return c.bgMagenta(this.toStr(str));
    }
    //-------------------underline
    static underline(str) {
        return c.underline(this.toStr(str));
    }
    static underlineRed(str) {
        return c.underline(c.red(this.toStr(str)));
    }
    //-------------------others
    static inverse(str) {
        //not working in browser
        return c.inverse(this.toStr(str));
    }
    //============================================================================
    static egz() {
        console.group("--------------------------------------------------------- custom colors");
        let o1 = { a: 1, b: 22 };
        console.log(o1);
        console.table(o1);
        console.error("error12");
        console.info("info1");
        console.assert(false, "assert failed");
        console.assert(true, "assert OK"); //not print anything of OK
        let cyan = "\x1b[36m%s\x1b[0m";
        console.log(cyan, "self I am cyan"); //cyan
        console.log("\x1b[33m%s\x1b[0m", "self stringToMakeYellow"); //yellow
        console.log("normal");
        console.trace("aaa");
        //let TermColor = TermColor;
        console.log.call(console, TermColor.Blink, "asdfasdf", TermColor.Reset);
        console.log.call(console, TermColor.Underscore, "asdfasdf", TermColor.Reset);
        let colorNames = Object.getOwnPropertyNames(TermColor);
        colorNames.forEach((colorName) => {
            let color = TermColor[colorName];
            //console.log.call(console, color, colorName, TermColor.Reset);
        });
        console.log(colorNames);
        console.log(tc.yellow("yellow"));
        console.log(tc.boldYellow("boldYellow"));
        console.log(tc.cyan("cyan"));
        console.log(tc.boldCyan("boldCyan"));
        console.log(tc.inverse("inverse"));
        console.log(tc.bgRed("bgRed"));
        console.groupEnd();
    }
}
