export class NestedObjectLib {

    static tests() {
        let path: string;
        let names = this.parseNamesFromPath(path = "Master.obj2.key2");
        console.log(`names of path ${path} is`, names);

        //let obj = { Master: { obj2x: { key2: undefined } } };
        let obj = { Master: { obj2x: { key2: undefined } } };
        //let val = this.getValue(obj, path);
        let val = this.getValueFromPath("Master.obj2x.key2.z", obj, null);
        console.log('val=', val);
    }
    //=========================================================================
    //{Parent.Title}
    static parseNamesFromPath(path: string) {
        let regex = new RegExp("\\.");
        let names: string[] = path.split(regex);
        return names;
    }
    //=========================================================================
    static getValueFromPath(path: string, obj: any, defaultVal: any = undefined) {
        if (typeof obj !== 'object') {
            throw Error("Invalid param, obj is not an object: " + obj);
        }
        let names = this.parseNamesFromPath(path);
        //let currObj: any;
        // names.reduce((acc, val, i) => {
        //     return 1;
        // });
        let currPath = "";
        let currObj = obj;
        let i = 0;
        for (let name of names) {
            console.log(`currPath: ${currPath}, currObj:`, currObj);

            if (typeof currObj !== 'object') {
                let errMesg = `KeyNotFound: ${name}, valueAtPath: ${currPath} isNotAnObject: ${currObj}`;
                if (defaultVal !== undefined) {
                    console.log(errMesg);
                    return defaultVal;
                }
                else {
                    throw Error(errMesg);
                }
            }
            else if (currObj === null) {
                //typeof null = 'object'
                let errMesg = `KeyNotFound: ${name}, valueAtPath: ${currPath} isNotAnObject: ${currObj}`;
                if (defaultVal !== undefined) {
                    console.log(errMesg);
                    return defaultVal;
                }
                else {
                    throw Error(errMesg);
                }
            }
            //if ('prop' in obj) { }
            //Reflect.has( x, 'key'); // returns true
            //if (rval === undefined) {

            // if (name.endsWith("()")) {
            //     currObj = currObj[""]
            // }

            if (!Object.prototype.hasOwnProperty.call(currObj, name)) {
                let val = currObj[name];
                if (!val) {
                    let errMesg = `currPath: ${currPath} doesnotContainKey: ${name}, path=${path}`;
                    if (defaultVal !== undefined) {
                        console.log(errMesg);
                        return defaultVal;
                    }
                    else {
                        console.error(errMesg + ", currObj=", currObj);
                        throw Error(errMesg);
                    }
                }
            }
            currObj = currObj[name];
            //currObj = currObj;
            if (i > 0) { currPath += "."; }
            currPath += name;
            i++;
        }
        return currObj;
    }

}
