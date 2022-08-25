var _a;
export class MOutput {
    static pre(textOrEl) {
        return this.el("pre", textOrEl);
    }
    static el(tagName, textOrEl) {
        let text;
        if (textOrEl instanceof HTMLElement) {
            text = textOrEl.outerHTML;
        }
        else {
            text = textOrEl;
        }
        //let mainEl = qs("main");
        let newEl = document.createElement(tagName);
        newEl.innerText = text;
        this.mainEl.appendChild(newEl);
        return newEl;
    }
    static ahref(url, htmlOrEl) {
        if (!htmlOrEl) {
            htmlOrEl = url;
        }
        let ret = this.html("a", htmlOrEl);
        ret.setAttribute("href", url);
        this.html("br");
        this.html("br");
        return ret;
    }
    static div(htmlOrEl) {
        return this.html("div", htmlOrEl);
    }
    static html(tagName, htmlOrEl) {
        let text = "";
        if (htmlOrEl instanceof HTMLElement) {
            text = htmlOrEl.outerHTML;
        }
        else if (htmlOrEl) {
            text = htmlOrEl;
        }
        //let mainEl = qs("main");
        let newEl = document.createElement(tagName);
        if (text) {
            newEl.innerHTML = text;
        }
        this.mainEl.appendChild(newEl);
        return newEl;
    }
    static appendChild(el) {
        this.mainEl.appendChild(el);
    }
    static tests() {
        this.pre("a string");
        let divEl = document.createElement("div");
        this.pre(divEl);
    }
}
_a = MOutput;
(() => {
    _a.mainEl = qs("main");
})();
