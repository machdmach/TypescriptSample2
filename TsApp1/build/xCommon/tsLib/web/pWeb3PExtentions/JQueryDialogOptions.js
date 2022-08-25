export class JQueryDialogOptions {
    constructor(dialogEvents) {
        this.showCloseButton = false;
        this.dialogEvents = dialogEvents; // new MyEvents(this, "create", "open", "beforeClose", "close");
        //let opts = MyDialogOptions.getDefaultJqDialogOptions();
        let opts = {};
        let openCount = 0;
        let closeCount = 0;
        let my = this;
        opts = {
            draggable: false,
            resizable: false,
            closeOnEscape: true,
            autoOpen: false,
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
        opts.hide = { effect: 'fade', duration: 300 };
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
        opts.beforeClose = function (ev, ui) {
            console.log('jqDialog beforeClose: ' + ++closeCount);
            my.dialogEvents.fireEvent("beforeClose");
        };
        opts.close = function (ev, ui) {
            console.log('jqDialog close..... closeCount: ' + ++closeCount);
            my.dialogEvents.fireEvent("close");
        };
        this.jqDialogOptions = opts;
        //this.jqDialogOptions.width = "auto";
        this.jqDialogOptions.width = "801px";
    }
}
