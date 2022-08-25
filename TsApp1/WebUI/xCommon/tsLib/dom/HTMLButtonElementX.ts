
export class HTMLButtonElementX {
    static addRippleEffect(eltOrSelector: HTMLButtonElement | string) {
        let btn = qs(eltOrSelector) as HTMLButtonElement;

        if (!(btn instanceof HTMLButtonElement)) {
            throw Error("btn is not of type HTMLButtonElement: " + getTagNameIDClass(eltOrSelector));
        }

        btn.addEventListener("click", (ev: MouseEvent) => {
            let st = btn.style;
            st.opacity = "0.5";
            setTimeout(() => {
                st.opacity = ""; //unset
            }, 300);
        });
    }
}
