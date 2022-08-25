import { CssComputedStyle } from "../dom/CssComputedStyle.js";

export class Popover2 {
    refElt: HTMLElement;
    targetElt: HTMLElement;

    constructor(refEltOrSelector: string | HTMLElement, targetEltOrSelector: string | HTMLElement, placement = "z") {
        let refElt = qs(refEltOrSelector);
        let targetElt = qs(targetEltOrSelector);
        this.refElt = refElt;
        this.targetElt = targetElt;
        if (placement.startsWith("z")) {
            placement = "bottom-start";
        }
        //#todo
        // let pl = placement as Popper.Placement;
        // let options: PopperOptions = {
        //     placement: pl,
        //     removeOnDestroy: false,
        //     positionFixed: true,
        // };
        // let p = new Popper(refElt, targetElt, options);

        let y = refElt.offsetTop + refElt.offsetHeight;

        let st = targetElt.style;
        st.position = "fixed";
        st.top = "0px";
        st.left = "0px";
        st.willChange = "transform";
        st.transform = `translate3d(5px, ${y}px, 0px)`;

        // z-index: 1;
        // height: 94px;
        // position: fixed;
        // font-size: 14pt;
        // background-color: rgb(54, 76, 127);
        // color: rgb(0, 0, 0);
        // transform: translate3d(5px, 40px, 0px);
        // top: 0px;
        // left: 0px;
        // will-change: transform;
    }
    //=========================================================================
    copyStyleToPopperElt(srcElt: HTMLElement) {

        let srcStyle = getComputedStyle(srcElt);

        let targetElt = this.targetElt;
        let targetStyle = targetElt.style;

        targetStyle.fontSize = srcStyle.fontSize;
        targetStyle.backgroundColor = CssComputedStyle.getComputedBackgroundColorOfAncestor(srcElt); //Style.backgroundColor;
        //st.backgroundColor = "black";

        //st.backgroundColor = "green";
        targetStyle.color = srcStyle.color;

        //st.backgroundColor = "green";

        // qsMany("a", 1, 10, popper).forEach(e => {
        //     e.style.color = "white";
        //     e.style.textDecorationLine = "none";
        // });
        //st.backgroundColor = "light"
        //if ("xx") return;
        return targetStyle;
    }
    //=========================================================================
    show() {
        //this.popperCtl.destroy();
    }
}
