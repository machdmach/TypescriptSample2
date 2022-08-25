export class JStyle {
    el: HTMLElement;
    st: CSSStyleDeclaration;
    constructor(el: HTMLElement) {
        this.el = el;
        this.st = el.style;
    }

    //=========================================================================
    //base
    innerHTML(innerHtml: string) {
        this.el.innerHTML = innerHtml;
        return this;
    }
    innerText(innerText: string) {
        this.el.innerText = innerText;
        return this;
    }
    //=========================================================================

    fixColor(color: string) {
        return color;
    }
    fixVal(val: string) {
        return val;
    }
    css(name: string, val: string) {
        this.st.setProperty(name, val); return this
    }

    //=========================================================================
    color(val: string) { this.st.color = this.fixColor(val); return this }
    backgoundColor(val: string) { this.st.backgroundColor = this.fixColor(val); return this }

    display(val: string) { this.st.display = this.fixVal(val); return this }
    fontSize(val: string) { this.st.fontSize = this.fixVal(val); return this }
    width(val: string) { this.st.width = this.fixVal(val); return this }
    zIndex(val: string) { this.st.zIndex = this.fixVal(val); return this }
    //(val: string) { this.st = this.fixVal(val); return this }
}
