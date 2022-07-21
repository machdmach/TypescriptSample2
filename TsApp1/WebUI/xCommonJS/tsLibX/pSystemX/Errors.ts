export class MyError extends Error {
    //https://stackoverflow.com/questions/464359/custom-exceptions-in-javascript
    handled: boolean = false;
    name: string;
    message: string;
    stack?: string;
    level: string = "Show Stopper";
    htmlMessage = "err";

    //=========================================================================
    constructor(mesg: any, handled = false) { //}, handled = true) {
        super(mesg);
        this.handled = handled;
        this.message = mesg + "";
        this.name = "System Error";
        if (Config.isDebug) {
            console.error("MyError, error: ", this);
        }
    }
    static isMyError(err: any) {
        return err instanceof MyError;
    }
    toString() {
        return `${this.message}`;
    }
}
