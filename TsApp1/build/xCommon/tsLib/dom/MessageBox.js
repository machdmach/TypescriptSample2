import { MyError } from "../core/Errors.js";
import { JQueryButtonDialog } from "../web/pWeb3PExtentions/JQueryButtonDialog.js";
import { IconLib } from "./IconLib.js";
import { ResourseFetcher } from "./ResourceFetcher.js";
export class MessageBox {
    static newDialog(mesg, title, bgColor) {
        if (typeof mesg === "string") {
            mesg = mesg + "&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;";
            mesg = "<br>" + mesg;
            mesg = mesg + "<br>";
            mesg = mesg + "<br>";
        }
        //--------------------------------------------------------------------
        //jqueryDialog:
        let options = JQueryButtonDialog.createJQueryDialogOptions();
        options.jqDialogOptions.width = "auto";
        let mb = new JQueryButtonDialog(options);
        //--------------------------------------------------------------------
        //HtmlNativeDialog:
        // let mb = new HButtonDialog(); //don't delete this line
        //--------------------------------------------------------------------
        mb.mainElt.style.fontSize = "1.2em";
        mb.getTitleBarElt().style.backgroundColor = bgColor;
        mb.setDestroyOnClose();
        mb.setTitle = title;
        mb.setContent(mesg);
        return mb;
    }
    //=========================================================================
    static showAlert(alertMesg, title = "Alert", btnText = "Close") {
        //console.trace('showAlert');
        //title = IconLib.warn(title);
        title = this.fixTitle("&#x26A0;", title);
        let mb = this.newDialog(alertMesg, title, 'lightsalmon');
        let promise = new Promise((resolve, reject) => {
            mb.buttonPane.addButtonWarning(btnText, () => {
                //closed by this button
                mb.close(btnText);
                //resolve();
            });
            mb.dialogEvents.addEventHandler("close", (returnVal) => {
                //handler for dialog's close event
                console.log("MessageBox closed, returnVal=" + returnVal);
                resolve(returnVal);
            });
        });
        mb.showModal();
        return promise;
    }
    //=========================================================================
    static showConfirm(confirmMesg, positiveText = "OK", negativeText = "", title = "Please confirm") {
        return this.showConfirm_withBgColor('lightsteelblue', confirmMesg, positiveText, negativeText, title);
    }
    //=========================================================================
    static showConfirm_withBgColor(bgColor, confirmMesg, positiveText, negativeText, title) {
        if (!negativeText) {
            negativeText = this.NegativeButtonDefaultInnerHtml;
        }
        //title = IconLib.questionAnswer(title);
        title = this.fixTitle("&quest;", title);
        let mb = this.newDialog(confirmMesg, title, bgColor);
        positiveText = IconLib.check(positiveText);
        let promise = new Promise((resolve, reject) => {
            //mb.clearButtons();
            mb.buttonPane.addButtonInfo(positiveText, () => {
                resolve(true);
                mb.close();
            });
            mb.buttonPane.addButtonInfo(negativeText, () => {
                resolve(false);
                mb.close();
            });
            mb.dialogEvents.addEventHandler("close", () => { resolve(); });
        });
        mb.showModal();
        return promise;
    }
    //=========================================================================
    static showConfirmWarning(confirmMesg, positiveText = "OK", negativeText = "", title = "Please confirm") {
        return this.showConfirm_withBgColor('lightsalmon', confirmMesg, positiveText, negativeText, title);
    }
    //=========================================================================
    static showInfo(infoMesg, title = "Info", btnText = "OK") {
        //title = IconLib.info(title);
        // let icon = IconLib.infoElement;
        // icon.style.fontSize = "20pt";
        // title = icon.outerHTML + " " + title;
        title = this.fixTitle("&#x1F6C8;", title);
        let mb = this.newDialog(infoMesg, title, 'lightsteelblue');
        let promise = new Promise((resolve, reject) => {
            mb.buttonPane.addButtonInfo(btnText, () => {
                mb.hide();
                resolve();
            });
            mb.dialogEvents.addEventHandler("close", () => {
                resolve();
            });
        });
        mb.showModal();
        return promise;
    }
    static ensureDocumentClickListenerRegistered() {
        if (this.registerDocumentClickListenerDone) {
            return;
        }
        this.registerDocumentClickListenerDone = true;
        document.addEventListener("click", (ev) => {
            let target = ev.target;
            console.log("mesgbox:document.clicked event", ev);
            let dialog = target.closest("[role=dialog]");
            //if clickEvent originates from inside the dialog, then ignore it.
            if (dialog === null && this.popupDialog !== null) {
                try {
                    console.log("mesgbox:document.clicked event, closing popup", ev);
                    this.popupDialog.hide();
                }
                catch { /*ignore error, double-click*/ }
            }
        });
    }
    //=========================================================================
    static showPopupCloseOnDocumentClick(infoMesg, title = "Info", btnText = "Close") {
        title = IconLib.info(title);
        let mb = this.newDialog(infoMesg, title, 'lightsteelblue');
        this.popupDialog = mb;
        let promise = new Promise((resolve, reject) => {
            mb.buttonPane.addButtonInfo(btnText, () => {
                this.popupDialog = null;
                mb.hide();
                resolve();
            });
            mb.dialogEvents.addEventHandler("close", () => {
                this.popupDialog = null;
                resolve();
            });
        });
        this.ensureDocumentClickListenerRegistered();
        mb.showModal();
        return promise;
    }
    //=========================================================================
    static async showResourceAtUrl(url, cb) {
        let templateHtml = await ResourseFetcher.fetchText(url);
        if (cb) {
            templateHtml = cb(templateHtml);
        }
        let title = url;
        let mb = this.newDialog(templateHtml, title, 'lightsteelblue');
        mb.buttonPane.addButtonWarning("Close", () => {
            mb.hide();
        });
        mb.showModal();
        return mb;
    }
    //=========================================================================
    static showSystemError(err, title = "Error", btnText = "Close") {
        console.error(err);
        //debugger;
        if (!err) {
            throw Error("Invalid arg: err is null");
        }
        if (err instanceof String || err.startsWith) {
            err = new Error(err);
        }
        if (!(err instanceof Error)) {
            if (err.message) {
                err = new Error(err.message);
            }
            else {
                throw Error("arg err must be of type Error, not: " + typeof (err));
            }
        }
        let myErr = err;
        if (!title.toLowerCase().startsWith("error")) {
            title = "Error: " + title;
        }
        let errMesg = err.message;
        if (err.stack) {
            errMesg = '<pre>' + err.stack + '</pre>';
        }
        if (myErr.htmlMessage) {
            errMesg += myErr.htmlMessage;
        }
        let mb = this.newDialog(errMesg, title, 'indianred');
        myErr.handled = true;
        mb.dialogElt.style.minWidth = '1000px';
        let promise = new Promise((resolve, reject) => {
            mb.buttonPane.addButtonDanger(btnText, () => {
                mb.hide();
                resolve();
            });
            mb.dialogEvents.addEventHandler("close", () => {
                resolve();
            });
        });
        mb.showModal();
        return promise;
    }
    //=========================================================================
    static showUserError(errMesg, title, btnText = "Close") {
        let err = new MyError(errMesg);
        if (!title) {
            title = "Error";
        }
        if (!title.toLowerCase().startsWith("error")) {
            title = "Error: " + title;
        }
        title = this.fixTitle("&#x2298", title); //x229D;
        console.warn(err);
        let mb = this.newDialog(errMesg, title, 'indianred');
        let promise = new Promise((resolve, reject) => {
            mb.buttonPane.addButtonDanger(btnText, () => {
                mb.hide();
                resolve();
            });
            mb.dialogEvents.addEventHandler("close", () => { resolve(); });
        });
        mb.showModal();
        return promise;
    }
    //=========================================================================
    static showPrompt(promptMesg, title = "Please Respond:", btnText = "OK") {
        let html = promptMesg;
        let div = document.createElement("div");
        div.appendChild(document.createTextNode(promptMesg));
        div.appendChild(document.createElement("br"));
        let inputElt = document.createElement("input");
        inputElt.className = "ff-control";
        inputElt.required = true;
        let st = inputElt.style;
        st.width = "95%";
        st.marginTop = "5px";
        div.appendChild(inputElt);
        let mb = this.newDialog(div, title, 'lightsteelblue');
        let promise = new Promise((resolve, reject) => {
            let cb = () => {
                let inputText = inputElt.value;
                mb.hide();
                resolve(inputText);
            };
            let okBtn = mb.buttonPane.addButtonPrimary(btnText, cb);
            okBtn.disabled = true;
            inputElt.addEventListener("keyup", (ev) => {
                if (inputElt.value.trim().length > 0) {
                    okBtn.disabled = false;
                    ev.preventDefault();
                    //if (e.keyCode === 13) {
                    if (ev.key === "Enter") {
                        cb();
                    }
                }
                else {
                    okBtn.disabled = true;
                }
            });
            mb.buttonPane.addButtonInfo("Cancel", () => {
                mb.hide();
                //reject();
                resolve();
            });
            mb.dialogEvents.addEventHandler("close", () => {
                //reject();
                resolve();
            });
        });
        mb.showModal();
        return promise;
    }
    //=========================================================================
    static fixTitle(iconHtml, title) {
        //title = IconLib.info(title);
        //let icon = IconLib.infoElement;
        //let icon = this.createEl("&#x1F6C8;");
        let icon = document.createElement("span");
        icon.innerHTML = iconHtml;
        icon.style.fontWeight = "bold";
        icon.style.fontSize = "30pt";
        icon.style.fontSize = "20pt";
        title = icon.outerHTML + " " + title;
        return title;
    }
}
//https://getbootstrap.com/docs/4.0/components/buttons/
//     //lightsteelblue normal
//     //lightsalmon ~yellow
//     //indianred
MessageBox.NegativeButtonDefaultInnerHtml = IconLib.ban("Cancel");
//=========================================================================
MessageBox.popupDialog = null;
MessageBox.registerDocumentClickListenerDone = false;
//=========================================================================
windowBag.ModalBox_showAlert = function (mesg) {
    MessageBox.showAlert(mesg);
};
