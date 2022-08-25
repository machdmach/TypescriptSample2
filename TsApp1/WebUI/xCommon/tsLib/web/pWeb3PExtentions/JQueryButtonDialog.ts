import { ButtonPanel } from "../../dom/ButtonPanel.js";
import { JQueryDialog } from "./JQueryDialog.js";
import { JQueryDialogOptions } from "./JQueryDialogOptions.js";

export class JQueryButtonDialog extends JQueryDialog {
    static option2Extends: JQueryDialog;

    buttonPane: ButtonPanel;
    constructor(options?: JQueryDialogOptions) {
        super(options);
        this.buttonPane = new ButtonPanel(); //this.mainElt);
    }
    //=========================================================================
    setContent(htmlTextOrElt: string | HTMLElement, setFormMethodDialog = false) {

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
            let form = qs("form", this.mainElt) as HTMLFormElement;
            form.method = "dialog";
        }
    }
    //=========================================================================
}
