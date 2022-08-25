import { MessageBox } from "./MessageBox.js";
import { MyError } from "../core/Errors.js";

export class DatasetX {
    static test1() { }

    static getKeyId(dataset: DOMStringMap | Element, defaultVal?: number): number {
        let ds = new DOMStringMapX(dataset);
        let ret = ds.getInt("keyId", defaultVal);
        return ret;
    }
}

//=========================================================================
export class DOMStringMapX {
    //#tags:  #dataset,
    ds: any;
    stringified: string;

    constructor(dataset: DOMStringMap | Element) {
        if (dataset instanceof Element) {
            dataset = (dataset as HTMLElement).dataset;
        }
        this.ds = dataset;
        this.stringified = JSON.stringify(dataset);
    }

    getIntOrShowErrz(key: string, errMesgOnNotFound: string): number {
        try {
            return this.getInt(key);
        }
        catch (err) {
            console.error("getInt", err);
            let errx = new MyError(err);
            MessageBox.showSystemError(errx, "getInt failed");
            throw errx;
        }
    }
    getKeyId(defaultVal?: number): number {
        let ret = this.getInt("keyId", defaultVal);
        return ret;
    }

    //=========================================================================
    getInt(key: string, defaultVal?: number): number {
        let strVal = "";
        let rval = -999;

        if (defaultVal === undefined) {
            strVal = this.get(key);
        }
        else {
            strVal = this.get(key, null);
            if (strVal === null) {
                rval = defaultVal;
            }
        }
        if (strVal !== null) {
            rval = parseInt(strVal, 10);
            if (isNaN(rval)) {
                throw Error(`dataset.${key} is not a number: ${strVal}`);
            }
        }
        return rval;
    }
    //=========================================================================
    get(key: string, defaultVal?: string | null): string {
        if (!key) {
            throw Error("argument [key] is empty");
        }
        let val = this.ds[key];
        let err: string = "??";
        if (val === undefined) {
            err = `dataset.${key} is not found in ` + this.stringified;
        }
        else if (val === null) {
            err = `dataset.${key} is null in ` + this.stringified;
        }

        if (val) {
            val = val.trim();
            if (val === "") {
                err = `dataset.${key} is blank ` + this.stringified;
            }
        }

        if (!val) {
            if (defaultVal === undefined) {
                throw Error(err);
            }
            else {
                val = defaultVal;
            }
        }
        return val;
    }
}
