import { JAttr } from "./JAttr.js";
import { JElt } from "./JElt.js";
export class JTags_Simple extends JAttr {
    //=========================================================================
    createChild(tagName, classOrStyle) {
        let newEl = document.createElement(tagName);
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
    createChildRepeat(tagName, repeat = 1, classOrStyle) {
        let ret;
        for (let i = 0; i < repeat; i++)
            ret = this.createChild(tagName, classOrStyle);
        return ret;
    }
    //=========================================================================
    appendChild(childElt) { this.el.appendChild(childElt.el); }
    prependChild(childElt) { this.el.prepend(childElt.el); }
    createArticle(classOrStyle) { return this.createChild("article", classOrStyle); }
    createBr(repeat = 1, classOrStyle) { return this.createChildRepeat("br", repeat, classOrStyle); }
    createButton(text, name = "method", value, classOrStyle = "btnx btnx-primary") {
        return this.createChild("button", classOrStyle).attr("type", "submit").attr("name", name).attr("value", value !== null && value !== void 0 ? value : text).innerHTML(text);
    }
    createDiv(classOrStyle) { return this.createChild("div", classOrStyle); }
    createForm(method = "post", encType = "application/x-www-form-urlencoded", classOrStyle = "formx") {
        return this.createChild("form", classOrStyle).attr("method", method).attr("enctype", encType);
    }
    createH1(classOrStyle) { return this.createChild("h1", classOrStyle); }
    createH2(classOrStyle) { return this.createChild("h2", classOrStyle); }
    createH3(classOrStyle) { return this.createChild("h3", classOrStyle); }
    createH4(classOrStyle) { return this.createChild("h4", classOrStyle); }
    createH5(classOrStyle) { return this.createChild("h5", classOrStyle); }
    createH6(classOrStyle) { return this.createChild("h6", classOrStyle); }
    createInput(name, value, classOrStyle = "ff-control") {
        return this.createChild("input", classOrStyle).attr("name", name).attr("value", value);
    }
    createInputFieldCell(name, fieldLabel, value, classOrStyle = "ff-control") {
        let cell = this.createRowCell();
        cell.createLabel(fieldLabel);
        let ret = cell.createChild("input", classOrStyle).attr("name", name).attr("value", value);
        return ret;
    }
    createCheckbox(name, fieldLabel, value, classOrStyle = "zff-control") {
        //<input type="checkbox" />
        let label = this.createLabel(fieldLabel, "cb-label");
        let cb = label.createChild("input", classOrStyle).attr("name", name).attr("value", value);
        let el = cb.el;
        el.type = "checkbox";
        //el.checked = true;
        return cb;
    }
    createCheckboxFieldCell(name, fieldLabel, value, classOrStyle = "zff-control") {
        let cell = this.createRowCell();
        let cb = cell.createCheckbox(name, fieldLabel, classOrStyle);
        return cb;
    }
    createLabel(text, classOrStyle = "ff-label") { return this.createChild("label", classOrStyle).innerHTML(text); }
    createRow(classOrStyle = "d-2") { return this.createChild("section", classOrStyle); }
    createRowCell(classOrStyle = "") { return this.createChild("div", classOrStyle); }
    createSection(classOrStyle) { return this.createChild("section", classOrStyle); }
    createSpan(text, classOrStyle) { return this.createChild("span", classOrStyle).innerHTML(text); }
    create(classOrStyle) { return this.createChild("", classOrStyle); }
}
