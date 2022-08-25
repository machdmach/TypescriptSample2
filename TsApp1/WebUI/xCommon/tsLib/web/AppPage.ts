import { DataApiClient } from "../dom/DataApiClient.js";
import { DateTimeX } from "../core/DateTimeX.js";
import { MessageBox } from "../dom/MessageBox.js";
import { ConfigX } from "../dom/ConfigX.js";
import { AppLib } from "./AppLib.js";

export class AppPage {
    static refreshBrowserOnServerRequest(apiClient: DataApiClient) {
        let resData = apiClient.dispatcher.resData;
        if (!resData) {
            throw Error("resData null");
        }
        //-------
        if (ConfigX.apiVersion === uninitString) {
            ConfigX.apiVersion = resData.apiVersion;
            console.log("first time, does nothing, now apiVersion: " + ConfigX.apiVersion);
        }
        else if (ConfigX.apiVersion !== resData.apiVersion) {
            location.reload();
            console.log("***Refreshing browser b/c change apiVersion: " + ConfigX.apiVersion);
        }
        else {
            if (Config.isLocalDebug) console.log("Not Refreshing browser b/c not change");
        }
    }

    //=========================================================================
    static fixHyperLinks(containerEltOrSelector?: string) {
        if (typeof (containerEltOrSelector) === "undefined") {
            containerEltOrSelector = "body>header";
        }
        let containerElt = qs(containerEltOrSelector);
        let links = qsAll("a", containerElt);
        links.forEach(e => {
            let link = e as HTMLAnchorElement;
            if (link.dataset.href) {
                link.href = link.dataset.href.replace("{apiRootUrl}", ConfigX.DataApiUrlRoot);
            }
        });
    }

    //=========================================================================
    static setupUnimplemented_onClicked() {
        if (!Config.isDebug) {
            qsAll(".unimplemented").forEach(e => {
                e.addEventListener("click", (ev: MouseEvent) => {
                    MessageBox.showInfo("This feature is currently unvailable, please check back later.");
                    ev.stopPropagation();
                    ev.stopImmediatePropagation();
                    ev.preventDefault();
                    return false;
                });
            });
        }
    }

    //=========================================================================
    static setPageContent(content: Element | string) {
        let contentDiv = qs(".contentDiv");
        if (content instanceof Node) {
            contentDiv.innerHTML = "";
            contentDiv.appendChild(content);
        }
        else {
            contentDiv.innerHTML = content + "";
        }
    }
    //=========================================================================
    static prependToPageContent(eltOrStr: Element | string) {
        let contentDiv = qs(".contentDiv");
        let el: Element;
        if (eltOrStr instanceof Node) {
            el = eltOrStr;
        }
        else {
            el = document.createElement("div");
            el.innerHTML = eltOrStr;
        }
        contentDiv.prepend(el);
        return el;
    }

    //=========================================================================
    static setupIframeToggleButton(topWindowHref: string) {
        let link = document.createElement("a");
        link.textContent = "Top";
        let wrapper = document.createElement("span");
        wrapper.className = "topParentLink";
        wrapper.appendChild(link);

        if (ConfigX.isWindowBeingIframed) {
            console.log("already being iframed");

            link.href = location.href;
            link.textContent = "Stand Alone";
            link.title = "Open this iframe in top window";
            link.addEventListener("click", (ev: UIEvent) => {
                top!.location.href = location.href;
                ev.preventDefault();
            });
            document.body.appendChild(wrapper);

        }
        else {
            topWindowHref += location.search;
            link.href = topWindowHref;
            link.textContent = "Iframe in";
            link.title = "iframe this in parent page";
            document.body.appendChild(wrapper);
        }
    }
    //=========================================================================
    static setPageFooterOnBottom() {
        let setH = () => {
            //qs('').offsetHeight exclude the margin
            let h = window.innerHeight - qs('body>header').clientHeight - qs('body>footer').clientHeight;
            //h -= extraHeightPixel;
            //h -= 2;

            let mainDiv = qsNullable('main');
            if (mainDiv === null) {
                mainDiv = qs('#main');
            }
            mainDiv.style.minHeight = h + 'px';
            //console.log('main elt height set to: ' + h);
        };

        window.addEventListener("resize", function (ev: UIEvent) {
            setH();
        });

        window.addEventListener("load", function (ev: any) {
            setH();
        });
        setH();
        setTimeout(() => { setH(); }, 1);
        setTimeout(() => { setH(); }, 1000);
    }

    //=========================================================================
    static populateBasicInfo() {
        qs('#lbBottomMiddle').innerHTML = "&copy;" + new Date().getFullYear() + " CCDOA";
        if (ConfigX.isAdminApp) {
            qs('#lbBottomLeft').textContent = `${AppLib.username} (${AppLib.userRoles})`;
        }
        qs('#appEnv').textContent = `(${AppLib.dbEnv})`;
    }

    //=========================================================================
    static SetDocumentTitle(docTitle: string) {
        let env: string;

        if (ConfigX.isDbDev) {
            env = "Dev-";
        }
        else if (ConfigX.isDbQA) {
            env = "QA-";
        }
        else {
            env = ""; //Prod
        }
        if (ConfigX.isLocalhost) {
            env = "Local " + env;
        }

        docTitle = `${env}${docTitle}`;
        document.title = docTitle;
    }
}
