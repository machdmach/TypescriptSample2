declare type ChildrenType = string | number | boolean | Date;
declare type ParentType = Element | null;

//=========================================================================
function create(tagName: string, parentElt: ParentType, className: string | null, children?: ChildrenType): HTMLElement {

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
    createElt_eg2(className: string, parentElt: Element, tagName = "div") {
        let elt = document.createElement(tagName);
        elt.className = className;
        parentElt.appendChild(elt);
        return elt;
    }

    //=========================================================================
    static a(href?: string | null | undefined, children?: ChildrenType) { return this.a_pc(null, null, href, children); }
    static a_p(parentElt: ParentType, href?: string, children?: ChildrenType) { return this.a_pc(parentElt, null, href, children); }
    static a_c(className: string | null, href?: string, children?: ChildrenType) { return this.a_pc(null, className, href, children); }
    static a_pc(parentElt: ParentType, className: string | null, href?: string | null | undefined, children?: ChildrenType) {
        let el = create("a", parentElt, className, children) as HTMLAnchorElement;
        if (href) el.href = href;
        return el;
    }

    //=========================================================================
    static script_p(parentElt: ParentType, src: string | null | undefined) {
        let el = create("script", parentElt, null) as HTMLScriptElement;
        if (src) el.src = src;
        return el;
    }

    //=========================================================================
    static td_t(children?: ChildrenType) { return this.td_pc(null, null, children); }
    static td_p(parentElt: ParentType, children?: ChildrenType) { return this.td_pc(parentElt, null, children); }
    static td_c(className: string | null, children?: ChildrenType) { return this.td_pc(null, className, children); }
    static td_pc(parentElt: ParentType, className: string | null, children?: ChildrenType) {
        let el = create("td", parentElt, className, children) as HTMLTableCellElement;
        let x = document.createElement("td");
        return el;
    }
    //=========================================================================
    static div_t(children?: ChildrenType) { return this.div_pc(null, null, children); }
    static div_p(parentElt: ParentType, children?: ChildrenType) { return this.div_pc(parentElt, null, children); }
    static div_c(className: string | null, children?: ChildrenType) { return this.div_pc(null, className, children); }
    static div_pc(parentElt: ParentType, className: string | null, children?: ChildrenType) {
        let el = create("div", parentElt, className, children) as HTMLDivElement;
        return el;
    }
    //=========================================================================
    static span_t(children: any) { return this.span_pc(null, null, children); }
    static span_html(children: any) {
        let ret = this.span_pc(null, null, children);
        ret.innerHTML = children;
        return ret;
    }
    static span_p(parentElt: ParentType, children?: ChildrenType) { return this.span_pc(parentElt, null, children); }
    static span_c(className: string | null, children?: ChildrenType) { return this.span_pc(null, className, children); }
    static span_pc(parentElt: ParentType, className: string | null, children?: ChildrenType) {
        let el = create("span", parentElt, className, children) as HTMLSpanElement;
        return el;
    }
    //=========================================================================
    //static ol(children?: ChildrenType) { return this.ol_pc(null, null, children); }
    static ol_p(parentElt: ParentType, children?: ChildrenType) { return this.ol_pc(parentElt, null, children); }
    static ol_c(className: string | null, children?: ChildrenType) { return this.ol_pc(null, className, children); }
    static ol_pc(parentElt: ParentType, className: string | null, children?: ChildrenType) {
        let el = create("ol", parentElt, className, children) as HTMLOListElement;
        return el;
    }
    //=========================================================================
    static select_p(parentElt: ParentType, children?: ChildrenType) { return this.select_pc(parentElt, null, children); }
    static select_c(className: string | null, children?: ChildrenType) { return this.select_pc(null, className, children); }
    static select_pc(parentElt: ParentType, className: string | null, children?: ChildrenType) {
        let el = create("select", parentElt, className, children) as HTMLUListElement;
        return el;
    }
    //=========================================================================
    static option_p(parentElt: ParentType, children?: ChildrenType) { return this.option_pc(parentElt, null, children); }
    static option_c(className: string | null, children?: ChildrenType) { return this.option_pc(null, className, children); }
    static option_pc(parentElt: ParentType, className: string | null, children?: ChildrenType) {
        let el = create("option", parentElt, className, children) as HTMLUListElement;
        return el;
    }
    //=========================================================================
    //static ul(children?: ChildrenType) { return this.ul_pc(null, null, children); }
    static ul_p(parentElt: ParentType, children?: ChildrenType) { return this.ul_pc(parentElt, null, children); }
    static ul_c(className: string | null, children?: ChildrenType) { return this.ul_pc(null, className, children); }
    static ul_pc(parentElt: ParentType, className: string | null, children?: ChildrenType) {
        let el = create("ul", parentElt, className, children) as HTMLUListElement;
        return el;
    }
    //=========================================================================
    static li_t(children?: ChildrenType) { return this.li_pc(null, null, children); }
    static li_p(parentElt: ParentType, children?: ChildrenType) { return this.li_pc(parentElt, null, children); }
    static li_c(className: string | null, children?: ChildrenType) { return this.li_pc(null, className, children); }
    static li_pc(parentElt: ParentType, className: string | null, children?: ChildrenType) {
        let el = create("li", parentElt, className, children) as HTMLLIElement;
        return el;
    }
    //=========================================================================
    //static hr(children?: ChildrenType) { return this.hr_pc(null, null, children); }
    static hr_p(parentElt: ParentType, children?: ChildrenType) { return this.hr_pc(parentElt, null, children); }
    static hr_c(className: string | null, children?: ChildrenType) { return this.hr_pc(null, className, children); }
    static hr_pc(parentElt: ParentType, className: string | null, children?: ChildrenType) {
        let el = create("hr", parentElt, className, children) as HTMLHRElement;
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
