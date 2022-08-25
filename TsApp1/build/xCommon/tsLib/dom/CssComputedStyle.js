export class CssComputedStyle {
    static getComputedBackgroundColorOfAncestor(elt) {
        let ret = "";
        while (elt.parentElement) {
            let st = getComputedStyle(elt.parentElement);
            if (st.backgroundColor && st.backgroundColor !== "rgba(0, 0, 0, 0)") {
                console.log("backgroundColor found: " + st.backgroundColor);
                ret = st.backgroundColor;
                break;
            }
            else {
                console.log("backgroundColor not found in parent: " + elt.tagName);
                elt = elt.parentElement;
            }
        }
        return ret;
    }
}
