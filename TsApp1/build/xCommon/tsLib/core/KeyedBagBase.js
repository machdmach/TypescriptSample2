import { StringX } from "./StringX.js";
/**
 * AKA: KeyedCollection
 * @see Map
 */
export class KeyedBagBase {
    containsKeyValue(name, val) {
        let ret = this.getNullable(name);
        return StringX.ciEquals(ret, val);
    }
    containsKey(name) {
        let ret = this.getNullable(name);
        return ret !== null;
    }
    //=========================================================================
    /**
     * Other names: #getStringOrFail, #getOrFail
     * @param name
     * @param throwsOnNotFound
     * @returns
     */
    get(name, throwsOnNotFound = true) {
        let ret = this.getNullable(name);
        if (ret === null) {
            if (throwsOnNotFound) {
                throw Error(`Search Param [${name}] not found in URL`);
            }
        }
        return ret;
    }
    //=========================================================================
    getOrDefault(name, defaultVal) {
        let ret = this.getNullable(name);
        if (ret === null) {
            ret = defaultVal;
        }
        return ret;
    }
    //=========================================================================
    getInt(name) {
        let s = this.get(name, true);
        let ret = parseInt(s, 10);
        return ret;
    }
}
