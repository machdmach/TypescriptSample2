import { StringBuilder } from "./StringBuilder.js";

//======================================================
export class MapX {
    //=========================================================================
    static fromObject(obj: object): Map<string, any> {
        const map = new Map(Object.entries(obj));
        return map;
    }

    static toStr(map: Map<any, any>) {
        let buf = new StringBuilder();
        map.forEach((val, key) => {
            buf.appendLine(`[${key}]=[${val}]`);
        });
        return buf.toString();
    }

    //=========================================================================
    static lowercaseKeys(map: Map<string, any>) {
        let ret = new Map<string, any>();
        map.forEach((val, key) => {
            let keyLower = key.toLowerCase();
            ret.set(keyLower, val);
        });
        return ret;
    }

    //=========================================================================
    static getStringCI(targetKey: string, map: Map<string, string>) {
        targetKey = targetKey.toLowerCase();
        map.forEach((val, key) => {
            targetKey = val;
        });
    }

}
