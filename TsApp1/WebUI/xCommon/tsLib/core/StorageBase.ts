export class StorageBase {
    //(session and local) storage is unique per protocol://host:port combination.
    storage: Storage;
    appName: string;
    constructor(storage: Storage, appName: string | null) {

        this.storage = storage;
        if (appName) {
            this.appName = appName + ":";
        }
        else {
            this.appName = "";
        }
    }
    fixKey(key: string) {
        let newKey = this.appName + key;
        return newKey;
    }
    //=========================================================================
    tryGetObject(key: string): MResult {
        key = this.fixKey(key);
        const item = this.storage.getItem(key);

        if (item === null) {
            // The item does not exist, thus return an error result
            return {
                success: false,
                error: new Error(`Item with key "${key}" does not exist`),
            };
        }

        let value: unknown;
        try {
            value = JSON.parse(item);
        }
        catch (error: any) {
            // The item is not valid JSON, thus return an error result
            return {
                success: false,
                error,
            };
        }

        // Everything's fine, thus return a success result
        return {
            success: true,
            value,
        };
    }
    containsKey(key: string) {
        key = this.fixKey(key);
        const item = this.storage.getItem(key);
        return (item !== null);
    }
    containsObject(obj: Object) {
        throw "not implemented, use containsKey() method";
    }

    //=========================================================================
    getObject(key: string, errMesgOnNotFound?: string): unknown {
        key = this.fixKey(key);
        //getItemDeserialized
        const objSerialized = this.storage.getItem(key);
        if (objSerialized === null) {
            if (!errMesgOnNotFound) {
                errMesgOnNotFound = `Item with key "${key}" does not exist`;
            }
            throw Error(errMesgOnNotFound);
        }
        let obj = JSON.parse(objSerialized);
        return obj;
    }
    removeItem(key: string) {
        key = this.fixKey(key);
        this.storage.removeItem(key);
    }
    setItem(key: string, itemStr: string) {
        key = this.fixKey(key);
        this.storage.setItem(key, itemStr);
    }
    getItem(key: string): string | null {
        key = this.fixKey(key);
        let ret = this.storage.getItem(key);
        return ret;
    }
    //=========================================================================
    setObject(key: string, obj: any) {
        key = this.fixKey(key);
        let objSerialized = JSON.stringify(obj);
        this.storage.setItem(key, objSerialized);
    }
}
