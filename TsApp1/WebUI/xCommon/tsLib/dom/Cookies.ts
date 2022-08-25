/*\
|*|
|*|  :: cookies.js ::
|*|
|*|  A complete cookies reader/writer framework with full unicode support.
|*|
https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies

|*|  https://developer.mozilla.org/en-US/docs/DOM/document.cookie
|*|
|*|  This framework is released under the GNU Public License, version 3 or later.
|*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
|*|
|*|  Syntaxes:
|*|
|*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
|*|  * docCookies.getItem(name)
|*|  * docCookies.removeItem(name[, path], domain)
|*|  * docCookies.hasItem(name)
|*|  * docCookies.keys()
|*|
\*/

//=======================================================================

export class CookiesX {
    static test1() {
    }
    //=======================================================================
    static setExpiresByDays(name: string, value: string, days: number) {
        let futureTimeMillis = new Date().getTime() + (days * 24 * 60 * 60 * 1000);
        let futureDate = new Date(futureTimeMillis);
    }
    static setValue(name: string, value: string, expires: number | string | Date, path?: string, domain?: string) {
        //expires not specified, the cookie becomes a session cookie.
        //A session finishes when the client shuts down, and session cookies will be removed.
        //Domain: If omitted, defaults to the host of the current document URL, not including subdomains.
        //Directives (Expires, Max-Age, Path.... ) are case-insenstive
        //path: if not specified, defaulted to current location.href path

        let ck = encodeURIComponent(name) + "=" + encodeURIComponent(value);
        if (expires) {
            let sExpires = "";
            switch (expires.constructor) {
                case Number:
                    sExpires = (expires === Infinity) ? "expires=Fri, 31 Dec 9999 23:59:59 GMT" : "max-age=" + expires;
                    break;
                case String:
                    sExpires = "expires=" + expires;
                    break;
                case Date:
                    sExpires = "expires=" + (expires as Date).toUTCString(); //"Thu, 19 Dec 2019 17:12:43 GMT"
                    break;
            }
            ck += "; " + sExpires;
        }
        if (path) {
            //ck += "; path=/";
            ck += "; path=" + path;
        }
        document.cookie = ck;
        return ck;
    }
    //buildExpiresMaxAge()
    //=======================================================================
    static containsKey(name: string) {
        let cookieVal = this.getValue(name);
        return cookieVal !== null;
    }
    //=======================================================================
    static getValue(name: string) {
        let nameEQ = escape(name) + "=";
        let arr = document.cookie.split(';');

        let ret: string | null = null;
        for (let i = 0; i < arr.length; i++) {
            let cookieNameValuePair = arr[i];
            while (cookieNameValuePair.charAt(0) === ' ') {
                cookieNameValuePair = cookieNameValuePair.substring(1, cookieNameValuePair.length);
            }
            //if (cookieNameValuePair.indexOf(nameEQ) === 0) {
            if (cookieNameValuePair.startsWith(nameEQ)) {
                let cookieVal = cookieNameValuePair.substring(nameEQ.length, cookieNameValuePair.length);
                ret = decodeURIComponent(cookieVal);
                break;
            }
        }
        return ret;
    }

    static remove(key: string, path?: string, domain?: string) {
        this.setValue(key, "", -1, path, domain);
    }
}
