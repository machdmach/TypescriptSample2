import { MyEvents } from "../../dom/MyEvents.js";

export class JQueryDialogOptions { //implements JQueryUI.DialogOptions {

    showMaximizeButton?: boolean;
    showCloseButton: boolean = false;

    // zzautoOpen?: boolean;
    // //buttons?: { [buttonText: string]: (event?: Event) => void } | DialogButtonOptions[];
    // zzcloseOnEscape?: boolean;
    // //classes?: DialogClasses;
    // zzcloseText?: string;
    // zzappendTo?: string;
    // zzdialogClass?: string;
    // zzdisabled?: boolean;
    // zzdraggable?: boolean;
    height?: number | string;
    //hide?: boolean | number | string | DialogShowHideOptions;
    // zzmaxHeight?: number;
    // zzmaxWidth?: number;
    // zzminHeight?: number;
    // zzminWidth?: number;
    // zzmodal?: boolean;
    // zzposition?: any; // object, string or []
    // zzresizable?: boolean;
    // //show?: boolean | number | string | DialogShowHideOptions;
    // zzstack?: boolean;
    // zztitle?: string;
    // zzwidth?: any; // number or string
    // zzzIndex?: number;
    //open?: DialogEvent;
    //close?: DialogEvent;

    jqDialogOptions: JQueryUI.DialogOptions;
    dialogEvents: MyEvents;

    constructor(dialogEvents: MyEvents) {
        this.dialogEvents = dialogEvents; // new MyEvents(this, "create", "open", "beforeClose", "close");

        //let opts = MyDialogOptions.getDefaultJqDialogOptions();
        let opts: JQueryUI.DialogOptions = {};
        let openCount = 0;
        let closeCount = 0;
        let my = this;
        opts = {
            draggable: false,
            resizable: false,
            closeOnEscape: true,
            autoOpen: false, //default true
            //height: 500,
            //width: wid,
            //width: my.dialogElt.style.width,
            //closeText: 'hide',
            //position: [300, 500],
            modal: true, //default is false

        };
        // interface DialogShowHideOptions {
        //     effect: string;
        //     delay?: number;
        //     duration?: number;
        //     easing?: string;
        // }
        //opts.show = { effect: 'bounce', duration: 300 } as JQueryUI.DialogShowHideOptions;
        opts.hide = { effect: 'fade', duration: 300 } as JQueryUI.DialogShowHideOptions;

        opts.create = function (event) {
            console.log('jqDialog created, should be once only'); // + dialogElt.id);
            //$(<any>event.target).parent().css('position', 'fixed'); dd
            //$(this).css("max-width", "660px");
            my.dialogEvents.fireEvent("create");
        };

        opts.open = function () {
            console.log('jqDialog open..... openCount: ' + ++openCount);
            my.dialogEvents.fireEvent("open");
        };

        opts.beforeClose = function (ev: Event, ui: any) {
            console.log('jqDialog beforeClose: ' + ++closeCount);
            my.dialogEvents.fireEvent("beforeClose");
        };

        opts.close = function (ev: Event, ui: any) {
            console.log('jqDialog close..... closeCount: ' + ++closeCount);
            my.dialogEvents.fireEvent("close");
        };

        this.jqDialogOptions = opts;
        //this.jqDialogOptions.width = "auto";
        this.jqDialogOptions.width = "801px";
    }
}
