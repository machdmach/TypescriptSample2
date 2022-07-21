import { StringX } from "./StringX.js";

export class GlobalBag {
    static global_bag: any;
    static {
        GlobalBag.global_bag = windowBag.global_bag || {};
    }

    static getInt(name: string) {
        let s = this.get(name, true) as string;
        let ret = parseInt(s, 10);
        return ret;
    }

    //=========================================================================
    static containsKeyValue(name: string, val: string) {
        let ret = this.getNullable(name);
        return StringX.ciEquals(ret, val);
    }

    static contains(name: string) {
        let ret = this.getNullable(name);
        return ret !== null;
    }
    //=========================================================================
    static get(name: string, throwsOnNotFound = true): string | null {
        let ret = this.getNullable(name);
        if (ret === null) {
            if (throwsOnNotFound) {
                throw Error(`Search Param [${name}] not found in URL`);
            }
        }
        return ret;
    }
    //=========================================================================
    static getOrDefault(name: string, defaultVal: string): string {
        let ret: string | null = this.getNullable(name);
        if (ret === null) {
            ret = defaultVal;
        }
        return ret;
    }
    //=========================================================================
    static getNullable(name: string): string | null {

        if (!name) {
            throw Error("Invalid arg [name], must not be blank");
        }
        let nameLower = name.toLowerCase();
        let ret = this.global_bag[name] as string;

        if (typeof (ret) === "undefined") {
            ret = this.global_bag[nameLower];
        }
        console.info(`global_bag ${name}, ret=${ret}`);
        return ret;
    }
}
