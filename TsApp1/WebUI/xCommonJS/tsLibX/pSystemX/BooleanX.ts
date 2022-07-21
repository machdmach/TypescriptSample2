
export class BooleanX {

    static test1() {
        let x = new Boolean(false); //tslint:disable-line
        if (x) {
            // this code is executed
        }
        let expression = 1;
        let x1 = Boolean(expression);     // use this...
        let x2 = !!(expression);          // ...or this
        //let x3 = new Boolean(expression); // don't use this!
    }

    static isTruthy(val: any): boolean {
        let ret = !this.isFalsy(val);
        console.log(`BooleanX.isTruthy ${val} = ${ret}`);
        return ret;

    }
    static isFalsy(val: any) {
        return this.toStr(val) === "false";
    }
    readonly trueString = "true";   //C# "True"
    readonly falseString = "false";

    //=========================================================================
    static valueOf(val: any): boolean {
        let ret: boolean;
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
    static toStr(val: any): string {
        let ret: string;
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
    static valueOfOrUndefined(val: any): boolean | undefined {
        //undefined == undefined => true;
        //undefined === undefined => true;
        //undefined == null => true;
        //undefined === null => false;

        let ret: boolean | undefined;
        if (val === undefined || val === null || val === "") { //undefined, null, or blank, or false
            //!"" (blank) = true, thus a blank string would return false, a white space would return what?
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
    static areEqual(v1: any, v2: any) {
        let b1 = this.valueOf(v1);
        let b2 = this.valueOf(v2);
        return b1 === b2;

        // if (typeof (v1) === "undefined") {
        //     return false;
        // }
        // if (typeof (v2) === "undefined") {
        //     return false;
        // }
        // if (v1 === null) {
        //     return false;
        // }
        // if (v2 === null) {
        //     return false;
        // }

        // let v1StrLower = v1.toString().toLowerCase();
        // let v2StrLower = v2.toString().toLowerCase();

        // // if (typeof (v1) === "string") {
        // //     if (typeof (v2 === "string")) {
        // //         return v1 === v2;
        // //     }
        // //     if (typeof (v2 === "boolean")) {
        // //         return v1 === v2;
        // //     }
        // // }
        // return v1StrLower === v2StrLower;
    }
    //=========================================================================
    static parse(val: any, defaultVal?: boolean): boolean {
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
    static tryParse(val: any): any {
        //let ret: any; // undefined | boolean;
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
            } else if (
                val === "0" ||
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
        // try {
        //     let parsedVal = JSON.parse(val);
        //     if (typeof parsedVal === "boolean") {
        //         ret = parsedVal;
        //     } else {
        //         if (parsedVal === 0) {
        //             ret = false;
        //         } else if (parsedVal === 1) {
        //             ret = true;
        //         }
        //         else {
        //             //ret = undefined;
        //             ret = val;
        //         }
        //     }
        // } catch (err) {
        //     //error on parsing a string
        //     //ret = undefined;
        //     ret = val;
        // }
        // return ret;
    }

}
