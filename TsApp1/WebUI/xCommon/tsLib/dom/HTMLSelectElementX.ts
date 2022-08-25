import { StringBuilder } from "../core/StringBuilder.js";
import { DateTimeX } from "../core/DateTimeX.js";

export class HTMLSelectElementX {
    static toStr(elt: Element, isDebug: boolean = false): string {
        let buf: StringBuilder = new StringBuilder();

        let rval = buf.toString();
        if (isDebug) {
            console.log('FormData.toStr', elt, rval);
        }

        return rval;
    }

    //=========================================================================
    static addRecordStatusOptions(selectEltOrSelector: HTMLSelectElement | string, data: RecordStatusEntity[]) {
        if (!data) {
            throw Error("data is null or undefined");
        }
        let sel = qs(selectEltOrSelector) as HTMLSelectElement;
        if (!(sel instanceof HTMLSelectElement)) {
            throw Error(getSelectorShortInfo(selectEltOrSelector) + " is not an HTMLSelectElement");
        }

        for (let rec of data) {
            let option = document.createElement("option");
            option.value = rec.value + "";
            option.label = rec.label;
            sel.appendChild(option);
        }
        return sel;
    }
    //=========================================================================
    static addCalendarQuarterOptions(selectEltOrSelector: HTMLSelectElement | string, startYear: number, startQuarter: number, numberOfQuarters: number) {
        let sel = qs(selectEltOrSelector) as HTMLSelectElement;
        if (!(sel instanceof HTMLSelectElement)) {
            throw Error(getSelectorShortInfo(selectEltOrSelector) + " is not an HTMLSelectElement");
        }
        let quarterYear = startYear;
        let quarterNum = startQuarter;
        for (let i = 0; i < numberOfQuarters; i++) {
            let option = document.createElement("option");
            option.value = quarterYear + "-" + quarterNum;
            option.label = `${quarterYear}, ${DateTimeX.GetQuarterLabel(quarterNum)} quarter`;

            sel.appendChild(option);
            quarterNum++;
            if (quarterNum > 4) {
                quarterNum = 1;
                quarterYear++;
            }
        }
    }
}
