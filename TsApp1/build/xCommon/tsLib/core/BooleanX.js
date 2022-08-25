export class BooleanX {
    constructor() {
        this.trueString = "true"; //C# "True"
        this.falseString = "false";
    }
    static test1() {
        let expression = 1;
        let x1 = Boolean(expression); // use this...
        let x2 = !!(expression); // ...or this
        //let x3 = new Boolean(expression); // don't use this!
    }
    static isTruthy(val) {
        let ret = !this.isFalsy(val);
        console.log(`BooleanX.isTruthy ${val} = ${ret}`);
        return ret;
    }
    static isFalsy(val) {
        return this.toStr(val) === "false";
    }
    //=========================================================================
    static valueOf(val) {
        let ret;
        if (val === undefined || val === null || val === "") {
            ret = false;
        }
        else {
            let x = this.valueOfOrUndefined(val);
            if (x === undefined) {
                ret = false;
            }
            else {
                ret = x;
            }
        }
        return ret;
    }
    //=========================================================================
    static toStr(val) {
        let ret;
        if (val === undefined || val === null || val === "") {
            ret = false.toString();
        }
        else {
            let b = this.valueOfOrUndefined(val);
            if (b === undefined) {
                ret = val + "";
            }
            else {
                ret = b.toString();
            }
        }
        return ret;
    }
    //=========================================================================
    static valueOfOrUndefined(val) {
        //undefined == undefined => true;
        //undefined === undefined => true;
        //undefined == null => true;
        //undefined === null => false;
        let ret;
        if (val === undefined || val === null || val === "") {
            ret = undefined;
        }
        else if (typeof (val) === "boolean") {
            ret = val;
        }
        else if (val instanceof Boolean) { //typeof(Boolean) = "object"
            ret = val.valueOf();
        }
        else if (typeof (val) === "number") {
            if (val === 1) {
                ret = true;
            }
            else if (val === 0) {
                ret = false;
            }
            else {
                ret = undefined;
            }
        }
        else if (typeof (val) === "string") {
            let sLower = val.trim().toLowerCase();
            if (sLower === "false" || sLower === "0" || sLower === "no" || sLower === "none") { //none
                ret = false;
            }
            else if (sLower === "true" || sLower === "1" || sLower === "yes") { //all
                ret = true;
            }
            else if (sLower === "") {
                ret = undefined;
            }
            else {
                ret = undefined;
            }
        }
        else {
            ret = undefined; //Boolean(val).valueOf();
        }
        console.log(`BooleanX.ValueOf ${val} is ${ret}`);
        return ret;
    }
    //=========================================================================
    static areEqual(v1, v2) {
        let b1 = this.valueOf(v1);
        let b2 = this.valueOf(v2);
        return b1 === b2;
    }
    //=========================================================================
    static parse(val, defaultVal) {
        if (val === undefined || val === null || val === "") {
            if (defaultVal !== undefined) {
                return defaultVal;
            }
        }
        let ret = this.tryParse(val);
        if (typeof ret !== 'boolean') {
            throw Error(`[${val}] is not a valid boolean value`);
        }
        return ret;
    }
    //=========================================================================
    static tryParse(val) {
        if (val === undefined || val === null || val === "") {
            return val;
        }
        else if (typeof val === "boolean") {
            return val;
        }
        if (val === 0) {
            return false;
        }
        else if (val === 1) {
            return true;
        }
        else if (typeof val === "string") {
            val = val.toLocaleLowerCase();
            if (val === "1" ||
                val === "on" ||
                val === "ok" ||
                val === "true" || val === "t" ||
                val === "yes" || val === "y") {
                return true;
            }
            else if (val === "0" ||
                val === "off" ||
                val === "!ok" ||
                val === "false" || val === "f" ||
                val === "no" || val === "n") {
                return false;
            }
            else {
                return val;
            }
        }
        else {
            return val;
        }
    }
}
