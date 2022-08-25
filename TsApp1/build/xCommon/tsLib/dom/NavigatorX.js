/*
Browser Engines:
  WebKit: Safari,
  Gecko/Quantum: Firefox
  Bink: Chrome,  Chromium
*/
export class NavigatorX {
    static get isChromeBrowser() {
        //userAgent: "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Mobile Safari/537.36"
        let vendor = navigator.vendor + ""; //Google Inc.
        let isChome = vendor.includes("Google");
        if ("") {
            if (navigator.vendor.includes("Google")) {
                qs("#chromeBrowserOnly").remove();
            }
        }
        return isChome;
    }
    //=========================================================================
    static get isFirefoxBrowser() {
        //https://dxr.mozilla.org/mozilla-central/source/layout/style/res/html.css #default css
        //userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:72.0) Gecko/20100101 Firefox/72.0"
        let userAgent = navigator.userAgent;
        let isFirefox = userAgent.includes(" Firefox/");
        return isFirefox;
    }
    //=========================================================================
    static get isEdgeBrowser() {
        //userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.18363"
        let userAgent = navigator.userAgent;
        let isEdge = userAgent.includes(" Edge/");
        return isEdge;
    }
    //=========================================================================
    static get isIEBrowser() {
        //userAgent: "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; rv:11.0) like Gecko"
        let userAgent = navigator.userAgent;
        let ua = window.navigator.userAgent;
        let isIE = /MSIE|Trident/.test(ua);
        return isIE;
    }
    static get isAntiquatedBrowser() {
        //return isAntiquatedBrowser;
        return this.isIEBrowser;
    }
}
