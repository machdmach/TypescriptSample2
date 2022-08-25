import { LogLevels } from "./Logging.js";
export class consoleX {
    static setLogLevel(logLevel) {
        switch (logLevel) {
            case LogLevels.DEBUG:
                this.setOutputDebug(true);
                this.setOutputInfo(true);
                break;
            case LogLevels.INFO:
                this.setOutputDebug(false);
                this.setOutputInfo(true);
                break;
            case LogLevels.WARNING:
                this.setOutputDebug(false);
                this.setOutputInfo(false);
                break;
            default:
                break;
        }
    }
    //=========================================================================
    static setOutputDebug(flag) {
        if (flag) {
            isLogDebug = true;
            //turning on console.debug
            if (console.debug === this.emptyFn) {
                console.debug = this.orig_debugFn;
                console.info("+console.debug has been turned on");
            }
            else {
                console.info("+console.debug already on");
            }
            console.debug("console.debug: This should always shows, OK!!!!!!!!!!!!!");
        }
        else {
            isLogDebug = false;
            //turning off console.debug
            if (console.debug === this.emptyFn) {
                console.warn("-console.debug already off");
            }
            else {
                this.orig_debugFn = console.debug;
                console.debug = this.emptyFn;
                console.info("-console.debug has been turned off");
            }
            console.debug("error6222: This should never shows, Eror?????????????");
        }
    }
    //=========================================================================
    static setOutputInfo(flag) {
        if (flag) {
            isLogInfo = true;
            //turning on console.info
            if (console.info === this.emptyFn) {
                console.info = this.orig_infoFn;
                console.info("+console.info has been turned on");
            }
            else {
                console.info("+console.info already on");
            }
            console.info("console.info: This should always shows, OK!!!!!!!!!!!!!");
        }
        else {
            isLogInfo = false;
            //turning off console.info
            if (console.info === this.emptyFn) {
                console.warn("-console.info already off");
            }
            else {
                this.orig_infoFn = console.info;
                console.info("-console.info is being turned off");
                console.info = this.emptyFn;
            }
            console.info("error6223: console.info: This should never shows, Eror?????????????");
        }
    }
    //============================================================================
    static log(...args) {
        let cyan = "\x1b[36m%s\x1b[0m";
        let err = new Error("log");
        let stack = err.stack + "";
        const line = ((stack.split("\n")[2] || "…")
            .match(/\(([^)]+)\)/) || [, "?"])[1];
        console.log.call(console, cyan, `${line}|`, ...args);
    }
    //============================================================================
    static error(...args) {
        let cyan = "\x1b[36m%s\x1b[0m";
        let err = new Error("log");
        let stack = err.stack + "";
        const line = ((stack.split("\n")[2] || "…")
            .match(/\(([^)]+)\)/) || [, "?"])[1];
        //console.log.call(console, tc.FgRed, `${line}|`, ...args, tc.Reset);
    }
}
consoleX.orig_debugFn = undefined;
consoleX.orig_infoFn = undefined;
consoleX.orig_logFn = undefined;
consoleX.emptyFn = function () { };
