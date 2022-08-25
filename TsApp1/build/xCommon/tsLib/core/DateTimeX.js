import { StringBuilder } from "./StringBuilder.js";
//https://www.w3schools.com/jsref/jsref_obj_date.asp
export class DateTime {
    constructor(dt) {
        if (typeof (dt) === "undefined") {
            this.date = new Date();
        }
        else {
            if (typeof dt === "number") {
                //since January 01, 1970
                this.date = new Date(dt);
            }
            else if (dt instanceof Date) {
                this.date = dt;
            }
            else {
                throw Error("Invalid date: " + dt);
            }
        }
    }
}
//=========================================================================
export class DateTimeX {
    static checkValidity(d, errMesg = "Date is not valid") {
        if (!this.isValid(d)) {
            throw Error(`${errMesg}: "${d}"`);
        }
    }
    static isValid(d) {
        let ret;
        if (Object.prototype.toString.call(d) === "[object Date]") {
            // it is a date
            if (isNaN(d.getTime())) { // d.valueOf() could also work
                // date is not valid
                ret = false;
            }
            else {
                ret = true; // date is valid
            }
        }
        else {
            ret = false; // not a date
        }
        return ret;
    }
    //=========================================================================
    static formatDateHHmm(dt) {
        let ret = "";
        if (dt) {
            let dtObj = undefined;
            if (dt instanceof Date) {
                dtObj = dt;
            }
            else if (typeof (dt) === "string") {
                dtObj = new Date(Date.parse(dt));
            }
            else {
                ret = dt + "??" + typeof (dt);
            }
            if (dtObj) {
                let options = {
                    //timeStyle: 'medium',
                    hour: 'numeric',
                    minute: 'numeric',
                    //second: 'numeric',
                    hour12: false,
                    //timeZone: 'Australia/Sydney',
                    //timeZoneName: 'short'
                };
                let fmt = Intl.DateTimeFormat("en-US", options);
                let HHmm = fmt.format(dtObj);
                //HHmm = moment(dtObj).format("HH:mm");
                if (HHmm === "24:00")
                    HHmm = "00:00";
                ret = dtObj.toLocaleDateString() + " " + HHmm;
            }
        }
        return ret;
    }
    //=========================================================================
    static GetQuarterLabel(q, titleCase = true) {
        let ret;
        if (q === 1)
            ret = "first";
        else if (q === 2)
            ret = "second";
        else if (q === 3)
            ret = "third";
        else if (q === 4)
            ret = "fourth";
        else
            throw Error("Invalid quarter: " + q);
        if (titleCase) {
            ret = ret.charAt(0).toUpperCase() + ret.slice(1);
        }
        return ret;
    }
    toLocalDateTimeStr() {
        let dt = new Date();
        let dtStr = dt.toLocaleDateString() + ' ' + dt.toLocaleTimeString();
    }
    static Tests() {
        let d1 = new Date();
        let d2 = new Date();
        //        let d3 = d2 - d1;
        let millisSince1970 = Date.now();
        console.log('current date time', new Date());
        //var birthday = new Date('August 19, 1975 23:15:30');
    }
    //=========================================================================
    static getTotalDays(dt) {
        let millisInOneDay = 24 * 60 * 60 * 1000;
        let totalDays = Math.round(dt.getTime() / millisInOneDay);
        return totalDays;
    }
    //=========================================================================
    static addDays(dt, days) {
        let dtOrigStr = dt.toUTCString();
        //let dayOfMonth = dt.getUTCDate();
        let newTimeMillis = dt.getTime(); // + (days 24 * 60 * 60 * 1000);
        let rval = new Date(newTimeMillis);
        rval.setDate(rval.getDate() + days);
        //let dayOfMonthResult = rval.setUTCDate(dayOfMonth + days);
        console.log(`UTC: ${dtOrigStr} + ${days} days = ${rval.toUTCString()}, newTimeMillis: ${newTimeMillis}`);
        return rval;
    }
    static addUTCHours(dt, hours) {
        let dtOrigStr = dt.toUTCString();
        //let dayOfMonth = dt.getUTCDate();
        let newTimeMillis = dt.getTime(); // + (days 24 * 60 * 60 * 1000);
        let rval = new Date(newTimeMillis);
        rval.setUTCHours(rval.getUTCHours() + hours);
        //let dayOfMonthResult = rval.setUTCDate(dayOfMonth + days);
        console.log(`UTC: ${dtOrigStr} + ${hours} days = ${rval.toUTCString()}, newTimeMillis: ${newTimeMillis}`);
        return rval;
    }
    //=========================================================================
    static getTimeString(dt, utc = true) {
        //return rval;
        // dt.setUTCHours(2);
        // dt.setMinutes(0);
        // dt.setSeconds(0);
        let buf = new StringBuilder();
        if (true) {
            let x = utc ? dt.getUTCHours() : dt.getHours();
            if (x < 10) {
                if (x === 0) {
                    buf.append("0");
                }
                buf.append("0");
            }
            buf.append(x);
        }
        if (true) {
            buf.append(":");
            let x = dt.getUTCMinutes();
            if (x < 10) {
                if (x === 0) {
                    buf.append("0");
                }
                buf.append("0");
            }
            buf.append(x);
        }
        if (true) {
            buf.append(":");
            let x = dt.getUTCSeconds();
            if (x < 10) {
                if (x === 0) {
                    buf.append("0");
                }
                buf.append("0");
            }
            buf.append(x);
        }
        return buf.toString();
    }
    //=========================================================================
    static DiffInWeeks(d1, d2) {
        let t2 = d2.getTime();
        let t1 = d1.getTime();
        return (t2 - t1) / (24 * 3600 * 1000 * 7);
    }
    //=========================================================================
    static diffInMinutes(d1, d2) {
        let millis = d2.getTime() - d1.getTime();
        return Math.round(millis / 60000);
    }
    //=========================================================================
    static DiffInMonths(d1, d2) {
        let d1Y = d1.getFullYear();
        let d2Y = d2.getFullYear();
        let d1M = d1.getMonth();
        let d2M = d2.getMonth();
        return (d2M + 12 * d2Y) - (d1M + 12 * d1Y);
    }
}
DateTimeX.masks = {
    default: "ddd mmm dd yyyy HH:MM:ss",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",
};
