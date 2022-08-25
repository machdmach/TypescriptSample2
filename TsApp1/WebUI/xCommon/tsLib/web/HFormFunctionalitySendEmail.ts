import { HFormDialog } from "./HFormDialog.js";

export class HFormFunctionalitySendEmail {

    form: HFormDialog;
    get recordName(): string { return this.form.recordName; }
    constructor(form: HFormDialog) {
        this.form = form;
    }
    //=========================================================================
    async submitFormSendEmail(ev: MouseEvent | "Automated"): Promise<number> {
        let form = this.form;
        let ol = form.showOverlay("Sending Email");
        let keyID = form.keyID;
        try {
            let res = await form.dataSvc.call("sendEmail", keyID);
            await ol.hide();
            if (!res.isPayloadUserError) {
            }
        }
        catch (err) {
            await ol.hide();
            throw err;
        }
        return keyID;
    }
}
