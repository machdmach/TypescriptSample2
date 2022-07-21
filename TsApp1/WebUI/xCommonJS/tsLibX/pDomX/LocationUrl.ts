import { URLSearchParamsX } from "../pSystemX/URLSearchParamsX.js";
import { Routing } from "./Routing.js";

export class LocationUrl {
    static urlLower: string;

    private static _searchParams: URLSearchParamsX;
    static get searchParams(): URLSearchParamsX {
        this._searchParams = new URLSearchParamsX(location.search);
        return this._searchParams;
    }
    static init() {
        this.urlLower = location.href.toLowerCase();
        //this.searchParams = new URLSearchParamsX(location.search);
    }
    //=========================================================================
    static {
        let x = location.href;
        this.init();
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
    static pathContainsSegment(segment: string) {
        let r: Routing;
    }
}
