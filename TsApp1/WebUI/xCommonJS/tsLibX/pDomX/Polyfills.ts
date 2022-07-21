import PathX from "../pSystemX/PathX.js";
import { AssertX } from "../tsLibPkg.js";

declare var dialogPolyfill: any;
class HTMLDialogElement { }

export class Polyfills {

    static checkPrerequisites() {
        let fd = new FormData();
        let errMesg = "checkPrerequisites failed";
        if (False) AssertX.functionExists("entries", fd, errMesg);
    }
    //=========================================================================
    static registerDialogIfNeeded(dialogEl: HTMLElement) {
        if (typeof HTMLDialogElement === "undefined") {
            console.log("HTMLDialogElement not implemented natively");
            if (typeof dialogPolyfill === "undefined") {
                console.error("dialogPolyfill is still undefined, dialog-polyfill.js is probably missing?");
            }
            else {
                dialogPolyfill.registerDialog(dialogEl);
            }
        }
    }

    //=========================================================================
    static async loadResourcesAsNeeded() {
        console.log("loading resources");

        let srcArr: string[] = [];
        //let pArr: Promise<any>[];
        let promises: Promise<any>[] = [];

        if (typeof HTMLDialogElement === "undefined") {
            //if ("x") throw Error("native dialog not supported");
            console.log("typeof HTMLDialogElement === undefined");

            if (!"load-polyfill-for-dialog") {
                srcArr.push("dialog-polyfill/dialog-polyfill.js");
                srcArr.push("dialog-polyfill/dialog-polyfill.css");
                //../vendor/polyfills/dialog-polyfill/dialog-polyfill.js
            }
        }
        else {
            console.log("typeof HTMLDialogElement !== undefined");
            // srcArr.push("dialog-polyfill/dialog-polyfill.js"); //#todo
            // srcArr.push("dialog-polyfill/dialog-polyfill.css");
        }
        if (srcArr.length > 0) {
            srcArr.forEach(src => {
                let srcFixed = "../vendor/polyfills/" + src;
                let p = this.loadResource(srcFixed);
                promises.push(p);
            });
            let results: any[] = await Promise.all(promises);
        }
    }

    //=======================================================================
    static async loadResource(srcUrl: string) {
        let ext = PathX.getFileExtention(srcUrl);
        if (!ext) {
            throw Error("ext");
        }
        ext = ext?.toLowerCase();
        switch (ext) {
            case "js": return this.loadScript(srcUrl);
            //case "css": return this.loadStyle(srcUrl);
            default:
                let err = srcUrl + ", unknown extenstion: " + ext;
                console.error(err);
                throw Error(err);
        }
    }
    //=======================================================================
    static async loadScript(srcUrl: string) {
        let scriptEl = document.createElement("script");
        scriptEl.src = srcUrl;
        scriptEl.charset = "utf-8";
        scriptEl.async = false;
        scriptEl.defer = true;
        document.head.appendChild(scriptEl);
        let p = new Promise<void>((resolve, reject) => {
            scriptEl.onload = (ev: Event) => {
                console.log("script loaded: " + srcUrl);
                resolve();
            };
        });
        return p;
    }

    //=========================================================================
    static test1() {
        let s = "anything";
        let cp1 = s.codePointAt(1);  //IE

    }

}
/*
*/
/* * IE9, IE10 and IE11 requires all of the following polyfills. **/
// import 'core-js/es6/symbol';
// import 'core-js/es6/object';
// import 'core-js/es6/function';
// import 'core-js/es6/parse-int';
// import 'core-js/es6/parse-float';
// import 'core-js/es6/number';
// import 'core-js/es6/math';
// import 'core-js/es6/string';
// import 'core-js/es6/date';
// import 'core-js/es6/array';
// import 'core-js/es6/regexp';
// import 'core-js/es6/map';
// import 'core-js/es6/weak-map';
// import 'core-js/es6/set';
