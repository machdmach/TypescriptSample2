import { StringBuilder } from "./StringBuilder.js";

export class Randomizer {

    static generateDecimal(min: number, max: number, decimalPlaces: number) {
        //3.14 is the approximation of π to two decimals (decimal = digits after decimal seperator (.))
        let multiplier = Math.pow(10, decimalPlaces);

        let rval = Math.random() * (max - min) + min;
        rval *= multiplier;
        rval = Math.round(rval);
        rval = rval / Math.pow(10, decimalPlaces);
        return rval;
    }
    static generateParagraph_withLengths(...lenArr: number[]) {

        let i = Math.floor(Math.random() * lenArr.length);
        let len = lenArr[i];
        return this.generateParagraph(len, len);
    }
    static generateParagraph(minLen: number = 1, maxLen: number = 1000) {
        if (minLen > maxLen) {
            throw Error("Invalid args, minLen GT maxLen");
        }

        let len: number;
        if (minLen === maxLen) {
            len = minLen;
        } else {
            len = Math.floor(Math.random() * (maxLen - minLen)) + minLen;
        }
        let buf = new StringBuilder();
        for (let i = 0; i < len; i++) {
            let word = this.generateWord(3, 20);
            word += " ";
            if ((buf.length + word.length) > maxLen) {
                break;
            }
            buf.append(word);
        }
        while (buf.length < minLen) {
            buf.append(".");
        }
        return buf.toString();
    }
    static generateWord(minLen: number = 1, maxLen: number = 20) {
        if (minLen > maxLen) {
            throw Error("Invalid args, minLen GT maxLen");
        }
        let len = Math.floor(Math.random() * (maxLen - minLen) + minLen);
        let buf = new StringBuilder();
        for (let i = 0; i < len; i++) {
            buf.append(this.generateChar());
        }
        return buf.toString();
    }
    static generateChar() {
        let allChars = "abcdefghijklmnopqrstuvwxyz"; //26 chars
        let i = Math.floor(Math.random() * (allChars.length - 1));
        return allChars[i];
    }

    static generateInteger(min: number, max: number = Number.MAX_SAFE_INTEGER) {
        let x = Math.random() * 10000;

        let rval = Math.random() * (max - min) + min;
        rval = Math.round(rval);
        return rval;
    }
    static pickOne(...arr: any[]) {
        let randomIndex = this.generateInteger(0, arr.length - 1);
        let rval = arr[randomIndex];
        console.log(`generateFromArray, randomIndex=${randomIndex} rval=` + rval);
        return rval;
    }

}
