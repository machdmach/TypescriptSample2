export class MixinHelper {
    static applyMixins(derivedClass, baseClasses) {
        //Usage: MixinHelper.applyMixins(SubClass1, [DisposableClass, ActivatableClass]);
        baseClasses.forEach(baseClass => {
            Object.getOwnPropertyNames(baseClass.prototype).forEach(name => {
                let pd = Object.getOwnPropertyDescriptor(baseClass.prototype, name);
                if (pd !== undefined) {
                    Object.defineProperty(derivedClass.prototype, name, pd);
                }
            });
        });
    }
    //=========================================================================
    static test1() {
        let x = 33;
        let s = x.toLocaleString("en"); //1,233,222
        //const theBiggestInt = 9007199254740991n; //ESNext Only
        // const alsoHuge = BigInt(9007199254740991);
        // // ↪ 9007199254740991n
        // const hugeString = BigInt("9007199254740991");
        // // ↪ 9007199254740991n
        // let bb = 0x1ff;
        // let z = globalThis;
        // const hugeHex = BigInt("0x1fffffffffffff");
        // // ↪ 9007199254740991n
        // const hugeBin = BigInt("0b11111111111111111111111111111111111111111111111111111");
        // // ↪ 9007199254740991n
    }
}
//=========================================================================
// Disposable Mixin
class Disposable {
    constructor() {
        this.isDisposed = false;
    }
    dispose() {
        this.isDisposed = true;
    }
}
// Activatable Mixin
class Activatable {
    constructor() {
        this.isActive = false;
    }
    activate() {
        this.isActive = true;
        return true;
    }
    deactivate() {
        this.isActive = false;
    }
}
class SmartObject {
    constructor() {
        // Disposable
        this.isDisposed = false;
        // Activatable
        this.isActive = false;
        setInterval(() => console.log(this.isActive + " : " + this.isDisposed), 500);
    }
    m1() { }
    interact() {
        this.activate();
    }
    dispose() { }
    //activate: () => void = function () { };
    activate() { throw "mixin"; }
    deactivate() { }
    static get get1() { return 1; }
    //=========================================================================
    static test1() {
        MixinHelper.applyMixins(SmartObject, [Disposable, Activatable]);
        let i1 = new SmartObject();
        i1.m1();
        let smartObj = new SmartObject();
        setTimeout(() => smartObj.interact(), 1000);
        smartObj.deactivate();
        let b = smartObj.activate();
        //let ne: never = 1;
        //let b2 = ne;
    }
}
// // copy the methods
// Object.assign(User.prototype, sayHiMixin);
//=========================================================================
// let calculatorMixin = Base => class extends Base {
//     calc() { }
// };
// let randomizerMixin = Base => class extends Base {
//     randomize() { }
// };
// class Foo { }
// class Bar extends calculatorMixin(randomizerMixin(Foo)) { }
//let xx = class { };
// function extend<First, Second>(first: First, second: Second): First & Second {
//     const result: Partial<First & Second> = {};
//     for (const prop in first) {
//         if (first.hasOwnProperty(prop)) {
//             (result as First)[prop] = first[prop];
//         }
//     }
//     for (const prop in second) {
//         if (second.hasOwnProperty(prop)) {
//             (result as Second)[prop] = second[prop];
//         }
//     }
//     return result as First & Second;
// }
