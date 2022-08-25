import PathX from '../core/PathX.js';
/**
 * @see HTMLScriptElement
 */
export class HTMLScriptElementX {
    loadScript(srcUrl) {
        let script = document.createElement("script");
        script.src = srcUrl;
        script.charset = "utf-8";
        script.async = false;
        script.defer = true;
        document.head.appendChild(script);
    }
    //=======================================================================
    static loadScript(src, callbackF) {
        let srcFname = PathX.getFileName(src).toLowerCase();
        let alreadyLoaded = false;
        for (let scriptIndex in document.scripts) {
            if ("x") {
                let fname = PathX.getFileName(document.scripts[scriptIndex].src).toLowerCase();
                if (srcFname === fname) {
                    alreadyLoaded = true;
                    console.log('--script already loaded', srcFname);
                    return; //----------------------
                }
            }
        }
        let scriptElt = document.createElement("script");
        scriptElt.type = 'text/javascript';
        scriptElt.setAttribute('src', src);
        if (document.head == null) {
            throw Error("document/head is null");
        }
        console.log('loadScript starting: ', src);
        document.head.appendChild(scriptElt);
        scriptElt.onload = () => {
            if (callbackF) {
                callbackF(src);
            }
            else {
            }
            console.log('loadScript completed: ', src);
        };
    }
}
