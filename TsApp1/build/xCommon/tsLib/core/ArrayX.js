export class ArrayX {
    //=========================================================================
    static eg3() {
        [].forEach(x => {
            //this.f1();
        });
        [].forEach(function () {
            //var x = this.zz;
        }.bind(this));
        [].forEach(function () {
            //var x = this.zz;
        }, this);
        if (Array.isArray(null)) { }
        let sa = ['aa', 'bb'];
        let sorted = sa.sort((a, b) => a.length - b.length);
        this.distinct([1, 'a']);
    }
    // slice_eg1() {
    //     let f: HTMLFormElement = document.forms[0];
    //     Array.prototype.slice.call(f.elements).forEach((el: HTMLFormElement) => {
    //         el.disabled = true;
    //     });
    // }
    //=========================================================================
    //https://github.com/handsontable/handsontable/blob/master/src/helpers/array.js
    static distinct(src) {
        //select distinct col1 from tab1;
        const unique = [];
        src.forEach(value => {
            if (unique.indexOf(value) === -1) {
                unique.push(value);
            }
        });
        return unique;
    }
    //=========================================================================
    /**
     * A custom TypeGuardFunction that determines whether the array contains only numbers.
     * eg:
     *     if (ArrayOfNumbers.areAllNumbers(arr)){
     *        let x: number = arr[1];
     *     }
     */
    static areAllNumbers(value) {
        //#guarded function
        return (Array.isArray(value) &&
            value.every(element => typeof element === "number"));
        //const someString: string = value as string; //TypeAssertion  (val as string)
    }
    //=========================================================================
    static areAllStrings(value) {
        return (!!value && //#todo
            Array.isArray(value) &&
            value.every(element => typeof element === "string"));
    }
    //=========================================================================
    static tail(arg) {
        const [_, ...allButFirst] = arg;
        return allButFirst;
    }
}
