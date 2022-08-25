export class MOutput {
    static mainEl: HTMLElement;
    static {
        this.mainEl = qs("main");
    }
    static pre(textOrEl: string | HTMLElement) {
        return this.el("pre", textOrEl);
    }

    static el(tagName: string, textOrEl: string | HTMLElement) {
        let text: string;
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
    static ahref(url: string, htmlOrEl?: string | HTMLElement) {
        if (!htmlOrEl) {
            htmlOrEl = url;
        }
        let ret = this.html("a", htmlOrEl);
        ret.setAttribute("href", url);
        this.html("br");
        this.html("br");
        return ret;
    }

    static div(htmlOrEl: string | HTMLElement) {
        return this.html("div", htmlOrEl);
    }
    static html(tagName: string, htmlOrEl?: string | HTMLElement) {
        let text: string = "";
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
    static appendChild(el: HTMLElement) {
        this.mainEl.appendChild(el);
    }
    static tests() {
        this.pre("a string");
        let divEl = document.createElement("div");
        this.pre(divEl);
    }
}
