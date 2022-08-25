//======================================================
export class ProxyX {
    //observable(obj: Object, onChange: function(x: nubmer)): Proxy<any> {
    static createObservable(targetedObjectToObserve, onChange) {
        let handler = {
            //trap "set"
            set(objectBeingObserved, key, value) {
                //console.log('set', { target, key, value });
                Reflect.set(objectBeingObserved, key, value);
                onChange(key, value);
                return true;
            },
        };
        let proxy = new Proxy(targetedObjectToObserve, handler);
        return proxy;
    }
    //=========================================================================
    static test1() {
        let o = this.createObservable({}, (key, newValue) => {
            console.log('set', { key, newValue });
        });
        o.p1 = 3;
    }
    //=========================================================================
    static test2() {
        let validator = {
            set: function (obj, prop, value) {
                if (prop === 'age') {
                    if (!Number.isInteger(value)) {
                        throw new TypeError('The age is not an integer');
                    }
                    if (value > 200) {
                        throw new RangeError('The age seems invalid');
                    }
                }
                // The default behavior to store the value
                obj[prop] = value;
                // Indicate success
                return true;
            },
        };
        let person = new Proxy({}, validator);
        person.age = 100;
        console.log(person.age); // 100
        person.age = 'young'; // Throws an exception
        person.age = 300; // Throws an exception
    }
    static test3() {
        let handler = {
            //getter trap,
            get: function (target, key) {
                console.log('get', { target, name: key });
                let rval = Reflect.get(target, key);
                if (typeof rval === 'object') {
                }
                if (key in target) {
                }
                return rval;
            },
            set(target, key, value) {
                console.log('set', { target, key, value });
                Reflect.set(target, key, value);
                //return 32;
                return true;
            },
        };
        let target1 = { a: 11 };
        let target2 = { a: 11 };
        //new <T extends object>(target: T, handler: ProxyHandler<T>): T;
        let p = new Proxy(target1, handler);
        let p2 = new Proxy(target1, handler);
        console.log(p.a);
        console.log(p.b);
        p.z = 12321;
        console.log(p.z);
        let prop1Val = Reflect.get({}, 'prop1');
        Reflect.ownKeys({});
    }
}
