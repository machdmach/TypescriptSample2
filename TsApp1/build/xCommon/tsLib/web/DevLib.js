import { DevDisplayCount } from './DisplayCount.js';
import { CSSStyleDeclarationX } from '../dom/CSSStyleDeclarationX.js';
import { DevHelpPage } from './DevHelpPage.js';
import { MessageBox } from '../dom/MessageBox.js';
import { ConfigX } from '../dom/ConfigX.js';
export class DevLib {
    static async RunDevTasks() {
        if (alreadyExecuted("RunDevTasks"))
            return;
        if (!Config.isLocalDebug) {
            return;
        }
        new DevDisplayCount().run();
        await DevHelpPage.init();
    }
    //=========================================================================
    static setStatusTopRight(status) {
        let e = this.setStatus(status);
        if (e) {
            let st = e.style;
            st.top = "30px";
            st.right = "3px";
            st.bottom = "";
            st.left = "";
        }
    }
    //=========================================================================
    static setStatus(status) {
        let ret = null;
        if (False) {
            console.log(status);
            let dispEltID = "obFieldz";
            let dispElt = qsNullable("#" + dispEltID);
            if (dispElt === null) {
                dispElt = document.createElement("div");
                dispElt.id = dispEltID;
                let st = dispElt.style;
                st.position = "fixed";
                st.zIndex = "99123";
                st.backgroundColor = "lightyellow";
                st.color = "black";
                st.bottom = "25px";
                document.body.insertBefore(dispElt, document.body.firstElementChild);
            }
            dispElt.textContent = status;
            ret = dispElt;
        }
        return ret;
    }
    //=========================================================================
    static getSampleSize() {
        let params = new URLSearchParams(location.search.toLowerCase());
        let val = params.get("zzsample");
        let ret = -1;
        if (val) {
            ret = parseInt(val, 10);
        }
        return ret;
    }
    //=========================================================================
    static isZzThrow() {
        let params = new URLSearchParams(location.search.toLowerCase());
        let val = params.get("zzthrow");
        let ret = (val !== null);
        return ret;
    }
    //=========================================================================
    static processEnvTags() {
        let zztest = qsNullable("#zztestUrl");
        if (zztest) {
            zztest.href = location.href + "&zztest";
        }
        if ("" && ConfigX.isLocalDev) {
            let mainCssElt = qs("#mainCss", document.head);
            let st = CSSStyleDeclarationX.getStyleDeclaration(".localDevOnly", mainCssElt);
            st.removeProperty("display");
        }
    }
    //=========================================================================
    static setupLinks(urls, placeHolderSelector) {
        let ret = document.createDocumentFragment();
        let listElt = document.createElement("ol");
        urls.forEach(url => {
            let link = document.createElement("a");
            link.target = "linkWin";
            link.href = url;
            link.textContent = url;
            let li = document.createElement("li");
            li.style.marginTop = "1vh";
            li.appendChild(link);
            listElt.appendChild(li);
        });
        ret.appendChild(listElt);
        if (placeHolderSelector) {
            qs(placeHolderSelector).appendChild(ret);
        }
        return ret;
    }
    static setServerDebugInfo(content) {
        this.serverDebugInfo = content + "";
    }
    static showServerDebugInfo() {
        let mb = MessageBox.newDialog(this.serverDebugInfo, "Debug Info", 'lightblue');
        mb.showModal();
        let st = mb.dialogElt.style;
    }
}
//=========================================================================
DevLib.serverDebugInfo = "?";
