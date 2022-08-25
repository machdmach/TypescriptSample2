export class HFormFunctionalitySendEmail {
    constructor(form) {
        this.form = form;
    }
    get recordName() { return this.form.recordName; }
    //=========================================================================
    async submitFormSendEmail(ev) {
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
