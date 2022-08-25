export class CurrencyX {
    static format(val, currencySymbol = "$") {
        let ret = "";
        if (val) {
            let numVal;
            if (typeof val === "number") {
                numVal = val;
            }
            else if (typeof val === "string") {
                numVal = parseFloat(val);
            }
            else {
                throw new Error("invalid type: " + typeof val);
            }
            ret = currencySymbol + numVal.toFixed(2);
        }
        else {
            ret = currencySymbol + val + " not formatted";
        }
        return ret;
    }
}
