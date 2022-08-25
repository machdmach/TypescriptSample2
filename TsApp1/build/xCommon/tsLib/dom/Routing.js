var _a;
import { StringX } from "../core/StringX.js";
import { LocationUrl } from "./LocationUrl.js";
export class Routing {
    //=========================================================================
    static getInfo() {
        let ret = "currentRoute: " + Routing.currentRoute;
        ret += ",\n";
        ret += " segments= [" + this.routeSegments.join(", ") + "]";
        return ret;
    }
    static getRoutSegmentsStr() {
        return "[" + this.routeSegments.join(", ") + "]";
    }
    static equals(route) {
        let ret = this.currentRouteLower === route.toLowerCase();
        return ret;
    }
    //=========================================================================
    static containsSegmentAt(segment, locationIndex) {
        let frag = this.routeSegments[locationIndex];
        let ret = StringX.ciEquals(frag, segment);
        return ret;
    }
    static containsSegment(segment) {
        segment = segment.toLowerCase();
        //let ret = this.routeSegments.includes(segment);
        let ret = this.routeSegments.some(e => StringX.ciEquals(e, segment));
        return ret;
    }
    static startsWith(segment) {
        segment = segment.toLowerCase();
        let ret = this.currentRouteLower.startsWith(segment);
        return ret;
    }
    static endsWith(segment) {
        segment = segment.toLowerCase();
        let ret = this.currentRouteLower.endsWith(segment);
        return ret;
    }
}
_a = Routing;
Routing.currentRoute = uninitString;
Routing.currentRouteLower = uninitString;
Routing.routeSegments = uninit; //#segment, #fragment, #portion, #section, verb: segment the essay by topic
(() => {
    if (_a.currentRoute === uninitString) {
        let route = LocationUrl.searchParams.getNullable("page");
        if (route === null) {
            route = LocationUrl.searchParams.getOrDefault("route", "");
        }
        _a.currentRoute = route;
        _a.currentRouteLower = route.toLowerCase();
        _a.routeSegments = _a.currentRoute.split('-');
        console.log("currentRoute=" + route);
        console.log("routeFragments=", _a.routeSegments.join(', '));
    }
})();
