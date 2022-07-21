import { StringBuilder } from "./StringBuilder.js";
import { URLSearchParamsX } from "./URLSearchParamsX.js";

export class UrlX {
    static url: URL;
    static searchParms: URLSearchParamsX;
    static remove_zzThings(urlHref: string): string {
        let url = new URL(urlHref);
        let searchParams = url.searchParams;
        let newSearchParams = new URLSearchParams();
        searchParams.forEach((paramValue: string, key: string) => {
            if (!key.startsWith("zz")) {
                newSearchParams.set(key, paramValue);
            }
        });
        let ret = new URL(url.href);
        ret.search = newSearchParams.toString();
        return ret.href;

    }
    static removeQueryParam(urlHref: string, paramName: string): string {
        let url = new URL(urlHref);
        let searchParams = url.searchParams;
        searchParams.delete(paramName);
        let ret = new URL(url.href);
        ret.search = searchParams.toString();
        return ret.href;

    }

    static setQueryNV(urlHref: string, paramName: string, value: string): string {
        if (!paramName) {
            throw Error("Invalid arg [name], must not be blank");
        }
        let url = new URL(urlHref);
        let searchParams = url.searchParams;
        paramName = paramName.toLowerCase();
        let oldVal = searchParams.get(paramName);
        if (oldVal === null) {
            // if (throwsOnNotFound) {
            //     throw Error(`Search Param [${name}] not found in URL`);
            // }
        }
        searchParams.set(paramName, value);

        let ret = new URL(url.href);
        ret.search = searchParams.toString();
        return ret.href;
    }
    //=========================================================================
    static encodeURIComponentForPath(url: string) {
        // let tempToken = "x82kdD";
        // let ret = url.replace(/\//g, tempToken);
        // ret = encodeURIComponent(ret);
        // ret = ret.replace(/tempToken/g, '/');
        //encodeURIComponent() will not encode: ~!*()'
        //encodeURI() does not encode ~!@#$&*()=:/,;?+
        //and encodeURIComponent() does not encode -_.!~*'(),

        // return encodeURIComponent(str).replace(/[!'()*]/g, (c) => {
        //     return '%' + c.charCodeAt(0).toString(16)
        //   })

        let segments = url.split('/');
        const buf = new StringBuilder();
        segments.forEach(e => {
            buf.append(e);
        });
        let ret = buf.toString();

        return ret;
    }

    //=========================================================================
    static toStr(url: string | URL) {
        if (typeof url === "string") {
            url = new URL(url);
        }
        const buf = new StringBuilder();
        let fmt = "{0} = {1}\n";
        buf.appendFormat(fmt, "href", url.href); // whole url (including search query params)
        buf.appendFormat(fmt, "protocol", url.protocol); // https
        buf.appendFormat(fmt, "host (authority, includes portNumber)", url.host); //host: with PortNumber
        buf.appendFormat(fmt, "hostname", url.hostname); //hostname without port
        buf.appendFormat(fmt, "port", url.port); //
        buf.appendFormat(fmt, "pathname", url.pathname); // path, including leading /
        buf.appendFormat(fmt, "search", url.search); //?Q=value&v2=33
        //buf.appendFormat(fmt, "", url); //
        return buf.toString();
    }
    //=========================================================================
    static test1() {
        let url1 = new URL('https://developer.mozilla.org/en-US/docs/Web/API/URL/pathname?Q=value&v2=33');
        let url = 'https://developer.mozilla.org/en-US/docs/Web/API/URL/pathname?Q=value&v2=33';
        console.log("url: " + this.toStr(url));

        let url2 = UrlX.setQueryNV(url, "q", "v22");
        console.log("url2: " + this.toStr(url2));
    }
}
