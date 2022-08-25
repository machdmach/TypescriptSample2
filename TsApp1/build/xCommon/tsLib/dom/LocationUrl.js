var _a;
import { StringX } from "../core/StringX.js";
import { URLSearchParamsX } from "../core/URLSearchParamsX.js";
export class LocationUrl {
    //=========================================================================
    static pathContains(substr) {
        if (substr) {
            return this.urlLower.includes(substr.toLowerCase());
        }
        else {
            return false;
        }
    }
    //=========================================================================
    static pathContainsSegment(segment) {
        segment = segment.toLowerCase();
        //let ret = this.routeSegments.includes(segment);
        let ret = this.pathSegments.some(e => StringX.ciEquals(e, segment));
        return ret;
    }
    //=========================================================================
    static makeUrlfullyQualified(urlHref) {
        let url;
        try {
            url = new URL(urlHref, location.href);
        }
        catch (ex) {
            //TypeError: Failed to construct 'URL': Invalid URL
            // location.host=localhost:232
            throw Error(`[urlHref: ${urlHref}, location.host=${location.host} <br>\n` + ex);
        }
        return url.href;
    }
}
_a = LocationUrl;
LocationUrl.pathSegments = uninit; //#segment, #fragment, #portion, #section, verb: segment the essay by topic
(() => {
    _a.urlLower = location.href.toLowerCase();
    _a.searchParams = new URLSearchParamsX(location.search);
    _a.pathSegments = location.pathname.split('/');
    console.log("pathFragments=", _a.pathSegments.join(', '));
})();
