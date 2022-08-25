import { StringBuilder } from "../core/StringBuilder.js";

export class DocumentX {

    static onwerDoc(elt: Element) {
        let ownerBody = elt.ownerDocument?.documentElement; //.body;
        let win2 = elt.ownerDocument?.defaultView;
    }
    static parseHTML = function (htmlStr: string) {
        let tempDoc = document.implementation.createHTMLDocument();
        tempDoc.body.innerHTML = htmlStr;
        return tempDoc.body.children;
    };

    //=========================================================================
    createElt_eg_inline() {
        let createEl = (className: string, parentElt: Element, tagName = "div") => {
            let elt = document.createElement(tagName); //#createElement
            if (className) { elt.className = className; }
            parentElt.appendChild(elt);
            return elt;
        };
    }

    //=========================================================================
    createElt_eg1(className: string, parentElt: Element, tagName = "div") {
        let elt = document.createElement(tagName); //#createElement
        elt.className = className;
        parentElt.appendChild(elt);
        return elt;
    }
    //=========================================================================
    createElt_eg2(tagName: string, className: string, parentElt?: Element) {
        let elt = document.createElement(tagName); //#createElement
        elt.className = className;
        if (parentElt) {
            parentElt.appendChild(elt);
        }
        return elt;
    }

    static toStr(elt: Element, isDebug: boolean = false): string {
        let buf: StringBuilder = new StringBuilder();

        let rval = buf.toString();
        if (isDebug) {
            console.log('FormData.toStr', elt, rval);
        }
        return rval;
    }

    //=========================================================================
    static childCreatedCount: number = 0; //DocumentX.childCreatedCount = 0; //at the end
    static createChildDivz(innerHTML: string, appendchild: boolean = false): HTMLElement {
        let elt = document.createElement("div");
        elt.id = "div" + (this.childCreatedCount++) + "_" + new Date().getTime(); // Math.random()
        elt.innerHTML = innerHTML;
        if (appendchild) {
            document.body.appendChild(elt);
        }
        return elt;
    }

    //=========================================================================
    static setFooterOnBottom() {
        let tempFn = () => {
            //qs('').offsetHeight exclude the margin
            let h = window.innerHeight - qs('body>header').clientHeight - qs('body>footer').clientHeight - 3;
            //h -= 20;

            qs('main').style.minHeight = h + 'px';
            //console.log('main elt height set to: ' + h);
        };
        tempFn();
        window.addEventListener("resize", function (ev: UIEvent) {
            tempFn();
        });
    }
    //=========================================================================
    static createSpanElementWithDownAngleIconOnLeft(textContent: string) {
        let elt = document.createElement("span");
        let iconElt = document.createElement("i");
        iconElt.className = "fas fa-angle-down";
        elt.appendChild(iconElt);
        let textNode = document.createTextNode(" " + textContent);
        elt.appendChild(textNode);
        return elt;
    }
    //=========================================================================
    static createSpanElementWithRightAngleIconOnLeft(textContent: string) {
        let elt = document.createElement("span");
        let iconElt = document.createElement("i");
        iconElt.className = "fas fa-angle-right";
        elt.appendChild(iconElt);
        let textNode = document.createTextNode(" " + textContent);
        elt.appendChild(textNode);
        return elt;
    }

    //=========================================================================
    static errorElt: HTMLElement;
    static showError(mesg: string) {

        let e = this.errorElt;
        if (!e) {
            e = document.createElement("p") as HTMLElement;
            let st = e.style;
            st.padding = "10px";

            st.position = "fixed";
            st.backgroundColor = "lightyellow";
            st.color = "red";
            st.fontSize = "16pt";
            st.top = "5px";
            st.left = "5px";
            st.zIndex = "1123123";
            document.body.appendChild(e);
            this.errorElt = e;
        }

        let m = "";
        m += "<h2> Error: </h3>";
        m += "Updated: " + new Date().toLocaleString() + "<hr>";
        m += mesg;
        e.innerHTML = m;
    }

    //=========================================================================
    static createDummyDivs(count: number, parentSelectorOrElt: string | HTMLElement) {
        let parentElt = qs(parentSelectorOrElt);

        let divWrapper = document.createElement("section");
        divWrapper.className = "dummyDiv";
        parentElt.appendChild(divWrapper);

        for (let i = 0; i < count; i++) {
            let div = document.createElement("div");
            div.textContent = "div " + i;
            divWrapper.appendChild(div);
        }
    }
}
