import { HFormDialog } from "./HFormDialog.js";
import { MessageBox } from "../pDomX/MessageBox.js";
import { StatusBar } from "../pDomX/StatusBar.js";

export class HFormFunctionalityActivate {// extends MyFormDialog {

    form: HFormDialog;
    get recordName(): string { return this.form.recordName; }
    constructor(form: HFormDialog) {
        this.form = form;
    }

    //=========================================================================
    private btnInactivate?: HTMLElement | null;
    addFunctionality_Inactivate(inactivateLabel = "Inactivate") {
        this.removeFunctionality_Reactivate();
        if (this.btnInactivate) {
            return; //---------- already added previously
        }
        let form = this.form;

        let btnInnerHtml = `<i class='fa fa-times-circle'></i> ${inactivateLabel} ${this.recordName}`;

        let btn = form.buttonPane.addButtonDanger(btnInnerHtml, (ev: MouseEvent) => {
            this.btnInactivate_clicked(ev, inactivateLabel);
        });
        btn.accessKey = "l";

        if (!btn.parentElement) throw "never";
        if (!form.buttonAbort) throw "never";
        btn.parentElement.insertBefore(btn, form.buttonAbort);
        this.btnInactivate = btn;
    }
    removeFunctionality_Inactivate() {
        if (this.btnInactivate) {
            this.btnInactivate.remove();
            this.btnInactivate = null;
        }
    }
    //=========================================================================
    private btnReactivate?: HTMLElement | null;
    addFunctionality_Reactivate(reactivateLabel = "Reactivate") {
        this.removeFunctionality_Inactivate();
        if (this.btnReactivate) {
            return; //---------- already added previously
        }

        let form = this.form;
        let btnInnerHtml = `<i class='fas fa-times-circle'></i> ${reactivateLabel} ${this.recordName}`;

        let btn = form.buttonPane.addButtonDanger(btnInnerHtml, (ev: MouseEvent) => {
            this.btnReactivate_clicked(ev, reactivateLabel);
        });
        btn.accessKey = "l";

        if (!btn.parentElement) throw "never";
        if (!form.buttonAbort) throw "never";
        btn.parentElement.insertBefore(btn, form.buttonAbort);
        this.btnReactivate = btn;
    }
    removeFunctionality_Reactivate() {
        if (this.btnReactivate) {
            this.btnReactivate.remove();
            this.btnReactivate = null;
        }
    }

    //=========================================================================
    async btnInactivate_clicked(ev: MouseEvent, inactivateLabel?: string) {
        let form = this.form;
        console.log('Button Cancel clicked, MouseEvent=', ev);
        if (!"this.deletable") {
            MessageBox.showUserError("This record doesn't allow " + inactivateLabel, "Error");
        }
        else {
            await MessageBox.showConfirmWarning(`Are you sure to ${inactivateLabel} this ${this.recordName}?`, `OK, ${inactivateLabel}`).then(async (isPositive) => {
                if (isPositive) {
                    await this.submitFormInactivate(ev);
                    StatusBar.setText(`${inactivateLabel} ${this.recordName} completed`);
                }
                else {
                    console.log('does nothing, user aborted');
                }
            });
        }
    }

    //=========================================================================
    async btnReactivate_clicked(ev: MouseEvent, reactivateLabel?: string) {
        let form = this.form;
        console.log('Button UndoCancel clicked, MouseEvent=', ev);
        let keyID = 0;
        await MessageBox.showConfirmWarning(`Are you sure to ${reactivateLabel} this ${this.recordName}?`, `OK, ${reactivateLabel}`).then(async (isPositive) => {
            if (isPositive) {
                keyID = await this.submitFormReactivate(ev);
                StatusBar.setText(`${reactivateLabel} ${this.recordName} completed`);
            }
            else {
                console.log('does nothing, user aborted');
            }
        });
        return keyID;
    }
    //=========================================================================
    async submitFormInactivate(ev: MouseEvent | "Automated") {
        let form = this.form;
        let ol = form.showOverlay("Inactivating " + this.recordName);
        try {
            let res = await form.dataSvc.call("inactivate", form.keyID);
            await ol.hide();
            if (!res.isPayloadUserError) {
                form.closeForm();
                await form.formEvents.fireEvent("editComplete", true);
            }
        }
        catch (err) {
            await ol.hide();
            throw err;
        }
    }

    //=========================================================================
    async submitFormReactivate(ev: MouseEvent | "Automated") {
        let form = this.form;
        let ol = form.showOverlay("Reactivating" + this.recordName);
        let keyID = form.keyID;
        try {
            let res = await form.dataSvc.call("reactivate", form.keyID);
            await ol.hide();
            if (!res.isPayloadUserError) {
                await form.formEvents.fireEvent("editComplete", true);
            }
        }
        catch (err) {
            await ol.hide();
            throw err;
        }
        return keyID;
    }
}
