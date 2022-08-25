export class DateTimeFormatter {
    //https://www.w3.org/TR/NOTE-datetime
    //ISO 8601
    /*
Date.parse("2019-01-01")
Date.parse("2019-01-01T00:00:00.000Z")
Date.parse("2019-01-01T00:00:00.000+00:00")
*/
    //=========================================================================
    static formatparseISO8601(val) {
        let ret = Date.parse(val);
        return ret;
    }
    //=========================================================================
    static formatLocaleDateString(val, nullVal = "") {
        //coalesce returns the current value of the first expression that initially doesn't evaluate to NULL.
        //For example, SELECT COALESCE(NULL, NULL, 'third_value', 'fourth_value'); returns the third value because the third value is the first value that isn't null.
        if (val === null) {
            return nullVal;
        }
        let ret = val.toLocaleDateString();
        if (ret === "1/1/1") {
            ret = "";
        }
        return ret;
    }
    //=========================================================================
    static formatLocaleString(val, nullVal = "") {
        if (val === null) {
            return nullVal;
        }
        let ret = val.toLocaleString();
        if (ret === "1/1/1, 12:00:00 AM") {
            ret = "";
        }
        return ret;
    }
}
