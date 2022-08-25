import { ToggleHeight } from "../dom/ToggleHeight.js";
import { ResourseFetcher } from "../dom/ResourceFetcher.js";
import { MobileHelpers } from "../dom/MobileHelpers.js";
import { LocationUrl, MessageBox } from "../tsLibPkg.js";
export class AppMenu {
    static setupHamburgerMenuButton() {
        MobileHelpers.processTags();
        let togglerElt = qsNullable(".menu-wrap .toggler");
        if (togglerElt === null) {
            return;
        }
        let popupMenuDiv = qs("#mainPopupMenu");
        let popupMenuToggle = new ToggleHeight(popupMenuDiv);
        popupMenuToggle.hide();
        let btn = togglerElt;
        btn.addEventListener("click", ev => {
            let cb = ev.target;
            popupMenuToggle.toggle(cb.checked);
        });
        document.addEventListener('keyup', function (event) {
            if (event.defaultPrevented) {
                return;
            }
            if (btn.checked) {
                let key = event.key; // || event.ke.keyCode;
                if (key === 'Escape' || key === 'Esc') {
                    btn.click();
                }
            }
        });
        document.addEventListener('click', function (ev) {
            if (ev.defaultPrevented) {
                return;
            }
            let targetElt = ev.target;
            if (targetElt === togglerElt) {
                return;
            }
            if (btn.checked) {
                let closePopup;
                if (targetElt === null) {
                    closePopup = false;
                }
                else if (popupMenuDiv.contains(targetElt)) {
                    closePopup = false;
                }
                else {
                    closePopup = true;
                }
                if (closePopup) {
                    btn.click();
                }
            }
        });
        if (LocationUrl.searchParams.containsKey("zz-menu-open")) {
            setTimeout(() => {
                btn.click(); //#hamburger //#mainPopupMenu,
            }, 100);
        }
    }
    //=========================================================================
    static setupUserManualLink() {
        let link = qs("#appUserManualLink");
        link.addEventListener("click", async (me) => {
            me.preventDefault();
            me.stopPropagation();
            me.stopImmediatePropagation();
            let html = await ResourseFetcher.fetchText("./userManual.htm");
            link.setAttribute("disabled", "disabled");
            await MessageBox.showInfo(html, "REAMS Help");
            link.removeAttribute("disabled");
            return false;
        });
        if (location.href.includes("userManual")) {
            setTimeout(() => {
                link.click();
            }, 1);
        }
    }
    //=========================================================================
    static hilightSelectedMenuItem(selectorOrElt = "header") {
        let menuContainerElt = qs(selectorOrElt);
        let links = qsMany("a", 0, 100, menuContainerElt);
        let url = location.href.toLowerCase();
        let selectedElt = null;
        for (let a of links) {
            if (a instanceof HTMLAnchorElement) {
                let href = a.href;
                if (href && url.includes(href.toLowerCase())) {
                    selectedElt = a;
                    break;
                }
            }
        }
        if (selectedElt) {
            selectedElt.className = "appMenuItemSelected";
        }
        return selectedElt;
    }
}
