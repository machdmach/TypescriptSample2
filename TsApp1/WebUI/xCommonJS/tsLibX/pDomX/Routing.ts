import { StringX } from "../pSystemX/StringX.js";
import { LocationUrl } from "./LocationUrl.js";

export class Routing {
    static currentRoute = uninitString;
    private static currentRouteLower = uninitString;
    private static routeSegments = uninit as string[]; //#segment, #fragment, #portion, #section, verb: segment the essay by topic

    static initialize() {
        if (this.currentRoute === uninitString) {
            let route = LocationUrl.searchParams.getNullable("page");
            if (route === null) {
                route = LocationUrl.searchParams.getOrDefault("route", "");
            }
            this.currentRoute = route;
            this.currentRouteLower = route.toLowerCase();
            this.routeSegments = this.currentRoute.split('-');

            console.log("currentRoute=" + route);
            console.log("routeFragments=", this.routeSegments.join(', '));
        }
    }
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

    static equals(route: string): boolean {
        let ret = this.currentRouteLower === route.toLowerCase();
        return ret;
    }

    //=========================================================================
    static containsSegmentAt(segment: string, locationIndex: number) {
        let frag = this.routeSegments[locationIndex];
        let ret = StringX.ciEquals(frag, segment);
        return ret;
    }
    static containsSegment(segment: string): boolean {
        segment = segment.toLowerCase();
        //let ret = this.routeSegments.includes(segment);
        let ret = this.routeSegments.some(e => StringX.ciEquals(e, segment));
        return ret;
    }
    static startsWith(segment: string) {
        segment = segment.toLowerCase();
        let ret = this.currentRouteLower.startsWith(segment);
        return ret;
    }
    static endsWith(segment: string) {
        segment = segment.toLowerCase();
        let ret = this.currentRouteLower.endsWith(segment);
        return ret;
    }
}
Routing.initialize();
