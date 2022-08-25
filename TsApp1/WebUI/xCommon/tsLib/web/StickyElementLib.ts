import { MyObservable } from "../core/MyObservable.js";

export class StickyElementLib {

    handleChangeEvent() {
    }
    static setupStickyElement(targetEltOrSelector: string, ob?: MyObservable) {
        //#sticky
        let targetHeaderRowElt = qs(targetEltOrSelector);

        let stickyClassName = targetEltOrSelector;
        if (stickyClassName.startsWith(".")) {
            stickyClassName = stickyClassName.substring(1);
        }
        else {
            throw Error("target selector must be a className that starts with a period: " + targetEltOrSelector);
        }
        stickyClassName += "-sticky";

        let referencedElt = targetHeaderRowElt.nextElementSibling;
        if (referencedElt === null) {
            throw Error(`target element must have next sibling: ` + getTagNameIDClass(targetHeaderRowElt));
        }

        let phElt = document.createElement("div"); //placeHolderElement
        phElt.textContent = "placeholder for the header row";
        phElt.style.visibility = "hidden";
        phElt.style.display = "none";
        targetHeaderRowElt.parentElement?.insertBefore(phElt, referencedElt);

        //https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver

        let eventHandler = function () {
            let topPos = referencedElt!.getBoundingClientRect().top;

            let targetHeight = targetHeaderRowElt.offsetHeight;
            if (targetHeight === 0) {
                return; //it is hidden, not rrealy working
            }
            phElt.style.height = targetHeight + "px"; // "100px";

            topPos -= targetHeight;
            console.log("topPos=" + topPos + ", stickyClassName=" + stickyClassName + ", targetHeight=" + targetHeight);
            //if (this.documentElement.scrollTop > )
            if (topPos <= 0) {
                targetHeaderRowElt.classList.add(stickyClassName);
                phElt.style.display = "block";
            }
            else {
                targetHeaderRowElt.classList.remove(stickyClassName);
                phElt.style.display = "none";
            }
            //The true at the end tells the browser to capture the event on dispatch, even if that event does not normally bubble, like change, focus, and scroll.
        };
        if (ob) {
            ob.registerObserver(eventHandler);
        }
        document.addEventListener("scroll", eventHandler, true);

    }
}
