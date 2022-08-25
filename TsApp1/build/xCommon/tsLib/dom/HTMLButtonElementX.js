export class HTMLButtonElementX {
    static addRippleEffect(eltOrSelector) {
        let btn = qs(eltOrSelector);
        if (!(btn instanceof HTMLButtonElement)) {
            throw Error("btn is not of type HTMLButtonElement: " + getTagNameIDClass(eltOrSelector));
        }
        btn.addEventListener("click", (ev) => {
            let st = btn.style;
            st.opacity = "0.5";
            setTimeout(() => {
                st.opacity = ""; //unset
            }, 300);
        });
    }
}
