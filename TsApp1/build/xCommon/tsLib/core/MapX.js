import { StringBuilder } from "./StringBuilder.js";
//======================================================
export class MapX {
    //=========================================================================
    static fromObject(obj) {
        const map = new Map(Object.entries(obj));
        return map;
    }
    static toStr(map) {
        let buf = new StringBuilder();
        map.forEach((val, key) => {
            buf.appendLine(`[${key}]=[${val}]`);
        });
        return buf.toString();
    }
    //=========================================================================
    static lowercaseKeys(map) {
        let ret = new Map();
        map.forEach((val, key) => {
            let keyLower = key.toLowerCase();
            ret.set(keyLower, val);
        });
        return ret;
    }
    //=========================================================================
    static getStringCI(targetKey, map) {
        targetKey = targetKey.toLowerCase();
        map.forEach((val, key) => {
            targetKey = val;
        });
    }
}
