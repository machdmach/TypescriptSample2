import { DomLib } from "../../dom/DomLib.js";
import { JQueryDialogOptions } from "./JQueryDialogOptions.js";
import { MyEvents } from "../../dom/MyEvents.js";

export class JQueryDialog {

    private jqDialog = uninit as JQuery<HTMLElement>;
    titleBarElt = uninit as HTMLElement;
    dialogElt = uninit as HTMLElement; //: HTMLFormElement;
    mainElt = uninit as HTMLElement; //: HTMLFormElement;
    contentElt = uninit as HTMLElement; //: HTMLFormElement;
    dialogEvents: MyEvents;

    static createJQueryDialogOptions() {
        let dialogEvents = new MyEvents(this, "create", "open", "beforeClose", "close"); //cancel event
        let options = new JQueryDialogOptions(dialogEvents);
        return options;
    }
    constructor(options?: JQueryDialogOptions) { // width?: string | number) {
        options = options ?? JQueryDialog.createJQueryDialogOptions();
        this.dialogEvents = options.dialogEvents;
        // if (options) {
        //     this.dialogEvents = options.dialogEvents;
        // }
        // else {
        //     this.dialogEvents = new MyEvents(this, "create", "open", "beforeClose", "close");
        //     options = new JQueryDialogOptions(this.dialogEvents);
        // }

        let totalDialogCount = document.querySelectorAll("div.ui-dialog").length;
        //totalDialogCount = 1000;
        if (totalDialogCount > 20) {
            throw Error("Too many dialogs exist: " + totalDialogCount);
        }

        this.mainElt = document.createElement("div");
        this.contentElt = document.createElement("div");
        this.mainElt.appendChild(this.contentElt);

        //this.buttonPane = new ButtonPanel(); //this.mainElt);
        this.jqDialog = jQuery(this.mainElt).dialog(options.jqDialogOptions);

        this.dialogElt = qsClosest('.ui-dialog', this.mainElt);
        //this.dialogElt.style.top = "100px";
        this.dialogElt.classList.add("my-form-dialog");

        this.titleBarElt = qs('.ui-dialog-titlebar', this.dialogElt);
        //this.titleBarElt = this.getTitleBarElt();


        //this.dialogElt.style.width = '1000px';//ddd
        //this.dialogElt.style.zIndex = "-z1"; //not working here

        if (options.showMaximizeButton) {
            this.convertCloseButtonToMaximizeButton();
        }
        else if (options.showCloseButton) {
            //leave the already-built Close button there
        }
        else {
            this.removeCloseButton();
        }
        windowBag.de = this.dialogElt;
    }
    //=========================================================================
    private removeCloseButton() {
        let closeBtn = qs('button', this.titleBarElt);
        closeBtn.remove(); //remove the default x button  of jquery-dialog,
    }
    //=========================================================================
    private convertCloseButtonToMaximizeButton() {
        let closeBtn = qs('button', this.titleBarElt);
        if (closeBtn.parentNode != null) {
            let maximizeBtn = closeBtn.cloneNode(true) as HTMLElement;
            maximizeBtn.innerHTML = "Maximize";
            maximizeBtn.onclick = (e: MouseEvent) => {
                //alert('aa');
                //e.stopPropagation();
                //e.preventDefault();
                //this.dialogElt.style.width = '1000px';
                this.dialogElt.style.width = '200%';
                this.dialogElt.style.left = "0px";
            };
            closeBtn.parentNode.replaceChild(maximizeBtn, closeBtn);
        }
    }

    //=========================================================================
    isDestroyed = false;
    setDestroyOnClose(flag: boolean = true) {
        //let my = this;
        if (flag) {
            this.jqDialog.on("dialogclose", () => {
                this.destroy();
                this.isDestroyed = true;
            });
        }
        else {
            this.jqDialog.on("dialogclose", () => {
                //this.destroy();
            });
        }
    }

    //=========================================================================
    getTitleBarElt(): HTMLElement {
        return this.titleBarElt;
    }
    set setTitle(title: string) {
        let titleElt = qs('.ui-dialog-title', this.titleBarElt);
        titleElt.innerHTML = title;
    }

    //=========================================================================
    showModal() {
        this.jqDialog.dialog('open');
        //this.dialogElt.style.width = '100%';
        this.dialogElt.style.zIndex = DomLib.getNextZIndex().toString();
    }
    hide() {
        this.jqDialog.dialog("close");
    }
    close(returnVal?: string) {
        this.jqDialog.dialog("close");
    }
    destroy() {
        this.jqDialog.dialog("destroy");
    }
}
