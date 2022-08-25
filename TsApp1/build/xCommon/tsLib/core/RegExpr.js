import { StringBuilder } from "./StringBuilder.js";
export class RegExpr {
    static test1() {
        let x1 = /z/;
        /*
        https://www.youtube.com/watch?v=EkluES9Rvak
        i (case-insenstive)
        g (global)
        1.4 (dot metacharacter matches any chars, except line breaks)
        1\.4  (escape do) for 1.4
        aaa{4} quantifiers
        aaa{4,10} quantifiers, min=4 max=10
        abc? (c is optional)
        quantifier (+) are greedy**********
        /<.+?>/g   non-greedy(?) after quantifier(+) html tags
        /<.??>/g (0 or 1 quantifier, and non-greedy)
        \s = [\t\r\n]
        \w = [a-zA-Z0-9_]
        \d = [0-9]

        /^\d{4}-(0\d|1[0-2])-([0-2]\d|3[01])$/.test(s); #2012-12-31 ISO 8601 dates

        /^(?!.*foo).+$/   #negative look ahead (anything that doesn't contain "foo")

        /^(?=.*\d)(?=.*[a-z])(?=.*[\W_]).{6,}$/i  #intersection, a 6+ letter passw with at least 1 number, 1 letter, and 1 symbol

        /('|").+?\1/g  #"He said 'boo'"  Nth back reference

        /('|")(\\?.)*?\1/g   #"He 'said' \"hi\"!"
        */
        let f1 = (ss) => ss.replace(new RegExp('\\.js\\.js', 'g'), ".js"); //gi insensitive
        let s;
        console.log((s = "abcjs.js"), " = ", f1(s));
        console.log((s = "abcjs.js.js"), " = ", f1(s));
        let re = new RegExp("zz");
    }
    static camelCaseToEnglishTitle_test() {
        let arr = ["lowercase",
            "Class",
            "MyClass",
            "HTML",
            "PDFLoader",
            "AString",
            "SimpleXMLParser",
            "GL11Version",
            "99Bottles",
            "May5",
            "BFG9000"];
        for (let i = 0; i < arr.length; i++) {
            console.log(arr[i] + "= " + this.camelCaseToEnglishTitle(arr[i]));
        }
    }
    //=========================================================================
    static camelCaseToEnglishTitle(s) {
        if (!s) {
            return "";
        }
        //let ret = s.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1");
        let camelEdges = /([A-Z](?=[A-Z][a-z])|[^A-Z](?=[A-Z])|[a-zA-Z](?=[^a-zA-Z]))/g;
        // It has three clauses, all using lookahead to prevent the regex engine from consuming too many characters:
        // [A-Z](?=[A-Z][a-z]) looks for a capital letter that is followed by a capital then a lowercase. This is to end acronyms like USA.
        // [^A-Z](?=[A-Z]) looks for a non-capital-letter followed by a capital letter. This ends words like myWord and symbols like 99Bottles.
        // [a-zA-Z](?=[^a-zA-Z]) looks for a letter followed by a non-letter. This ends words before symbols like BFG9000.
        s = s.replace(camelEdges, '$1 ');
        s = s.charAt(0).toUpperCase() + s.slice(1);
        return s;
    }
    //=========================================================================
    static match_tests() {
        const s = "file1.mp3 file2.mp3 file3";
        const re = /(\w+)\.mp3/g;
        let arr = s.match(re);
        if (arr) {
            for (let i = 0; i < arr.length; i++) {
                let r = arr[i];
            }
        }
    }
    //=========================================================================
    static exec_tests() {
        const s = "file1.mp3 file2.mp3 file3";
        const re = /(\w+)\.mp3/g;
        this.toStr(re);
        let match = re.exec(s);
        //"".match()
        while (match) {
            this.RegExpExecArray_toStr(match);
            const filename = match[1];
            console.log("fn=" + filename);
            match = re.exec(s);
            //match[0] = file2.mp3
            //match[1] = file1
            //groups = undefined
            //index=10
            //input=s
            //length=2 (array of 2 elts)
            //re.lastIndex = 19
            //
        }
    }
    //=========================================================================
    static RegExpExecArray_toStr(execResult, consoleLog = true) {
        const buf = new StringBuilder();
        let fmt = "{0}={1}\n";
        buf.appendFormat(fmt, "input", execResult.input);
        fmt = "{0}={1}, ";
        buf.appendFormat(fmt, "index", execResult.index);
        buf.appendFormat(fmt, "length", execResult.length);
        buf.appendFormat(fmt, "[0]", execResult[0]);
        buf.appendFormat(fmt, "[1]", execResult[1]);
        buf.appendFormat(fmt, "groups", execResult.groups);
        let ret = buf.toString();
        if (consoleLog) {
            console.log("RegExpExecArray: " + ret);
            //console.log(ret);
        }
        return ret;
    }
    //=========================================================================
    static toStr(re, consoleLog = true) {
        const buf = new StringBuilder();
        let fmt = "{0}={1}\n";
        buf.appendFormat(fmt, "source", re.source);
        fmt = "{0}={1}, ";
        buf.appendFormat(fmt, "flags", re.flags);
        buf.appendFormat(fmt, "global", re.global);
        buf.appendFormat(fmt, "ignoreCase", re.ignoreCase);
        buf.appendFormat(fmt, "multiline", re.multiline);
        buf.appendFormat(fmt, "lastIndex", re.lastIndex);
        let ret = buf.toString();
        if (consoleLog) {
            console.log("RegExp: " + ret);
            //console.log(ret);
        }
        return ret;
    }
    //=========================================================================
    styleHyphenFormat(propertyName) {
        //styleHyphenFormat('borderTop') = 'border-top'.
        function upperToHyphenLower(match, offset, string) {
            return (offset > 0 ? '-' : '') + match.toLowerCase();
        }
        return propertyName.replace(/[A-Z]/g, upperToHyphenLower);
    }
}
RegExpr.emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
