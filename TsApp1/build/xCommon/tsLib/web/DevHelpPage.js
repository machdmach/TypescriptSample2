import { ConfigX } from "../dom/ConfigX.js";
import { DetailsSummaryX } from "../dom/DetailsSummary.js";
import { MessageBox } from "../dom/MessageBox.js";
import { ResourseFetcher } from "../dom/ResourceFetcher.js";
import { AppLib } from "./AppLib.js";
import { DevLib } from "./DevLib.js";
//=========================================================================
export class DevHelpPage {
    static async init() {
        if (alreadyExecuted("DevHelpPage.init"))
            return;
        if (!this.isInitDevPage) {
            return;
        }
        let html = "uninit";
        try {
            html = await ResourseFetcher.fetchText("DevHelpPage.htm");
        }
        catch (ex) {
            console.warn(ex + "Not found", ex);
            return;
        }
        let helpDiv = document.createElement("div");
        helpDiv.innerHTML = html;
        this.helpDiv = helpDiv;
        this.setupSidebarDevLinks();
        let elt = qs("#devUrls", helpDiv);
        let s = elt.textContent + "";
        let urls = s.split(/\s/);
        let f = document.createDocumentFragment();
        let ol = document.createElement("ol");
        urls.forEach(url => {
            url = url.trim();
            if (url) {
                let link = document.createElement("a");
                link.textContent = url;
                link.href = url;
                link.target = "win2";
                let li = document.createElement("li");
                li.appendChild(link);
                ol.appendChild(li);
            }
        });
        elt.innerHTML = "";
        elt.appendChild(ol);
    }
    //=========================================================================
    static async showHelpPageDialog() {
        let mb = await MessageBox.showInfo(this.helpDiv);
    }
    //=========================================================================
    static setupSidebarDevLinks() {
        let currHref = location.href;
        let currHrefLower = location.href.toLowerCase();
        let ul = document.createElement("ul");
        let addLink = function (href, textContent, className) {
            let link = document.createElement("a");
            if (href) {
                link.href = href;
            }
            else {
                link.href = "unset";
            }
            link.textContent = textContent;
            if (className) {
                link.className = className;
            }
            let li = document.createElement("li");
            li.appendChild(link);
            ul.appendChild(li);
            return link;
        };
        addLink("#", "");
        addLink("?zz-test", "unit test");
        addLink("?z", "zzRunAllTests1", "RunAllTests");
        addLink("?zz-db=1", "debug on");
        addLink("?zz-db=0", "debug off");
        addLink("?zz-dialogs", "test dialogs");
        addLink("?zz-libtest", "test lib");
        let appNameLower = ConfigX.appName.toLowerCase() + "- ";
        let localIISUrl = "http://localhost:2040/PubAppz/WebUI" + location.pathname + location.search;
        addLink(localIISUrl, appNameLower + "LocalIIS");
        addLink(this.remoteDevURL, appNameLower + "RemoteDev");
        addLink(this.QAURL, appNameLower + "QA");
        addLink(this.ProductionURL, appNameLower + "Production");
        let zzhelp = addLink("", "zzhelp DevHelpPage.htm");
        zzhelp.addEventListener("click", async (ev) => {
            ev.stopPropagation();
            ev.stopImmediatePropagation();
            ev.preventDefault();
            this.showHelpPageDialog();
        });
        let zzShowDebug = addLink("?zzShowDebug", "zzShowDebug");
        zzShowDebug.addEventListener("click", async (ev) => {
            // ev.stopPropagation();
            // ev.stopImmediatePropagation();
            ev.preventDefault();
            DevLib.showServerDebugInfo();
        });
        if (currHrefLower.includes('zzshowdebug')) {
            DevLib.showServerDebugInfo();
        }
        let dxLink = addLink(AppLib.getDataApiUrl("Dx"), "Dx (new window)");
        dxLink.target = "dx";
        addLink("/cs/WebUI/app/shared/links.html", "links");
        addLink("/cs/WebUI/EmpRating/csat.html?ap=HND&eno=68666&ename=First%20Last", "app- EmployeeRating");
        addLink("/cs/WebUI/CMS/CMS.html", "app- CMS");
        addLink("/cs/WebUI/FsWeb/FsWeb.html", "app- FsWeb");
        addLink("#", "");
        addLink("/cs/WebUI/REAMS/reams.html", "app- REAMS");
        addLink("/cs/WebUI/GARS/HND.html", "app- GARS");
        addLink("/cs/WebUI/RFP/RfpAdmin.html?page=Purchasing", "app- RFP");
        addLink("/cs/WebUI/LASAdmin/Lasa.html?page=LocusLabsData", "app- Lasa/Maps");
        addLink("/cs/WebUI/ImageGallery/LAS.html", "app- ImageGallery-LAS");
        addLink("/cs/WebUI/ImageGallery/VGT.html?year=2018&zzuse", "app- ImageGallery-VGT");
        addLink("/cs/WebUI/GaFids/VGT.html", "app- GaFids");
        addLink("/cs/WebUI/PubSites/Maps/maps.html", "Maps");
        let el = qs("#sidebarDevLinks", this.helpDiv);
        el.innerHTML = el.innerHTML.replace(/\{apiRootUrl\}/g, ConfigX.DataApiUrlRoot);
        let links = qsMany("a", 1, 1000, el);
        links.forEach(e => {
            let link = e;
            link.setAttribute("rel", "nofollow noopener noreferrer");
            let tc = link.textContent + "";
            tc = tc.trim();
            if (tc === "") {
                link.textContent = link.href;
            }
            let li = document.createElement("li");
            li.appendChild(link);
            ul.prepend(li);
        });
        let detailsElt = document.createElement("details");
        let summaryElt = document.createElement("summary");
        summaryElt.textContent = "DevLinks";
        detailsElt.appendChild(summaryElt); //insert <details><summary>...
        detailsElt.appendChild(ul);
        DetailsSummaryX.setupOpenCloseState_HLS(detailsElt, "devLinks");
        let floatingElt = detailsElt;
        floatingElt.className = "sideBarDevLinks";
        if (qsNullable("." + floatingElt.className) !== null) {
            MessageBox.showSystemError("." + floatingElt.className + " elt already existed");
        }
        document.body.appendChild(floatingElt);
    }
}
DevHelpPage.isInitDevPage = false;
