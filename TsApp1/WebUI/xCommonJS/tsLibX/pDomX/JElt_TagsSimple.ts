import { JAttr } from "./JAttr.js";
import { JElt } from "./JElt.js";

export class JTags_Simple extends JAttr {

    //=========================================================================
    createChild(tagName: string, classOrStyle?: string) {
        let newEl = document.createElement(tagName);
        //this.el = newEl;
        //el.style = style;
        if (classOrStyle) {
            if (classOrStyle.includes(':')) {
                newEl.setAttribute('style', classOrStyle);
            }
            else {
                newEl.className = classOrStyle;
            }
        }
        if (this.el != null) {
            this.el.appendChild(newEl);
        }
        return new JElt(newEl);
    }

    createArticle(classOrStyle?: string) { return this.createChild("article", classOrStyle) }
    createH1(classOrStyle?: string) { return this.createChild("h1", classOrStyle) }
    createH2(classOrStyle?: string) { return this.createChild("h2", classOrStyle) }
    createH3(classOrStyle?: string) { return this.createChild("h3", classOrStyle) }
    createH4(classOrStyle?: string) { return this.createChild("h4", classOrStyle) }
    createH5(classOrStyle?: string) { return this.createChild("h5", classOrStyle) }
    createH6(classOrStyle?: string) { return this.createChild("h6", classOrStyle) }

    createLabel(text: string, classOrStyle?: string) { return this.createChild("label", classOrStyle).innerHTML(text) }
    createSpan(text: string, classOrStyle?: string) { return this.createChild("span", classOrStyle).innerHTML(text) }
    createDiv(classOrStyle?: string) { return this.createChild("div", classOrStyle) }

    createSection(classOrStyle?: string) { return this.createChild("section", classOrStyle) }

    create(classOrStyle?: string) { return this.createChild("", classOrStyle) }
    //create(classOrStyle?: string) { return this.createChild("", classOrStyle)}

}
