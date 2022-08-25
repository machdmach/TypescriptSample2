var _a;
import { StorageBase } from "./StorageBase.js";
export class StorageConfig {
    static setAppNameAsKeyPrefix(appName, alwaysSet = true) {
        if (alwaysSet) {
            this.appName = appName;
        }
        else {
            if (appName === this.default_appName) {
                this.appName = appName;
            }
            else {
                //dont set
            }
        }
    }
}
_a = StorageConfig;
//=========================================================================
StorageConfig.default_appName = "appKeyPrefix-Uninit";
StorageConfig.appName = _a.default_appName;
//=========================================================================
class MyStorage {
    constructor(store, itemKey, appName) {
        this.itemKey = itemKey;
        this.storage = new StorageBase(store, appName);
    }
    //=========================================================================
    getObject(errMesgOnNotFound) {
        let obj = this.storage.getObject(this.itemKey, errMesgOnNotFound);
        return obj;
    }
    //=========================================================================
    setObject(obj) {
        this.storage.setObject(this.itemKey, obj);
    }
    //=========================================================================
    setCurrentDateTimeStr() {
        let dt = new Date();
        let val = dt.toISOString();
        this.storage.setItem(this.itemKey, val);
    }
    removeItem() {
        this.storage.removeItem(this.itemKey);
    }
    setItem(val) {
        this.storage.setItem(this.itemKey, val);
    }
    tryGetObject() {
        return this.storage.tryGetObject(this.itemKey);
    }
    containsKey() {
        return this.storage.containsKey(this.itemKey);
    }
    getItemOrFail() {
        let key = this.itemKey;
        let ret = this.storage.getItem(key);
        if (ret === null) {
            let errMesg = `No item found for key: [${key}] in storage: ` + typeof this.storage;
            throw Error(errMesg);
        }
        return ret;
    }
    getItemOrDefault(defVal) {
        let key = this.itemKey;
        let ret = this.storage.getItem(key);
        if (ret === null) {
            return defVal;
        }
        return ret;
    }
    getItemOrStore(defVal) {
        let key = this.itemKey;
        let ret = this.storage.getItem(key);
        if (ret === null) {
            //if no data is found in storage, then store the provided data.
            this.storage.setItem(key, defVal);
            ret = defVal;
        }
        return ret;
    }
    getItem_asBackup(fastDataProvider) {
        let key = this.itemKey;
        let ret = fastDataProvider();
        if (ret === null || ret === undefined) {
            //if dataProvider provides no data, then get the data from storage.
            ret = this.storage.getItem(key);
        }
        else {
            //if dataProvider provides data, then store it.
            this.storage.setItem(key, ret);
        }
        return ret;
    }
    getItem_asCache(slowDataProvider) {
        return null;
    }
}
//=========================================================================
export class AppSesisonStorage extends MyStorage {
    constructor(itemKey) {
        super(sessionStorage, itemKey, StorageConfig.appName);
    }
}
//=========================================================================
export class HostSesisonStorage extends MyStorage {
    constructor(itemKey) {
        super(sessionStorage, itemKey, null);
    }
}
//=========================================================================
export class HostLocalStorage extends MyStorage {
    constructor(itemKey) {
        super(sessionStorage, itemKey, null);
    }
}
//=========================================================================
export class AppLocalStorage extends MyStorage {
    constructor(itemKey) {
        super(localStorage, itemKey, StorageConfig.appName);
    }
    //=========================================================================
    static test1() {
        console.log("test");
        let store = new AppLocalStorage("color");
        store.setObject("sadfsadf");
        let val = store.getObject();
        console.log("val was: " + val);
    }
}
