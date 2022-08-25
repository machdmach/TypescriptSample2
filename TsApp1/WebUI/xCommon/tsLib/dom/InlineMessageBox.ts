
import { IconLib } from "./IconLib.js";

export class InlineMessageBox {
    static newDialog(mesg: string | HTMLElement, title: string, bgColor: string) {

        let ret: HTMLElement;
        if (typeof mesg === "string") {
            mesg = mesg + "&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;";
            mesg = "<br>" + mesg;
            mesg = mesg + "<br>";
            mesg = mesg + "<br>";

            ret = document.createElement("div");
            ret.innerHTML = mesg;
        }
        else {
            ret = mesg;
        }
        let parentElt = qsNullable("main");
        if (parentElt === null) {
            parentElt = document.body;
        }
        let st = ret.style;
        st.textAlign = "center";

        parentElt.prepend(ret);
        return ret;
    }
    //=========================================================================
    static showInfo(infoMesg: string | HTMLElement, title: string = "Info", btnText: string = "OK") {
        title = IconLib.info(title);

        let ret = this.newDialog(infoMesg, title, 'lightsteelblue');

        let promise = new Promise((resolve: Function, reject: Function) => {
        });
        return ret;
    }
    //=========================================================================
    static showError(infoMesg: string | HTMLElement, title: string = "Info", btnText: string = "OK") {
        title = IconLib.info(title);

        let ret = this.newDialog(infoMesg, title, 'lightsteelblue');
        ret.className = "err";

        let st = ret.style;
        st.color = "red";

        let promise = new Promise((resolve: Function, reject: Function) => {
        });
        return ret;
    }
}
