
export class ASCIIString {

    static removeNonPrintableAndWhitespaceChars(strData: string) {
        if (!strData) {
            return strData;
        }
        let ret = "";
        let i = 0;
        for (; i < strData.length; i++) {
            let code: number | undefined = strData.codePointAt(i);
            if (code === undefined) {
                throw Error("code is undefined at char: " + i);
            }

            if (0x20 < code && code <= 0x7E) { //0x20: space, 0x7E: ~
                ret += String.fromCodePoint(code);
            }
            else {
                console.warn("character removed, codePoint:" + code);
                //8206 caused by date.toLocalDateString();
            }
        }
        return ret;
    }
    //=========================================================================
    static isValidASCIIOnlyData(strData: string | null): [boolean, string] {
        //if (/[a-zA-Z0-9]*/.test(data)) {

        let ret = true;
        let info = "";
        if (!strData) {
            return [ret, info];
        }

        let i = 0;
        for (; i < strData.length; i++) {
            let code: number | undefined = strData.codePointAt(i);
            if (code === undefined) {
                throw Error("code is undefined at char: " + i);
            }

            if (code === 0x60) {//back tick`
                info = "Back tick (`) is not allowed";
                ret = false; break;
            }
            else if (code === 0x09) { //tab
                info = "Tab character is not allowed";
                ret = false; break;
            }
            else if ((0x20 <= code && code <= 0x7E)  //0x20: space, 0x7E: ~
                || code === 0x0A  //LF
                || code === 0x0D) { //CR
                //nothing, ret = true;
            }
            // if ((0x30 <= code && code <= 0x39)  //a-z
            //     || (0x41 <= code && code <= 0x5A)  //A-Z
            //     || (0x61 <= code && code <= 0x7A)  //a-z
            //     || False) {
            //     ret = true;
            // }
            else {
                info = `character with code point 0x[${code.toString(16)}] is not allowed`;
                ret = false; break;
            }
        }
        if (!ret) {
            info += ", bad character at position: " + i;
            info += ", after: " + strData.substring(0, i);
        }
        if (info) {
            //console.error(info);
        }
        return [ret, info];
    }
    //=========================================================================
    static isValidASCIIOnlyData_test() {
        console.log("isValidASCIIOnlyData_test");
        let lambda1 = (s: string) => {
            let [isOK, info] = this.isValidASCIIOnlyData(s);
            if (isOK) {
                console.log(`${s} ${isOK}`);
            }
            else {
                console.error(`${s} ${isOK} --info: ${info}`);
            }
        };
        lambda1("a\r\nsdfjklzAsadfZ0123456789"); // \f is a bad char
        lambda1("as`dfjklzAsadfZ0123456789-");
        lambda1("a\tsdfjklzAsadfZ0123456789-`");
        lambda1("xé");
        let z = String.raw`safsd\r`;
    }
}
