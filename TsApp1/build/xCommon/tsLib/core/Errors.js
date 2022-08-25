export class MyError extends Error {
    //=========================================================================
    constructor(mesg, handled = false) {
        super(mesg);
        //https://stackoverflow.com/questions/464359/custom-exceptions-in-javascript
        this.handled = false;
        this.level = "Show Stopper";
        this.htmlMessage = "err";
        this.handled = handled;
        this.message = mesg + "";
        this.name = "System Error";
        if (Config.isDebug) {
            console.error("MyError, error: ", this);
        }
    }
    static isMyError(err) {
        return err instanceof MyError;
    }
    toString() {
        return `${this.message}`;
    }
}
