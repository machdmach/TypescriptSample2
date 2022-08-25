import * as c from "../deno_std/fmt/colors.js";
class TermColor {
    //#TermColor
    //https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
    //https://en.wikipedia.org/wiki/ANSI_escape_code#Colors
    static readonly Reset = "\x1b[0m";
    static readonly Bright = "\x1b[1m";
    static readonly Dim = "\x1b[2m";
    static readonly Underscore = "\x1b[4m";
    static readonly Blink = "\x1b[5m";
    static readonly Reverse = "\x1b[7m";
    static readonly Hidden = "\x1b[8m";
    static readonly FgBlack = "\x1b[30m";
    static readonly FgRed = "\x1b[31m";
    static readonly FgGreen = "\x1b[32m";
    static readonly FgYellow = "\x1b[33m";
    static readonly FgBlue = "\x1b[34m";
    static readonly FgMagenta = "\x1b[35m";
    static readonly FgCyan = "\x1b[36m";
    static readonly FgWhite = "\x1b[37m";
    static readonly BgBlack = "\x1b[40m";
    static readonly BgRed = "\x1b[41m";
    static readonly BgGreen = "\x1b[42m";
    static readonly BgYellow = "\x1b[43m";
    static readonly BgBlue = "\x1b[44m";
    static readonly BgMagenta = "\x1b[45m";
    static readonly BgCyan = "\x1b[46m";
    static readonly BgWhite = "\x1b[47m";
}
//=========================================================================
export class tc {
    static toStr(str: any): string {
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
    static red(str: any): string {
        return c.red(this.toStr(str));
    }
    static green(str: any): string {
        return c.green(this.toStr(str));
    }
    static blue_tooDim(str: any): string {
        return c.blue(this.toStr(str)); //too dim
    }
    static magenta(str: any): string {
        return c.magenta(this.toStr(str));
    }
    static cyan(str: any): string {
        return c.cyan(this.toStr(str));
    }
    static yellow(str: any): string {
        return c.yellow(this.toStr(str));
    }
    //-------------------bold
    static bold(str: any): string {
        return c.bold(this.toStr(str));
    }
    static boldCyan(str: any): string {
        return c.bold(c.cyan(this.toStr(str)));
    }
    static boldGreen(str: any): string {
        return c.bold(c.green(this.toStr(str)));
    }
    static boldYellow(str: any): string {
        return c.bold(c.yellow(this.toStr(str)));
    }
    //-------------------background
    static bgBlue(str: any): string {
        return c.bgBlue(this.toStr(str));
    }
    static bgRed(str: any): string {
        //return c.bgRed(this.yellow(this.toStr(str)));
        return c.bgRed(this.toStr(str));
    }
    static bgMagenta(str: any): string {
        return c.bgMagenta(this.toStr(str));
    }
    //-------------------underline
    static underline(str: any): string {
        return c.underline(this.toStr(str));
    }
    static underlineRed(str: any): string {
        return c.underline(c.red(this.toStr(str)));
    }
    //-------------------others
    static inverse(str: any): string {
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
        console.log.call(
            console,
            TermColor.Underscore,
            "asdfasdf",
            TermColor.Reset,
        );

        let colorNames = Object.getOwnPropertyNames(TermColor);
        colorNames.forEach((colorName) => {
            let color = (TermColor as any)[colorName];
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
