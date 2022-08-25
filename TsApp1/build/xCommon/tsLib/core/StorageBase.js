export class StorageBase {
    constructor(storage, appName) {
        this.storage = storage;
        if (appName) {
            this.appName = appName + ":";
        }
        else {
            this.appName = "";
        }
    }
    fixKey(key) {
        let newKey = this.appName + key;
        return newKey;
    }
    //=========================================================================
    tryGetObject(key) {
        key = this.fixKey(key);
        const item = this.storage.getItem(key);
        if (item === null) {
            // The item does not exist, thus return an error result
            return {
                success: false,
                error: new Error(`Item with key "${key}" does not exist`),
            };
        }
        let value;
        try {
            value = JSON.parse(item);
        }
        catch (error) {
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
    containsKey(key) {
        key = this.fixKey(key);
        const item = this.storage.getItem(key);
        return (item !== null);
    }
    containsObject(obj) {
        throw "not implemented, use containsKey() method";
    }
    //=========================================================================
    getObject(key, errMesgOnNotFound) {
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
    removeItem(key) {
        key = this.fixKey(key);
        this.storage.removeItem(key);
    }
    setItem(key, itemStr) {
        key = this.fixKey(key);
        this.storage.setItem(key, itemStr);
    }
    getItem(key) {
        key = this.fixKey(key);
        let ret = this.storage.getItem(key);
        return ret;
    }
    //=========================================================================
    setObject(key, obj) {
        key = this.fixKey(key);
        let objSerialized = JSON.stringify(obj);
        this.storage.setItem(key, objSerialized);
    }
}
