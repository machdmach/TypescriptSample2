import { MessageBox } from "./MessageBox.js";
import { NavigatorX } from "./NavigatorX.js";
//=======================================================================
// Global Error Handlers
//=======================================================================
export class GlobalErrorHandler {
    static HandleErrorFromMain(err) {
        //throw err; ff
        console.trace(err);
        //ModalBox.showError(err); //d
        let errMesg = (err.mesg || err) + "";
        if (err.handled || errMesg.toLocaleLowerCase().includes('#handled')) {
            console.warn("Globally catched error already handled: ", err);
        }
        else {
            console.error("Globally catched error not handled: ", err);
            // if (!(err instanceof MyError)) {
            //     err = new MyError(err);
            //     //ModalBox.showError(errObj, "reamsMain.catch");
            // }
            // else {
            // }
            MessageBox.showSystemError(err, "global.catch");
        }
    }
    //=======================================================================
    static init() {
        //=======================================================================
        window.addEventListener('error', (e) => {
            let err = e.error;
            //alert(e);
            if (err) {
                if (err.message) {
                    // let errElt = qs('#phGlobalError');
                    // errElt.style.backgroundColor = 'white';
                    // errElt.style.color = 'red';
                    // errElt.innerHTML = errMesg;
                    //console.warn(err.message);
                    console.warn('globally err.stack', err.stack);
                    let errMesg = `<h2>.GlobalError catched: </h2>mesg: ${err.message}, <br>stack:<pre>${err.stack} </pre>`;
                    if (err.message.indexOf('SecurityError') >= 0 && NavigatorX.isAntiquatedBrowser) {
                        //nothing,
                        console.log("isAntiquatedBrowser, SecurityError on IE");
                    }
                    else {
                        windowExtBag.showAlert(errMesg);
                    }
                }
                else {
                    console.log('ErrorEvent, message property not found', e);
                }
            }
            else {
                console.warn('globe ball er ror catched', e);
            }
        });
        //=========================================================================
        window.addEventListener('unhandledrejection', function (event) {
            //unhandledrejection works in Chrome only
            console.warn('unhandledrejection, PromiseRejectionEvent=', event);
            //if (event.reason instanceof MyError) {
            if (event.reason.handled) {
                // isMyError
            }
            else {
                //let errMesg = "unhandledrejection: " + JSON.stringify(event); //.reason.mesg;
                let errMesg = "unhandledrejection: " + event.reason; //.reason.mesg;
                if ("x") {
                    windowExtBag.showAlert(errMesg);
                }
            }
        });
        //=========================================================================
        windowExtBag.showAlert = function (mesg) {
            //tobe re-defined in ModalBox.showAlert()
            //console.log(typeof windowBag.ModalBox_showAlert);
            //mesg = mesg.replace(/\</g, "&lt;");
            if (typeof windowBag.ModalBox_showAlert === 'function') {
                windowBag.ModalBox_showAlert(mesg);
            }
            else {
                //alert(mesg);
                let elt = document.createElement("p");
                elt.textContent = mesg;
                document.body.insertBefore(elt, document.body.firstChild);
                //document.body.appendChild(elt);
                console.log('error elt added', elt);
                //alert(elt);
            }
        };
    }
}
