import { StringX } from "../core/StringX.js";
import { URLSearchParamsX } from "../core/URLSearchParamsX.js";
import { Routing } from "./Routing.js";

export class LocationUrl {
    static urlLower: string;
    static searchParams: URLSearchParamsX;
    private static pathSegments = uninit as string[]; //#segment, #fragment, #portion, #section, verb: segment the essay by topic

    static {
        this.urlLower = location.href.toLowerCase();
        this.searchParams = new URLSearchParamsX(location.search);

        this.pathSegments = location.pathname.split('/');
        console.log("pathFragments=", this.pathSegments.join(', '));
    }

    //=========================================================================
    static pathContains(substr: string): boolean {
        if (substr) {
            return this.urlLower.includes(substr.toLowerCase());
        }
        else {
            return false;
        }
    }

    //=========================================================================
    static pathContainsSegment(segment: string): boolean {
        segment = segment.toLowerCase();
        //let ret = this.routeSegments.includes(segment);
        let ret = this.pathSegments.some(e => StringX.ciEquals(e, segment));
        return ret;
    }

    //=========================================================================
    static makeUrlfullyQualified(urlHref: string): string {
        let url: URL;
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
