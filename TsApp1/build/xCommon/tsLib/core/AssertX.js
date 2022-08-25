//https://www.automatetheplanet.com/nunit-cheat-sheet/
//http://junit.sourceforge.net/javadoc/org/junit/Assert.html
//Assert.AreSame(_expectedRocket, _actualRocket); // Tests whether the specified objects both refer to the same object
export class AssertX {
    static isOfType(val, type) {
        if (!(val instanceof type)) {
            throw Error(`Expected type ${type}, but received ${typeof val}`);
        }
    }
    static functionExists(functionName, obj, errMesg) {
        if (functionName in obj) {
            let func = obj[functionName];
            if (typeof func === "function") {
                //ok
            }
            else {
                let err = `'${functionName}' of type ${typeof func} is not a function in obj: ${obj}, mesg=${errMesg}`;
                console.error(err, obj);
                throw Error(err);
            }
        }
        else {
            let err = `function '${functionName}' doesn't exist in obj: ${obj}, mesg=${errMesg}`;
            console.error(err, obj);
            throw Error(err);
        }
    }
    //=========================================================================
    static isString(val) {
        //#assert #condition, #assertion #functions
        //diff from #guarded #functions
        if (typeof val !== "string") {
            throw Error("Not a string!");
        }
    }
    static isDefined(val) {
        if (val === undefined || val === null) {
            throw Error(`Expected 'val' to be defined, but received ${val}`);
        }
    }
    static assertTests() {
        let s1 = 2;
        AssertX.isString(s1);
        let lower = s1.toLocaleLowerCase();
        let foo = undefined;
        let optionalChaining = foo === null || foo === void 0 ? void 0 : foo.bar.baz(); //
        //let x = (foo === null || foo === undefined) ?  undefined :  foo.bar.baz();
        //let x = (_a = foo) === null || _a === void 0 ? void 0 : _a.bar.baz();
        let z = void 0;
        //alert(z);
        //let bar = function () { };
        let nullishCoalescing = foo !== null && foo !== void 0 ? foo : "bar"; //#nullish #coalesce, //#optional #chaining
        let nullishCoalescingEq = (foo !== null && foo !== undefined) ? foo : "bar";
    }
    static isTrue(val, errMesg) {
        if (!val) {
            this.throwError("isTrue", val, errMesg);
        }
    }
    static isTruthyTest(val, errMesg) {
        if (!val) {
            this.throwError("true", val, errMesg);
        }
    }
    static isTruthy(val, errMesg) {
        //if (True) throw new Error("ss");
        if (!val) {
            this.throwError("true", val, errMesg);
        }
    }
    static isFalsy(val, errMesg) {
        if (val) {
            this.throwError("isFalsy", val, errMesg);
        }
    }
    static isGreaterThan(src, target, errMesg) {
        this.isTruthy(src > target, errMesg);
    }
    static isLessThan(src, target, errMesg) {
        this.isTruthy(src < target, errMesg);
    }
    static areEqual(operand1, operand2, errMesg) {
        if (operand1 !== operand2) {
            throw Error(errMesg);
        }
    }
    static areStrictlyEqual(operand1, operand2, errMesg) {
        if (operand1 !== operand2) {
            throw Error(errMesg);
        }
    }
    static areSame(operand1, operand2, errMesg) {
        //AreSameValue
        //Tests whether the specified objects both refer to the same object
        if (!Object.is(operand1, operand2)) {
            throw Error(errMesg);
        }
    }
    static areNotSame(operand1, operand2, errMesg) {
        //AreSameValue
        //Tests whether the specified objects both refer to the same object
        if (!Object.is(operand1, operand2)) {
            throw Error(errMesg);
        }
    }
    static isNull(v) {
        if (v !== null) {
            throw Error("null");
        }
    }
    static isNotNull(v) {
        if (v === null) {
            throw Error("null");
        }
    }
    static isPositive(val, errMesg) {
        if (!val || val <= 0) {
            this.throwError("isPositive", val, errMesg);
        }
    }
    static isNegative(val, errMesg) {
        if (!val || val >= 0) {
            this.throwError("isNegative", val, errMesg);
        }
    }
    static throwError(expected, actual, errMesg) {
        let mesg = "";
        if (errMesg) {
            mesg += errMesg + ". ";
        }
        mesg += "Assert failed, expected: " + expected + ", actual: " + actual;
        console.error(mesg);
        console.trace(mesg);
        throw new Error(mesg);
    }
}
