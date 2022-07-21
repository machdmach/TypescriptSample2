
import { DateTimeX } from "./DateTimeX.js";

export class DateTimeParser {

    //https://www.w3.org/TR/NOTE-datetime

    //ISO 8601
    /*
Date.parse("2019-01-01")
Date.parse("2019-01-01T00:00:00.000Z")
Date.parse("2019-01-01T00:00:00.000+00:00")

Date.parse(0) = 946713600000
Date.parse('') = NaN
Date.parse('?') = NaN
Date.parse(true) = NaN
Date.parse(null) = NaN

Date.parse(-100000) = -3217862419200000
Date.parse(-100000000) = NaN

Object.prototype.toString.call(new Date(1)) => "[object Date]"
date1 instanceof Date => true

*/
    //=========================================================================
    static parseISO8601(val: string | Date | null | undefined): Date | null {
        if (val instanceof Date) {
            return val;
        }
        if (typeof val === 'undefined') {
            return null;
        }
        if (val === null) {
            return null;
        }
        if (typeof val !== 'string') {
            throw Error(val + ', val is not of string type, ' + typeof val)
        }
        let n = Date.parse(val);
        if (isNaN(n)) {
            throw Error('val is not a number (NaN): ' + val);
        }
        let ret = new Date(n);
        return ret;
    }

    //=========================================================================
    static parseDateTimeProperty_eg(obj: any, propertyName: string) {
        let val = obj[propertyName];
        if (val === undefined) {
            throw Error("No property found with name: " + propertyName);
        }
        if (val === null) {
            console.log('val is null');
            return;
        }
        if (val === "") {
            return;
        }
        if (typeof val !== 'string') {
            return;
        }
        let dateNumeric = Date.parse(val as string);
        if (!isNaN(dateNumeric)) {
            let dateVal = new Date(dateNumeric);
            console.log(dateVal + ' parsed date from str: ' + val);
            val = dateVal;
        }
        obj[propertyName] = val;
    }

    static parse_MM_DD_yyyy_hhmm(s: string) {
        //09/30/2016 2135
        s = s.trim();
        let arr: string[] = s.split(" ");
        let d = arr[0];
        let t = arr[1];

        let dArr = d.split("/");
        let MM = dArr[0];
        let dd = dArr[1];
        let yyyy = dArr[2];

        let hh = t.substring(0, 2);
        let mm = t.substring(2);

        let ret = new Date(
            this.parseShort(yyyy, "year"),
            this.parseShort(MM, "month") - 1,
            this.parseShort(dd, "day"),
            this.parseShort(hh, "hour"),
            this.parseShort(mm, "minute"));

        if (!DateTimeX.isValid(ret)) {
            throw Error("invalid date: " + s);
        }
        return ret;
    }
    static parseShort(s: string, label: string) {
        let ret = parseInt(s, 10);
        return ret;
    }
}
