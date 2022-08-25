import { StringX } from "./StringX.js";
/**
 * AKA: KeyedCollection
 * @see Map
 */
export abstract class KeyedBagBase {
    abstract getNullable(name: string): string | null;

    containsKeyValue(name: string, val: string) {
        let ret = this.getNullable(name);
        return StringX.ciEquals(ret, val);
    }

    containsKey(name: string) {
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
    get(name: string, throwsOnNotFound = true): string | null {
        let ret = this.getNullable(name);
        if (ret === null) {
            if (throwsOnNotFound) {
                throw Error(`Search Param [${name}] not found in URL`);
            }
        }
        return ret;
    }
    //=========================================================================
    getOrDefault(name: string, defaultVal: string): string {
        let ret: string | null = this.getNullable(name);
        if (ret === null) {
            ret = defaultVal;
        }
        return ret;
    }

    //=========================================================================
    getInt(name: string) {
        let s = this.get(name, true) as string;
        let ret = parseInt(s, 10);
        return ret;
    }
}
