import { LocationUrl } from "./LocationUrl.js";
import { StorageConfig } from "../core/StorageX.js";
import { serverSideBag } from "../core/KeyedBag.js";
export class ConfigX {
    static get isMediaScreenMobile() { return this.isRunningInBrowser && window.screen.width < 768; }
    static get isMediaScreenDesktop() { return this.isRunningInBrowser && 768 <= window.screen.width; }
    //=========================================================================
    static init(appName) {
        this.appName = appName;
        StorageConfig.setAppNameAsKeyPrefix(appName);
    }
    static initialize() {
        var _a;
        if ((_a = window === null || window === void 0 ? void 0 : window.screen) === null || _a === void 0 ? void 0 : _a.width) {
            this.isRunningInBrowser = true;
        }
        if (this.isRunningInBrowser) {
            this.clientSideBaseUrl = serverSideBag.getOrDefault("clientSideBaseUrl", "?");
            //this.isMediaScreenMobile = window.screen.width < 768;
            if (location.port) {
                this.portStart = parseInt(location.port, 10) / 100;
            }
            let hostnameLower = location.hostname.toLowerCase().replace(".ccdoa.net", "");
            this.isExternalProdUrl = hostnameLower.endsWith(".com") || hostnameLower.endsWith(".aero");
            if (hostnameLower.startsWith("beta.")) {
            }
            this.isLocalhost = Boolean(// tslint:disable-line
            window.location.hostname === 'localhost' ||
                // [::1] is the IPv6 localhost address.
                window.location.hostname === '[::1]' ||
                // 127.0.0.1/8 is considered localhost for IPv4.
                window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/) // tslint:disable-line
            //if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
            );
        }
        this.isLocalDev = this.isLocalhost; // && location.port === this.localDevPort.toString(10);
        this.isDebug = LocationUrl.searchParams.getOrDefault_HLS("zz-db", "0") === "1";
        this.isLocalDebug = this.isLocalhost && this.isDebug;
        db = this.isDebug;
        this.isLocalTesting = this.isLocalhost && LocationUrl.searchParams.containsKey("zz-test");
        Config.isDebug = this.isDebug;
        Config.isLocalDebug = this.isLocalDebug;
        console.log("ConfigX.initialize() complete");
    }
    static get DataApiUrlRoot() {
        let ret = this._DataApiUrlRoot;
        if (ret !== uninitString) {
            return ret; //---------------------------
        }
        if (this.isRunningOnWebpackDevServer) {
            //#apiURL, #portNum, #apiPort
            ret = `http://localhost:3131/`; //VS,
            //ret = 'https://i-web-01:44341/'; //Todo: CORS error
        }
        else {
            ret = "/";
        }
        console.log("thisClass.DataApiUrlRoot=" + ret);
        this._DataApiUrlRoot = ret;
        return ret;
    }
    static get isRunningOnWebpackDevServer() {
        return window.location.host === "localhost:3132";
    }
    static setDataApiUrlBase(val) { this.DataApiUrlBase = val; }
    static initDataApiUrlBase(apiRealm) {
        if (!apiRealm.endsWith("/")) {
            apiRealm += "/";
        }
        this.DataApiUrlBase = `${ConfigX.DataApiUrlRoot}${apiRealm}`;
    }
    static get dbEnv() { return this._dbEnv; }
    static isEnv(env) {
        if (!this.dbEnv) {
            throw Error("dbEnv not set");
        }
        return this.dbEnv.localeCompare(env, undefined, { sensitivity: 'base' }) === 0;
    }
    //=========================================================================
    static get isDbDev() { return this.isEnv("Dev"); }
    static get isDbQA() { return this.isEnv("Test") || this.isEnv("QA"); }
    static get isDbProd() { return this.isEnv("Prod"); }
    //=========================================================================
    static ensureDbNonProd() {
        if (this.isDbProd) {
            throw Error("cannot test in Prod");
        }
    }
    //=========================================================================
    static get isWindowBeingIframed() {
        let isInIframe = (parent !== window);
        let or1 = (window.top !== window.self);
        return isInIframe;
    }
    //=========================================================================
    static get isWindowBeingPoppedup() {
        let ret;
        ret = window.locationbar.visible;
        //ret = (window.opener || window.history.length === 1);
        // window.opener is undefined when refresh the popup window by pressing F5
        //ret = location.pathname.toLowerCase().includes("popup");
        return ret;
    }
    static get isAdminMode() {
        let hrefLower = location.href.toLowerCase();
        let ret = hrefLower.includes("mode=admin") && !hrefLower.includes("mode=adminz");
        return ret;
    }
    static get publicFacingUrlRoot() { return this._publicFacingUrlRoot; }
    static getPublicFacingPageUrl(suffix) {
        let url = this._publicFacingUrlRoot;
        //AssertX.isTruthy(url, "publicFacingUrlRoot is null");
        url += suffix;
        return url;
    }
}
ConfigX.apiVersion = uninitString;
ConfigX.appName = "uninit";
ConfigX.isLocalhost = false;
ConfigX.isLocalDev = false;
ConfigX.isLocalTesting = false;
ConfigX.portStart = 0;
ConfigX.isExternalProdUrl = false;
ConfigX.isDebug = false;
ConfigX.isLocalDebug = false;
ConfigX.isRunningInBrowser = false;
ConfigX.appRunId = "appRunId" + new Date().getTime(); //number of milliseconds since midnight Jan 1 1970
//=========================================================================
ConfigX._DataApiUrlRoot = uninitString;
//=========================================================================
ConfigX.DataApiVersion = "?";
ConfigX.DataApiUrlBase = "uninit";
//=========================================================================
ConfigX._dbEnv = "";
//=========================================================================
ConfigX.isAdminApp = true;
//=========================================================================
ConfigX._publicFacingUrlRoot = "";
//=========================================================================
(() => {
    console.log("static of ConfigX");
    ConfigX.initialize();
    windowBag.ConfigX = ConfigX;
})();
