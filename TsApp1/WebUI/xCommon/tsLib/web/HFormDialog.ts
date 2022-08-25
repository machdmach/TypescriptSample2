
import { JQueryDialog } from "./pWeb3PExtentions/JQueryDialog.js";
import { FormType, HForm } from "./HForm.js";
import { ButtonPanel } from "../dom/ButtonPanel.js";
import { MyEvents } from "../dom/MyEvents.js";

export class HFormDialog extends HForm {
    get dialogEvents(): MyEvents { return this.dialogBox.dialogEvents; }

    //dialogBox: JQueryDialog = new JQueryDialog();
    //dialogBox: HDialog = new HDialog();
    dialogBox: JQueryDialog; // | HDialog;

    static set useJQueryDialog(flag: boolean) {
        Config.isUsingJQueryDialog = flag;
    }

    constructor(formTitle: string, formType: FormType) {
        super(formTitle, formType);
        //this.dialogEvents = new MyEvents(this, "create", "open", "beforeClose", "close");

        //HFormDialog.useNativeDialog = true;
        if (Config.isUsingJQueryDialog) {
            this.dialogBox = new JQueryDialog();
        }
        else {
            //this.dialogBox = new HDialog();
            throw Error("HDialog is not stable enough for forms");
        }
        //this.dialogBox = new HDialog();
        //this.dialogEvents = this.dialogBox.dialogEvents;

        if (this.dialogBox instanceof JQueryDialog) {
            //this.dialogBox.setWith_eg();
        }

        //this.buttonPane = this.dialogBox.buttonPane;
        this.buttonPane = new ButtonPanel();


        //this.mb.dialogElt.style.width = "2000px";
        //this.mb.options.setWidth(1900);
        if (formTitle) {
            this.dialogBox.setTitle = formTitle;
        }
        this.dialogBox.getTitleBarElt().style.backgroundColor = 'lightgoldenrodyellow';
        //this.dialogBox.dialogElt.classList.add(this.formType+ this.form);
    }
    //=========================================================================
    async initAsyncBase(): Promise<any> {
        await super.initAsyncBase(this.dialogBox.contentElt);
    }

    //=========================================================================
    openDialog(dialogWidth?: string) {
        //this.mb.jqDialogOptions.closeOnEscape = false;
        //if (typeof (dialogWidth) !== "undefined")
        this.setDialogWidth(dialogWidth!);
        this.dialogBox.showModal();
        if (typeof (this._dialogWidth) !== "undefined") {
            this.dialogBox.dialogElt.style.width = this._dialogWidth;
        }
    }
    get dialogElt() {
        return this.dialogBox.dialogElt;
    }
    //=========================================================================
    private _dialogWidth?: string = undefined;
    setDialogWidth(dialogWid: string) { //eg: "1000px"
        //this.dialogBox.dialogElt.style.width = width;
        this._dialogWidth = dialogWid;
    }
    private closeDialog() {
        this.clearForm();
        this.dialogBox.close();
    }
    closeForm() {
        this.closeDialog();
    }
}
