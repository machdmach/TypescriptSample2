import { StringBuilder } from "./StringBuilder.js";

export class TimeSpan {  //Duration
    date: Date;
    //momentDuration: moment.Duration;
    constructor(totalMillis: number) {
        //TimeSpan( 10, 20, 30, 40, 50 )                 10.20:30:40.0500000 (50 millis)
        if (typeof totalMillis !== "number") {
            throw Error("Invalid date diff: " + totalMillis);
        }
        if (typeof (totalMillis) === "undefined") {
            this.date = new Date();
        }
        else {
            if (typeof totalMillis === "number") {
                //January 01, 1970
                this.date = new Date(Date.now() + totalMillis);
            }
            else {
                throw Error("Invalid date: " + totalMillis);
            }
        }
    }
    get totalHours() { return 0; }
    get hours() { return this.date.getHours(); }
    get minutes() { return this.date.getMinutes(); }
    get seconds() { return this.date.getSeconds(); }
    get days() {
        let timeInMillis = this.date.getTime();
        let millisInOneDay = 24 * 60 * 60 * 1000;
        let totalDays = Math.round(timeInMillis / millisInOneDay);
        //totalDays = moment.duration(this.date.getTime()).days();

        return totalDays;
    }
    // get hours() { return this.momentDuration.hours(); }
    // get minutes() { return this.momentDuration.minutes(); }
    // get seconds() { return this.momentDuration.seconds(); }
    // get days() { return this.momentDuration.days(); }

    //=========================================================================
    toLongString() {
        let buf = new StringBuilder();
        let mm = this;
        if (mm.days > 0) {
            buf.append(mm.days + " days, ");
        }
        if (mm.hours > 0) {
            buf.append(mm.hours + " hours, ");
        }
        if (mm.minutes > 0) {
            buf.append(mm.minutes + " minutes, ");
        }
        buf.append(mm.seconds + " secs");
        let s = buf.toString();
        return s;
    }
}
