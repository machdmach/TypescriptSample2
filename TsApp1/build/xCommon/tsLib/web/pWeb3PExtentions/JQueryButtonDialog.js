import { ButtonPanel } from "../../dom/ButtonPanel.js";
import { JQueryDialog } from "./JQueryDialog.js";
export class JQueryButtonDialog extends JQueryDialog {
    constructor(options) {
        super(options);
        this.buttonPane = new ButtonPanel(); //this.mainElt);
    }
    //=========================================================================
    setContent(htmlTextOrElt, setFormMethodDialog = false) {
        if (typeof htmlTextOrElt === "string") {
            this.mainElt.innerHTML = htmlTextOrElt;
        }
        else {
            // if (!this.contentElt.parentElement) throw "?";
            // this.contentElt.parentElement.replaceChild(htmlTextOrElt, this.contentElt);
            this.mainElt.innerHTML = "";
            this.mainElt.appendChild(htmlTextOrElt);
        }
        this.buttonPane.setParentContainer(this.mainElt);
        //MessageBox.showAlert("dd");
        if (setFormMethodDialog) {
            let form = qs("form", this.mainElt);
            form.method = "dialog";
        }
    }
}
