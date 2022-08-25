import { MessageBox } from "./MessageBox.js";
import { FetchAPI } from "../core/FetchAPI.js";
import { XMLHttpRequestX } from "./XMLHttpRequestX.js";

export class ResourseFetcher {

    static async fetchText(url: string): Promise<string> {
        let xhr = new XMLHttpRequestX();
        let p: Promise<XMLHttpRequest> = xhr.get(url);

        let ret: Promise<string>;
        ret = p.then(res => {
            return res.responseText;
            //res.responseXML: Document
        }).catch(function (err) {
            //debugger;
            let errMesg = 'fetch failed for url: ' + url + ", err=" + err;
            MessageBox.showAlert(errMesg);
            throw Error(errMesg);
        });
        return ret;
    }

    //=========================================================================
    static async fetchText2(url: string): Promise<string> {
        let fetcher = new FetchAPI();
        let rval: Promise<string>;
        rval = fetcher.get(url)
            .then((response: Response) => {
                return response.text();
            });
        return rval;
    }

    //=========================================================================
    static async fetchHtml_toHTMLElementSelector(eltOrSelector: string | HTMLElement, url: string) {
        let elt = qs(eltOrSelector);

        //await MessageBox.showAlert("asdf");
        try {
            let resourceContent = await ResourseFetcher.fetchText(url);
            elt.innerHTML = resourceContent;
            return elt;
        }
        catch (err) {
            let errMesg = 'fetch failed for url: ' + url;
            //errMesg = "err123";
            await MessageBox.showAlert(errMesg);
            throw Error(errMesg);
        }

        // let resourceContent = await ResourseFetcher.fetchText(url);
        // elt.innerHTML = resourceContent;
        // return elt;
    }
    //=========================================================================
    static async fetchHtmlCreateElement(url: string, tagName?: string) {
        if (tagName === undefined) {
            tagName = "div";
        }
        let elt = document.createElement(tagName);
        elt.dataset.resourceFetched = url;

        let resourceContent = await ResourseFetcher.fetchText(url);
        elt.innerHTML = resourceContent;
        return elt;
    }

    //=========================================================================
    static async loadImageBlob(imgElt: HTMLImageElement, url: string) {

        let fetcher = new FetchAPI();
        let promise: Promise<void> = fetcher.get(url)
            .then(function (response: Response) {
                let ret: Promise<Blob> = response.blob();
                return ret;
            })
            .then(function (myBlob: Blob) {
                //myBlob.type = "text/html";
                //myBlob.size = 123;
                MessageBox.showAlert("ddd");
                let objectURL = URL.createObjectURL(myBlob);
                imgElt.src = objectURL;
            })
            .catch(function (err) {
                let errMesg = 'fetch failed for img url: ' + url + ", err=" + err;
                MessageBox.showAlert("ddd");
                throw Error(errMesg);
            });
        return promise;
    }
}
