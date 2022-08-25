import { ConfigX } from "./ConfigX.js";
import { DOMStringMapX } from "./DOMStringMapX.js";

export class MobileHelpers {
    static processTags() {

        if (!ConfigX.isMediaScreenMobile) {
            //return;
        }
        let elts = qsMany("[data-mobile-move-content-to]");
        elts.forEach(desktopParent => {
            let ds = new DOMStringMapX(desktopParent);
            let mobileEltSelector = ds.get("mobileMoveContentTo");
            let mobileParent = qs(mobileEltSelector);
            mobileParent.innerHTML = "";
            let child1 = desktopParent.firstElementChild;
            if (!child1) {
                throw "errr";
            }

            let rec: MobileDesktopParents = {
                childEl: child1,
                desktopParent: desktopParent,
                mobileParent: mobileParent,
            };
            this.list.push(rec);

            if (child1) {
                //mobileParent.innerHTML = desktopParent.innerHTML;
            }
        });
        this.processTags2();
        let resizeCount = 0;
        window.addEventListener("resize", (ev: Event) => {
            console.log("resize: " + (++resizeCount));
            this.processTags2();
        });
    }
    static list: MobileDesktopParents[] = [];
    //=========================================================================
    static processTags2() {
        let isMobile = ConfigX.isMediaScreenMobile;
        this.list.forEach(rec => {
            let childEl = rec.childEl;
            let mobileParent = rec.mobileParent;
            let desktopParent = rec.desktopParent;
            if (isMobile) {
                if (childEl.parentElement !== mobileParent) {
                    mobileParent.appendChild(childEl);
                }
            }
            else {
                if (childEl.parentElement !== desktopParent) {
                    desktopParent.appendChild(childEl);
                }
            }
        });
    }

}
interface MobileDesktopParents {
    childEl: Element;
    mobileParent: Element;
    desktopParent: Element;
}
export class MobileDesktopSwitch {
    static addElement(el: HTMLElement, mobileParent: HTMLElement, desktopParent: HTMLElement) {

    }
}