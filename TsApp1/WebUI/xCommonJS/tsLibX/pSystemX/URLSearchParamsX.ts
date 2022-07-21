import { StringX } from "./StringX.js";
import { AppLocalStorage, HostLocalStorage } from "../pSystemX/StorageX.js";

export class URLSearchParamsX {
    searchStr: string = "";
    searchParams: URLSearchParams;
    constructor(searchStr: string) {
        this.searchStr = searchStr;
        this.searchParams = new URLSearchParams(searchStr);
    }
    //=========================================================================
    getNullable(name: string): string | null {

        if (!name) {
            throw Error("Invalid arg [name], must not be blank");
        }
        //let searchParams = new URLSearchParams(location.search); //.toLowerCase());
        //let searchParams = new URLSearchParams(windowBag.location.search); //.toLowerCase());
        //let paramsNoQuestionMark = new URLSearchParams(url.search.slice(1));
        //let entries: IterableIterator<[string, string]> = searchParams.entries;
        //let entries = searchParams.entries;
        //let ret: string | null = searchParams.get(name);
        let nameLower = name.toLowerCase();
        let ret: string | null = null;
        let alreadyFound = false;
        for (let entry of this.searchParams.entries()) {
            let key = entry[0];
            if (key.toLocaleLowerCase() === nameLower) {
                if (alreadyFound) {
                    throw Error(`already found value for param ${name}`);
                }
                ret = entry[1];
                alreadyFound = true;
            }
        }
        console.info(`URLSearchParam ${name}, ret=${ret}`);
        return ret;
    }

    //=========================================================================
    getInt(name: string) {
        let s = this.get(name, true) as string;
        let ret = parseInt(s, 10);
        return ret;
    }

    //=========================================================================
    containsKeyValue(name: string, val: string) {
        let ret = this.getNullable(name);
        return StringX.ciEquals(ret, val);
    }

    containsKey(name: string) {
        let ret = this.getNullable(name);
        return ret !== null;
    }
    //=========================================================================
    get(name: string, throwsOnNotFound = true): string | null {
        let ret = this.getNullable(name);
        if (ret === null) {
            if (throwsOnNotFound) {
                throw Error(`Search Param [${name}] not found in URL`);
            }
        }
        return ret;
    }
    //=========================================================================
    getOrDefault(name: string, defaultVal: string): string {
        let ret: string | null = this.getNullable(name);
        if (ret === null) {
            ret = defaultVal;
        }
        return ret;
    }
    //=========================================================================
    getOrDefault_HLS(name: string, defaultVal: string): string {
        let ret = this.getNullable(name);
        let ls = new HostLocalStorage("UrlParam:" + name);
        if (ret === null) {
            //not found on URL
            //ret = defaultVal;
            ret = ls.getItemOrDefault(defaultVal);
        }
        else {
            ls.setItem(ret);
        }
        return ret;
    }
    //=========================================================================
    buildURLSearchPart(obj: any) {
        let encodedString = '';

        if (obj instanceof FormData) {
            let fd = obj;
            //fd.
        }
        else {
            for (let prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    if (encodedString.length > 0) {
                        encodedString += '&';
                    }
                    encodedString += encodeURI(prop + '=' + obj[prop]);
                }
            }
        }
        //not including the prefix question mark
        //let url1 = new URL('https://developer.mozilla.org/en-US/docs/Web/API/URL/pathname?Q=value&v2=33');
        //url1.search = ?Q=value&v2=33 (note the prefix questionMark)
        return encodedString;
    }

    //=========================================================================
    static fromFormData(fd: FormData) {
        let ret = new URLSearchParams();
        let k = 0;
        for (let pair of fd.entries()) {
            let val: FormDataEntryValue = pair[1];
            if (val instanceof File) {
                throw Error("val can't be of type File");
            }
            ret.append(pair[0], val);
        }
        return ret;
    }

    //=========================================================================
    static test1() {
        if ("") {
            let params = new URLSearchParams();
            params.append("name1", "val1");
            params.set("name1", "v1");
        }
        if ("") {
            let url = new URL('https://example.com?foo=1&bar=2');
            let params = new URLSearchParams(url.search.slice(1));

            //Add a second foo parameter.
            params.append('foo', '4');
            console.log(params.toString());
            //Prints 'foo=1&bar=2&foo=4'

            // // note: params can also be directly created
            // let url = new URL('https://example.com?foo=1&bar=2');
            // let params = url.searchParams;

            // // or even simpler
            // let params = new URLSearchParams('foo=1&bar=2');
        }
    }
}
