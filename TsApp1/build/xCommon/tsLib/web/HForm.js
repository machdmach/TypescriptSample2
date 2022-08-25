import { HtmFormFiller, HTMLFormElementX, MessageBox, AssertX, EntityBase, FormDataX, ResourseFetcher, EntityManagerBase } from "../tsLibPkg.js";
import { HTMLElementOverlay } from "../dom/HTMLElementOverlay.js";
import { DomLib } from "../dom/DomLib.js";
import { FormValidator } from "./FormValidator.js";
import { MyEvents } from "../dom/MyEvents.js";
import { CSSStyleDeclarationSwitch } from "../dom/CSSStyleDeclarationSwitch.js";
import { DomInterpolation2 } from "../dom/DomInterpolation.js";
import { ButtonPanel } from "../dom/ButtonPanel.js";
import { RecordNavigator } from "./RecordNavigator.js";
import { StatusBar } from "../dom/StatusBar.js";
import { WebFormData } from "./WebFormData.js";
export var FormType;
(function (FormType) {
    FormType["View"] = "view";
    FormType["Add"] = "add";
    FormType["Edit"] = "edit";
    FormType["Search"] = "search";
    FormType["Other"] = "Other";
})(FormType || (FormType = {}));
export class HForm {
    constructor(formTitle, formType) {
        this.formElt = uninit;
        this.clickedBtn = uninit;
        this.mouseEvent = uninit;
        this.keyID = uninit;
        this.dataSvc = uninit;
        this.recordName = "Record";
        this.formType = FormType.Add;
        this.referrerDataGridID = null;
        this.isTouched = false;
        this._isDirty = false;
        this.formOriginalDataStr = "?";
        //=========================================================================
        this.primarySubmitBtn = uninit;
        //=========================================================================
        this.domInt = uninit;
        this.DeleteBtnCSSSwitch = uninit;
        //=========================================================================
        this.templateUrl = "uninit";
        this.formType = formType;
        this.formEvents = new MyEvents(this, "addComplete", "editComplete", "deleteComplete", "beforeEdit", "modify");
        if (formTitle) {
            //this.dialogBox.setTitle = formTitle;
        }
    }
    static setButtonAbortDefaultInnerHtml(s) {
        HForm.buttonAbortDefaultInnerHtml = s;
    }
    //=========================================================================
    /*
    valid: This property returns true if the element’s contents are valid and false otherwise.
    invalid: This property returns true if the element’s contents are invalid and false otherwise.

    pristine: This property returns true if the element’s contents have not been changed.
    dirty: This property returns true if the element’s contents have been changed.

    untouched: This property returns true if the user has not visited the element.
    touched: This property returns true if the user has visited the element.
    */
    isPristine() { return !this.isDirty; }
    get isDirty() { return this._isDirty; }
    set isDirty(val) {
        console.log("isDirty set to: " + val);
        this._isDirty = val;
        // if (val) {
        //     this.formEvents.fireEvent("modify");
        // }
    }
    //=========================================================================
    setupModifyEvents() {
        HTMLFormElementX.setupChangeInputEvents(this.formElt, (ev) => {
            console.log("formEvent: ", ev);
            this.isTouched = true;
            let newData = WebFormData.stringifyFormData(this.formElt);
            if (newData !== this.formOriginalDataStr) {
                this.isDirty = true;
            }
            else {
                this.isDirty = false;
            }
            this.formEvents.fireEvent("modify", ev);
        });
    }
    //=========================================================================
    get isUpdateForm() { return this.formType === FormType.Edit; }
    get isInsertForm() { return this.formType === FormType.Add; }
    get isViewForm() { return this.formType === FormType.View; }
    get isSearchForm() { return this.formType === FormType.Search; }
    //=========================================================================
    closeForm() {
        //in-line form, nothing to close; or if used by DialogForm, overridden there
        //throw Error("to be implemented by derived class");
    }
    //=========================================================================
    initButtonPane(formElt) {
        this.buttonPane = new ButtonPanel();
        this.buttonPane.setParentContainer(formElt);
    }
    //=========================================================================
    setupForm(formElt) {
        this.formElt = formElt;
        if (!this.buttonPane) {
            this.initButtonPane(this.formElt);
        }
        HTMLFormElementX.setupID(formElt);
        HTMLFormElementX.setFields_ID_and_LabelFor_fromName(formElt);
        if ("") {
            FormValidator.showValidationErrorElements(formElt);
        }
        if ("setDefaultSubmitButtonForEnterKey") {
            let dummyBtn = this.buttonPane.addButton("defaultButtonz1", function () {
                console.warn('default button hit, EnterKey pressed? ');
            });
            dummyBtn.setAttribute("type", "submit");
            let style = dummyBtn.style;
            style.display = 'none';
            dummyBtn.onclick = (ev) => {
                return false;
            };
        }
        this.buttonPane.buttonPaneElt.addEventListener("click", (ev) => {
            if (ev.target === this.buttonPane.buttonPaneElt
                && 0 < ev.offsetX && ev.offsetX < 100
                && 0 < ev.offsetY && ev.offsetY < 100) {
                if (ev.ctrlKey) {
                    let data = this.dataSvc.getSampleData();
                    HtmFormFiller.filloutForm(formElt, data);
                }
            }
            else {
                //event caused by controls w/i the pane.
            }
            return false;
        });
        if (this.isInsertForm) {
            DomLib.fixElementsForActivity("add", formElt);
            let btnAdd = this.buttonPane.addButtonSubmitPrimary("<i class='fa fa-plus'></i> Add " + this.recordName, myGlobalUIEventHandler);
            btnAdd.accessKey = "k";
            btnAdd.classList.add('btnx-add');
            this.setupPrimarySubmitButton(btnAdd);
        }
        else if (this.isUpdateForm) {
            DomLib.fixElementsForActivity("edit", formElt);
            let btnUpdate = this.buttonPane.addButtonSubmitPrimary("<i class='fa fa-edit'></i> Update " + this.recordName, myGlobalUIEventHandler);
            btnUpdate.accessKey = "k";
            btnUpdate.classList.add('btnx-update');
            this.setupPrimarySubmitButton(btnUpdate);
            if (HForm.autoSetupDeleteButtons) {
                this.buttonDelete = this.buttonPane.addButtonDanger("<i class='fa fa-trash'></i> Delete " + this.recordName, (ev) => {
                    this.btnDelete_clicked(ev);
                });
                this.buttonDelete.classList.add('btnx-delete');
            }
        }
        if ("for-all-forms") {
            this.buttonAbort = this.buttonPane.addButtonInfo(HForm.buttonAbortDefaultInnerHtml, (ev) => {
                this.closeForm();
            });
            this.buttonAbort.classList.add("btnx-abort");
            this.buttonAbort.title = "Press Esc key to close/exit";
        }
        if (this.domInt === uninit) {
            this.domInt = new DomInterpolation2(formElt);
        }
        //formElt.oninvalid = this.formOnInvalidHandler; //not working
        formElt.onsubmit = (event) => {
            event.preventDefault();
            this.submitForm(); //oninvalid
        };
    }
    setupPrimarySubmitButton(btn) {
        if (this.primarySubmitBtn !== uninit) {
            throw Error("primarySubmitBtn already set up"); //just double check
        }
        this.primarySubmitBtn = btn;
        let btnClickedCount = 0;
        btn.onclick = (ev) => {
            this.clickedBtn = btn;
            this.mouseEvent = ev;
            btnClickedCount++;
        };
    }
    //=========================================================================
    async submitFormForAutomatedTest() {
        let ol = this.showOverlay(`This ${this.recordName} is going to be ${this.formType}ed by automated test`);
        await ol.hide();
        this.clickedBtn = this.primarySubmitBtn;
        await this.submitForm();
    }
    //=========================================================================
    async submitForm() {
        console.log("submitting form: clickedBtn=", this.clickedBtn);
        const clickedBtn = this.clickedBtn;
        let clickedBtnText = clickedBtn.textContent + "";
        if (!clickedBtnText) {
            throw Error('btn clicked text is empty');
        }
        const fd = WebFormData.collectFormData(this.formElt);
        FormDataX.toStr(fd, true);
        console.log('....., clickedBtn=' + clickedBtnText);
        if (clickedBtnText.includes("Add")) { //--------------------------------------------------
            AssertX.isTrue(this.isInsertForm, `clickedBtnText must include Add for insertForm`);
            let ol = HTMLElementOverlay.showOverlay("Adding " + this.recordName);
            try {
                //#add, #insert, #post, #submit
                let res = await this.dataSvc.post(fd);
                await ol.hide();
                if (!res.isPayloadUserError) {
                    this.closeForm();
                    let mesg = `The ${this.recordName} record has been added successfully`;
                    StatusBar.setText(mesg);
                    await this.formEvents.fireEvent("addComplete", true);
                }
            }
            catch (err) {
                await ol.hide();
                console.warn('error3983 posting record', err);
            }
        }
        else { //edit
            let beforeUpdateEventHandlers = this.formEvents.getEventHandlers("beforeEdit");
            for (let handler of beforeUpdateEventHandlers) {
                let result = await handler.handler(clickedBtn);
                if (!result) {
                    return; //----------------------
                }
            }
            AssertX.isTrue(this.isUpdateForm, `clickedBtnText must include update for update Form`);
            let ol = HTMLElementOverlay.showOverlay("Saving " + this.recordName);
            try {
                //#update, #put, #submit
                let res = await this.dataSvc.put(this.keyID, fd); //#todo
                await ol.hide();
                if (!res.isPayloadUserError) {
                    if (lastUIEvent instanceof MouseEvent && lastUIEvent.ctrlKey) {
                        await MessageBox.showInfo("update done" + res.debugInfo); //#sql, #updateDone
                    }
                    else {
                        this.closeForm();
                    }
                    let mesg = `The ${this.recordName} record has been updated successfully`;
                    StatusBar.setText(mesg);
                    await this.formEvents.fireEvent("editComplete", true);
                }
            }
            catch (err) {
                await ol.hide();
                throw err;
            }
        }
    }
    filloutForm(data, resetForm = true) {
        //Object.freeze(data);
        if (this.isUpdateForm || data.KeyID) {
            this.setKeyID(data.KeyID);
        }
        //this.origData = data;
        //let data = data;
        // let dataAny: any = data;
        // if (typeof data === 'string') {
        //     dataAny = { html: data };
        // }
        if (!this.isInsertForm) {
            let auditInfoHtml = EntityManagerBase.getAuditInfo(data);
            //<span class='iznterpolateHTML auditInfo'> {auditInfo} </span>
            //<span class="audit-info">auditInfoPH</span>
            let el = qsNullable(".audit-info", this.formElt);
            if (el !== null) {
                el.innerHTML = auditInfoHtml;
            }
        }
        HtmFormFiller.filloutForm(this.formElt, data, resetForm);
        this.domInt.expandWithDataObject(data);
        this.formOriginalDataStr = WebFormData.stringifyFormData(this.formElt);
        return data;
    }
    //=========================================================================
    async fetchDataAndFilloutForm(keyID, resetForm = true) {
        let overlayMesg = `Loading ${this.recordName} data`;
        let ol = this.showOverlay(overlayMesg);
        try {
            let data = await this.dataSvc.get(keyID);
            if (typeof data === 'string') {
                throw Error("data is a string");
            }
            else {
                this.filloutForm(data, resetForm);
            }
            await ol.hide();
        }
        finally {
            await ol.hide();
        }
    }
    //=========================================================================
    async fetchHtmlTextDataInto(keyID, selectorOrElt) {
        let overlayMesg = `Loading ${this.recordName} data`;
        let ol = this.showOverlay(overlayMesg);
        try {
            let data = await this.dataSvc.get(keyID);
            if (typeof data === 'string') {
                let elt = qs(selectorOrElt, this.formElt);
                elt.innerHTML = data;
            }
            else {
                throw Error("data is not a string");
            }
            await ol.hide();
        }
        finally {
            await ol.hide();
        }
    }
    //=========================================================================
    clearForm() {
        const data = new EntityBase();
        HtmFormFiller.filloutForm(this.formElt, data);
        this.setKeyID(0);
    }
    static showOverlay(mesg) {
        let ol = HTMLElementOverlay.showOverlay(mesg);
        return ol;
    }
    showOverlay(mesg) {
        return HForm.showOverlay(mesg);
    }
    //=========================================================================
    setKeyID(keyID) {
        if (keyID === undefined) {
            throw Error('keyID cannot be undefined');
        }
        else if (keyID === null) {
            throw Error('keyID cannot be null');
        }
        else if (typeof keyID === 'string') {
            if (keyID.length < 1) {
                throw Error('keyID cannot be blank');
            }
        }
        this.keyID = keyID;
        this.formElt.dataset.keyId = this.keyID + "";
    }
    //=========================================================================
    getKeyID() {
        let keyIDStr = this.formElt.dataset.keyId;
        if (!keyIDStr) {
            throw Error("keyId not found in FormElement dataset");
        }
        let ret = parseInt(keyIDStr, 10);
        return ret;
    }
    //=========================================================================
    removeAbortButton() {
        if (this.buttonAbort) {
            this.buttonAbort.remove();
        }
    }
    //=============================================================================
    //Delete functionality
    //=============================================================================
    removeFunctionality_Delete() {
        this.hideDeleteButton();
    }
    hideDeleteButton() {
        this.buttonPane.getButton(".btnx-delete").style.display = "none";
    }
    showDeleteButton() {
        this.buttonPane.getButton(".btnx-delete").style.display = "";
    }
    disableDeleteButton(disableMesg) {
        let b = this.buttonPane.getButton(".btnx-delete");
        if (!b.disabled) {
            this.DeleteBtnCSSSwitch = new CSSStyleDeclarationSwitch(b);
            let sw = this.DeleteBtnCSSSwitch;
            b.disabled = true;
            sw.switch("color", "#bbb");
            b.classList.add("tooltipx");
            let tooltipElt = document.createElement("span");
            tooltipElt.className = "tooltiptext";
            //tooltipElt.textContent = disableMesg;
            //disableMesg += "<br> line2";
            tooltipElt.innerHTML = disableMesg;
            b.appendChild(tooltipElt);
        }
    }
    //=========================================================================
    enableDeleteButton() {
        let b = this.buttonPane.getButton(".btnx-delete");
        b.classList.remove("tooltipx");
        b.disabled = false;
        if (this.DeleteBtnCSSSwitch !== uninit) {
            this.DeleteBtnCSSSwitch.reset();
        }
        let tooltipElt = qsNullable("span", b);
        if (tooltipElt) {
            tooltipElt.remove();
        }
    }
    //=========================================================================
    async enableOrDisableDeleteButton(keyID) {
        if (!keyID) {
            throw Error("keyID is required");
        }
        let form = this;
        const deletable = await form.dataSvc.deletable(form.keyID);
        if (deletable.value === true) {
            form.enableDeleteButton();
        }
        else {
            form.disableDeleteButton(deletable.reasons + "");
        }
    }
    //=========================================================================
    async btnDelete_clicked(ev) {
        console.log('Button Delete clicked, MouseEvent=', ev);
        if (ev.ctrlKey) {
            await this.submitFormDelete(ev);
        }
        else {
            await MessageBox.showConfirmWarning(`Are you sure to delete this ${this.recordName}?`, "OK, Delete").then(async (isPositive) => {
                if (isPositive) {
                    await this.submitFormDelete(ev);
                }
                else {
                    console.log('does nothing, user aborted');
                }
            });
        }
    }
    //=========================================================================
    async clickOnDeleteButtonForAutomatedTest() {
        let ol = this.showOverlay(`This ${this.recordName} is going to be deleted by automated test`);
        await ol.hide();
        await this.submitFormDelete("Automated");
    }
    //=========================================================================
    async submitFormDelete(ev) {
        let ol = this.showOverlay("Deleting " + this.recordName);
        try {
            let res = await this.dataSvc.delete(this.keyID);
            await ol.hide();
            if (!res.isPayloadUserError) {
                let mesg = `The ${this.recordName} has been record successfully deleted`;
                StatusBar.setText(mesg);
                this.closeForm();
                await this.formEvents.fireEvent("deleteComplete", true);
            }
        }
        catch (err) {
            await ol.hide();
            throw err;
        }
    }
    //=========================================================================
    async submitFormSimple(apiAction, overlayText) {
        let form = this;
        let ol = form.showOverlay(overlayText);
        let keyID = form.keyID;
        try {
            let res = await form.dataSvc.call(apiAction, keyID);
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
    setupRecordNavigator(callback) {
        this.recordNav = new RecordNavigator(this);
        this.recordNav.registerButtonClickedCallback(callback);
    }
    async initAsyncBase(formContainerElt) {
        let templateHtml = await ResourseFetcher.fetchText(this.templateUrl);
        formContainerElt.innerHTML = templateHtml;
        this.buttonPane.setParentContainer(formContainerElt);
        let formElm = qs("form", formContainerElt);
        this.setupForm(formElm);
    }
}
HForm.autoSetupDeleteButtons = true;
HForm.buttonAbortDefaultInnerHtml = "<i class='fa fa-ban'></i> Cancel";
