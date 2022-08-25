//=========================================================================
function create(tagName, parentElt, className, children) {
    let el = document.createElement(tagName);
    if (className) {
        el.className = className;
    }
    if (parentElt) {
        parentElt.appendChild(el);
    }
    //-----------
    if (typeof children === "undefined" || children === null) {
        //nothing
    }
    else if (typeof children === "string") {
        el.textContent = children;
    }
    else if (typeof children === "number") {
        el.textContent = children.toString();
    }
    else if (typeof children === "boolean") {
        el.textContent = children.toString();
    }
    else if (children instanceof Date) {
        el.textContent = children.toISOString();
    }
    // else if (children instanceof Node) {
    //     if (children.parentNode) {
    //         throw new Error("child node must not have parentNode");
    //     }
    //     el.appendChild(children);
    // }
    else {
        throw Error("unknown type: " + typeof children);
    }
    return el;
}
//=========================================================================
export class CreateEl {
    //=========================================================================
    createElt_eg2(className, parentElt, tagName = "div") {
        let elt = document.createElement(tagName);
        elt.className = className;
        parentElt.appendChild(elt);
        return elt;
    }
    //=========================================================================
    static a(href, children) { return this.a_pc(null, null, href, children); }
    static a_p(parentElt, href, children) { return this.a_pc(parentElt, null, href, children); }
    static a_c(className, href, children) { return this.a_pc(null, className, href, children); }
    static a_pc(parentElt, className, href, children) {
        let el = create("a", parentElt, className, children);
        if (href)
            el.href = href;
        return el;
    }
    //=========================================================================
    static script_p(parentElt, src) {
        let el = create("script", parentElt, null);
        if (src)
            el.src = src;
        return el;
    }
    //=========================================================================
    static td_t(children) { return this.td_pc(null, null, children); }
    static td_p(parentElt, children) { return this.td_pc(parentElt, null, children); }
    static td_c(className, children) { return this.td_pc(null, className, children); }
    static td_pc(parentElt, className, children) {
        let el = create("td", parentElt, className, children);
        let x = document.createElement("td");
        return el;
    }
    //=========================================================================
    static div_t(children) { return this.div_pc(null, null, children); }
    static div_p(parentElt, children) { return this.div_pc(parentElt, null, children); }
    static div_c(className, children) { return this.div_pc(null, className, children); }
    static div_pc(parentElt, className, children) {
        let el = create("div", parentElt, className, children);
        return el;
    }
    //=========================================================================
    static span_t(children) { return this.span_pc(null, null, children); }
    static span_html(children) {
        let ret = this.span_pc(null, null, children);
        ret.innerHTML = children;
        return ret;
    }
    static span_p(parentElt, children) { return this.span_pc(parentElt, null, children); }
    static span_c(className, children) { return this.span_pc(null, className, children); }
    static span_pc(parentElt, className, children) {
        let el = create("span", parentElt, className, children);
        return el;
    }
    //=========================================================================
    //static ol(children?: ChildrenType) { return this.ol_pc(null, null, children); }
    static ol_p(parentElt, children) { return this.ol_pc(parentElt, null, children); }
    static ol_c(className, children) { return this.ol_pc(null, className, children); }
    static ol_pc(parentElt, className, children) {
        let el = create("ol", parentElt, className, children);
        return el;
    }
    //=========================================================================
    static select_p(parentElt, children) { return this.select_pc(parentElt, null, children); }
    static select_c(className, children) { return this.select_pc(null, className, children); }
    static select_pc(parentElt, className, children) {
        let el = create("select", parentElt, className, children);
        return el;
    }
    //=========================================================================
    static option_p(parentElt, children) { return this.option_pc(parentElt, null, children); }
    static option_c(className, children) { return this.option_pc(null, className, children); }
    static option_pc(parentElt, className, children) {
        let el = create("option", parentElt, className, children);
        return el;
    }
    //=========================================================================
    //static ul(children?: ChildrenType) { return this.ul_pc(null, null, children); }
    static ul_p(parentElt, children) { return this.ul_pc(parentElt, null, children); }
    static ul_c(className, children) { return this.ul_pc(null, className, children); }
    static ul_pc(parentElt, className, children) {
        let el = create("ul", parentElt, className, children);
        return el;
    }
    //=========================================================================
    static li_t(children) { return this.li_pc(null, null, children); }
    static li_p(parentElt, children) { return this.li_pc(parentElt, null, children); }
    static li_c(className, children) { return this.li_pc(null, className, children); }
    static li_pc(parentElt, className, children) {
        let el = create("li", parentElt, className, children);
        return el;
    }
    //=========================================================================
    //static hr(children?: ChildrenType) { return this.hr_pc(null, null, children); }
    static hr_p(parentElt, children) { return this.hr_pc(parentElt, null, children); }
    static hr_c(className, children) { return this.hr_pc(null, className, children); }
    static hr_pc(parentElt, className, children) {
        let el = create("hr", parentElt, className, children);
        return el;
    }
    //=========================================================================
    static Test1() {
        let p = CreateEl.div_t("div1");
        //CreateEl.span();
        CreateEl.span_t("asdfasdf");
        //CreateEl.a();
        // CreateElp.span(p);
        // CreateEl.span("asdfasdf");
        // CreateElc.a("class1");
        // CreateElpc.div(p, "class1");
    }
}
