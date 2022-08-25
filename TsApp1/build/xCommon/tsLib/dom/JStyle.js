export class JStyle {
    constructor(el) {
        this.el = el;
        this.st = el.style;
    }
    //=========================================================================
    //base
    innerHTML(innerHtml) {
        this.el.innerHTML = innerHtml;
        return this;
    }
    innerText(innerText) {
        this.el.innerText = innerText;
        return this;
    }
    //=========================================================================
    fixColor(color) {
        return color;
    }
    fixVal(val) {
        return val;
    }
    css(name, val) {
        this.st.setProperty(name, val);
        return this;
    }
    //=========================================================================
    color(val) { this.st.color = this.fixColor(val); return this; }
    backgoundColor(val) { this.st.backgroundColor = this.fixColor(val); return this; }
    display(val) { this.st.display = this.fixVal(val); return this; }
    fontSize(val) { this.st.fontSize = this.fixVal(val); return this; }
    width(val) { this.st.width = this.fixVal(val); return this; }
    zIndex(val) { this.st.zIndex = this.fixVal(val); return this; }
}
