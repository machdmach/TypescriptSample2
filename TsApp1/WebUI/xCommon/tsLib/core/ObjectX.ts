import { StringBuilder } from "./StringBuilder.js";

export class ObjectX {
    egs() {
        let obj = Object();
        Object.entries(obj).forEach(([key, value]) => {
        });

        for (const [key, value] of Object.entries(obj)) {
            //destructuring [key, value] = arr;

        }
        // for (var property in object) {
        //     if (object.hasOwnProperty(property)) {
        //     }
        // }
    }
    //==============================================================
    /**
     * The inverse of `_.toPairs`; this method returns an object composed from key-value `pairs`.
     * _.fromPairs([['a', 1], ['b', 2]]);
     * // => { 'a': 1, 'b': 2 }
     */
    static fromEntries(pairs: any[]): object {
        //fromPairs
        //let res = Object.fromEntries(pairs); //ES2019

        let index = -1;
        let length = pairs == null ? 0 : pairs.length;
        let result = {} as any;

        while (++index < length) {
            let pair = pairs[index];
            result[pair[0]] = pair[1];
        }
        return result;
    }

    static isNullOrUndefined(el: any) {
        return el === null || typeof (el) === "undefined";
    }
    classOf(val: any) {
        return Object.prototype.toString.call(val);
        // console.log(classOf(true));              // [object Boolean]
        // console.log(classOf(new Boolean(true))); // [object Boolean]
        // console.log(classOf(0));                 // [object Number]
        // console.log(classOf(new Number(0)));     // [object Number]
        // console.log(classOf(""));                // [object String]
        // console.log(classOf(new String("")));    // [object String]
    }
    typeOf(value: any) {
        //return Object.prototype.toString.call(value).slice(8, -1);
        return Object.prototype.toString.call(value).replace(/^\[object (.+)\]$/, '$1');
        //console.log(typeOf(true));              // Boolean
        // console.log(typeOf(0));                 // Number
        // console.log(typeOf(""));                // String
        // console.log(typeOf(new Boolean(true))); // Boolean
        // console.log(typeOf(new Number(0)));     // Number
        // console.log(typeOf(new String("")));    // String
    }

    //=========================================================================
    static getType(obj: any): string {
        if (obj === null || obj === undefined) {
            return typeof obj;
        }
        if (this.isNullOrUndefined(obj.constructor)) {
            throw Error("constructoR not defined");
        }
        let funcNames = String(obj.constructor).match(/function\s+(\w+)/);
        if (funcNames) {
            //return this.isDefined(funcNames) ? funcNames[1] : "undefined";
            if (funcNames && funcNames.length > 0) {
                return funcNames[1];
            }
            else {
                return "undefined";
            }
        }
        else {
            return typeof (obj);
        }
    }
    //=========================================================================

    test1() {
        // getFoo is a property which isn't enumerable
        let myObj = Object.create({}, {
            getFoo: {
                value: function () { return this.foo; },
            },
        });
        myObj.foo = 1;
        console.log(Object.keys(myObj)); // console: ['foo']
    }
    //=========================================================================
    static showOwnProperties(obj: any, objTitle: string) {
        if (obj === null || obj === undefined) {
            console.log('obj is null');
            return;
        }
        //If you want all properties, even non-enumerables, see Object.getOwnPropertyNames().
        let propNames = Object.getOwnPropertyNames(obj);
        let buf = new StringBuilder();
        for (let name of propNames) {
            let val = obj[name];
            let type = this.getType(val);
            buf.appendLine(`${name}: ${type} = ${val}`);
            if (obj.hasOwnProperty(name)) {
            }
        }
        objTitle += ", ownProperties: ";
        console.log(objTitle, obj);
        //console.log(objTitle, buf.toString());
    }

    //=========================================================================
    static deleteAllProperties(obj: any) {
        for (let propName in obj) {

            //delete obj[propName];
            if (obj.hasOwnProperty(propName)) {
                delete obj[propName];
            }
        }
        console.log('props deleted', obj);

    }

    //=========================================================================
    static deleteAllProperties_tests() {
        let o1 = { a: 1, bb: 'two' };
        console.log('o1', o1);
        ObjectX.deleteAllProperties(o1);
        console.log('o1', o1);
    }

    //=========================================================================
    static getNonEmptyProperties(obj: any): any {

        let rval: any = {};
        for (let propName in obj) {
            if (!obj.hasOwnProperty(propName)) {
                //delete obj[propName];
                continue;
            }
            let propVal = obj[propName];
            if (typeof propVal === "function") {
                continue;
            }
            if (propVal) {
                rval[propName] = propVal;
            }
        }
        console.log('new obj', obj);
        return rval;
    }

    //==============================================================
    static async TestsAsync() {
    }
    //=========================================================================
    static isEmpty(obj: any) {
        if (typeof obj === 'string' || obj === '') {
            return false;
        }
        if (typeof obj === 'number' || obj === 0) {
            return false;
        }
        if (typeof obj === 'boolean') {
            return false;
        }

        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }

        return true;
    }

    //=========================================================================
    static getValue(obj: any, path: string, defaultVal: any = undefined) {
        if (typeof obj !== 'object') {
            throw Error("Invalid param, obj is not an object: " + obj);
        }
        if (Object.prototype.hasOwnProperty.call(obj, path)) {
            let rval = obj[path];
            return rval;
        }
        else { //not found
            let errMesg = `key [${path}] not found in obj`;
            console.warn(errMesg, obj);
            if (defaultVal !== undefined) {
                return defaultVal;
            }
            else {
                throw Error(errMesg);
            }
        }
    }

    //=========================================================================
    static cloneShallow(obj: object): object {
        //shallow copy
        let rval = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
        //or
        rval = Object.assign({}, obj);
        rval = Object.assign({}, obj, {}, {});
        let t = Object.values<number>(rval);
        //let n = t[0];

        //Object.getOwnPropertyDescriptors
        return rval;
    }

    //=========================================================================
    static cloneDeep(obj: object): object {
        //deep clone
        let str = JSON.stringify(obj);
        let rval = JSON.parse(str);
        return rval;
    }

    //=========================================================================
    // This is an assign function that copies full descriptors
    /*
        var obj = Object.create({ foo: 1 }, { // foo is on obj's prototype chain.
            bar: {
                value: 2  // bar is a non-enumerable property.
            },
            baz: {
                value: 3,
                enumerable: true  // baz is an own enumerable property.
            }
        });
        var copy = Object.assign({}, obj);
        console.log(copy); // { baz: 3 }

        var obj = {
        foo: 1,
        get bar() { return 2; }
        };

        var copy = Object.assign({}, obj);
        console.log(copy); //{ foo: 1, bar: 2 }, the value of copy.bar is obj.bar's getter's return value.

        var copy = completeAssign({}, obj);
        console.log(copy); // { foo:1, get bar() { return 2 } }
    */
    static completeAssign(target: Object, ...sources: object[]) {
        sources.forEach(source => {
            let descriptors = Object.keys(source).reduce((accum: any, key) => {
                accum[key] = Object.getOwnPropertyDescriptor(source, key);
                return accum;
            }, {});
            // by default, Object.assign copies enumerable Symbols too
            Object.getOwnPropertySymbols(source).forEach(sym => {
                let descriptor = Object.getOwnPropertyDescriptor(source, sym);
                if (descriptor === undefined) throw "?";
                if (descriptor.enumerable) {
                    descriptors[sym] = descriptor;
                }
            });
            Object.defineProperties(target, descriptors);
        });
        return target;
    }

    //=========================================================================
    /*
        var obj2 = {
             internal: { a: null }
        };
        deepFreeze(obj2);
        obj2.internal.a = 'anotherValue'; // fails silently in non-strict mode
        obj2.internal.a; // null
    */
    static deepFreeze(obj: any) {
        // Retrieve the property names defined on object
        let propNames = Object.getOwnPropertyNames(obj);

        // Freeze properties before freezing self
        for (let name of propNames) {
            let value = obj[name];
            obj[name] = (value && typeof value === "object") ? this.deepFreeze(value) : value;
        }
        return Object.freeze(obj);
    }

    //=========================================================================
    static freeze<T>(obj: T): Readonly<T> {
        return Object.freeze(obj);
    }
    testFreeze() {
        let o = { x: 1, y: 2 };
        let readOnly = Object.freeze(o);

        //readOnly.x = 3;

    }
    //=========================================================================
    strictAssignv<T>(target: T, ...sources: (Partial<T> | null | undefined)[]): T {
        return (Object.assign as any)(target, ...sources);
    }
    //=========================================================================
    static toStr(data: unknown): string {
        return this.asString(data);
    }
    static asString(data: unknown): string {
        if (typeof data === "string") {
            return data;
        }
        else if (
            data === null ||
            typeof data === "undefined" ||
            typeof data === "number" ||
            typeof data === "boolean" ||
            typeof data === "bigint" ||
            typeof data === "symbol"
        ) {
            return String(data);
        }
        else if (typeof data === "object") {
            return JSON.stringify(data);
        }
        return "undefined";
    }
}
