export class StringX {
    static replaceAll(s: string, substr: string, replacement: string): string {
        return s;
    }
    static ciEquals(a: string | null, b: string | null) {
        return typeof a === 'string' && typeof b === 'string'
            ? a.localeCompare(b, undefined, { sensitivity: 'base' }) === 0
            : a === b;
        // a==refStr, b: compareStr
        //return postive if refStr GT, neg if refStr LE, 0 if eq.

        //sensitivity: 'accent': a===A, a!=a', compare accent
        //'base':  a===a', a===A, compare base only
        //'case': a===a', a!=A, compare with case
        //'variant': default: all diff
    }
    //=========================================================================
    static extractNumber(s: string): number | undefined {
        let matches = s.match(/(\d+)/);
        let ret: number | undefined = undefined;
        if (matches) {
            let m = matches[0];
            ret = parseInt(m, 10);
        }
        console.debug(`${ret} extractNumber from ${s}`);
        return ret;
    }
    //=========================================================================sfsff
    static isNullOrWhiteSpace(s: string | String | null | undefined) {
        let ret = true;
        if (s) {
            if (s.trim()) {
                ret = false;
            }
        }
        return ret;
    }
    //=========================================================================
    static padLeft(value: string, padding: any) {
        //let eg = "zz".padStart;

        if (typeof padding === "number") {
            return Array(padding + 1).join(" ") + value;
        }
        if (typeof padding === "string") {
            return padding + value;
        }
        throw new Error(`Expected string or number, got '${padding}'.`);
    }
    //=========================================================================
    static isString(s: any): s is string {
        //static isString(s: any) {
        //return typeof x === "string";
        // let s: string = "asdf";
        // s.replace("aa", "bb");

        // //  result += ph
        // s = s.replace(/&/g, '&amp;');
        if (typeof (s) === 'string') { }
        return s instanceof String;
    }
    static replaceAll_eg() {
        //let pattern = ""
        //s = s.replace(/&/g, '&amp;');
    }

    //=========================================================================
    static format(fmt: string, ...args: any[]) {
        //"{0} is dead, but {1} is alive! {0} {2}".format("ASP", "ASP.NET")

        //const args = Array.prototype.slice.call(arguments, 1);
        let regex = /{(\d+)}/g;

        let replacer = function (matchedSubStr: string, $1: number, offsetFromStartOfInputStr: number, inputStr: string) {
            //$1 is the first string found by a parenthesized capture group,

            let val = args[$1];
            return (typeof val !== 'undefined') ? val : matchedSubStr;
        };
        let ret = fmt.replace(regex, replacer);
        return ret;
    }

    //=========================================================================
    static format_tests() {

        console.log(StringX.format('{0} is dead, but {1} is alive! {0} {2}', 'ASP', 'ASP.NET'));
    }
    static test1() {

        const filePath = String.raw`C:\Development\profile\aboutme.html`; //raw........

        let z = String.raw`Hi\n${2 + 3}!`; //'Hi\n5!', the character after 'Hi'// is not a newline character,// '\' and 'n' are two characters.
        //let s3 = String.raw({ raw: ['foo', 'bar', 'baz'] }, 2 + 3, 'Java' + 'Script'); // 'foo5barJavaScriptbaz'

        let who = 'me';
        //         let s1 = `hello world`
        //             `hello!
        //  world!`
        //             `hello ${who}`
        //         tag`<a>${who}</a>`;
        //     }
        let longString = "This is a very long string which needs \
to wrap across multiple lines because \
otherwise my code is unreadable.";

    }

    // function f1() {
    //     type Easing = "ease-in" | "ease-out" | "ease-in-out";
    //     enum Enum1 {
    //         a = 1,
    //         b,
    //         c,
    //     }
    //     let e1: Enum1 = Enum1.a;
    //     console.log('e1 valueOf is: ',
    //         e1.toString(), //1
    //         Enum1.b, //2
    //         Enum1[Enum1.a], //a
    //         e1.valueOf(), //1
    //     );
    // }
}