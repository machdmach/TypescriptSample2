export class NumberX {
  //Number('123abc') => NaN
  //parseInt('123abc') => 123
  static isNumeric(x: any) {
    //NaN == | === NaN = false;
    return !isNaN(this.parseFloat(x));
  }
  static isNumber(x: unknown): boolean {
    if (typeof x === "number") return true;
    if (/^0x[0-9a-f]+$/i.test(String(x))) return true;
    return /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(String(x));
  }
  //=========================================================================
  // console.log(filterInt('421'));               // 421
  // console.log(filterInt('-421'));              // -421
  // console.log(filterInt('+421'));              // 421
  // console.log(filterInt('Infinity'));          // Infinity
  // console.log(filterInt('421e+0'));            // NaN
  // console.log(filterInt('421hop'));            // NaN
  // console.log(filterInt('hop1.61803398875'));  // NaN
  // console.log(filterInt('1.61803398875'));     // NaN
  static filterInt(value: string) {
    //if (false) return 1;
    if (/^[-+]?(\d+|Infinity)$/.test(value)) {
      return Number(value);
    } else {
      return NaN;
    }
  }
  //=========================================================================
  static parseInteger(x: any, throwOnNaN = false): number {
    let ret = this.parseFloat(x, throwOnNaN);
    if (!isNaN(ret)) { //is a number
      if (Number.isInteger(ret)) {
        //ok
      }
      else {
        //is decimal, eg: 1.23
        if (throwOnNaN) {
          throw Error(x + " is a float, not an integer");
        }
        else {
          ret = NaN;
        }
      }
    }
    return ret;
  }
  //=========================================================================
  static parseFloat(x: any, throwOnNaN = false): number {
    //  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
    //isNaN('');        // false: the empty string is converted to 0 which is not NaN
    let reason = "";
    let ret = NaN;
    if (typeof (x) === "undefined") {
      reason = "is undefined";
    }
    else if (x === null) {
      reason = "is null";
    }
    else {
      ret = parseFloat(x); //parseFloat(null | "")=NaN
      //parseFloat("3.3xx")= 3.3; ignoring the remainning chars
      if (isNaN(ret)) {
        reason = "is not a float(is NaN): " + x;
      }
      else if (!isFinite(x)) {
        //false if the argument is positive or negative Infinity or NaN or undefined; otherwise, true.
        // x divided by zero = infinite
        reason = "not isFinite: " + x;
      }
    }
    if (isNaN(ret) && throwOnNaN) {
      throw Error(reason);
    }
    return ret;
  }

  //=========================================================================
  static validateIntegerRange(value: number, name: string, min = -2147483648, max = 2147483647): void {
    // The defaults for min and max correspond to the limits of 32-bit integers.
    if (!Number.isInteger(value)) {
      throw new Error(`${name} must be 'an integer' but was ${value}`);
    }
    if (value < min || value > max) {
      throw new Error(`${name} must be >= ${min} && <= ${max}.  Value was ${value}`);
    }
  }
}
