import { MessageBox } from "./MessageBox.js";
import { FetchAPI } from "../core/FetchAPI.js";
import { XMLHttpRequestX } from "./XMLHttpRequestX.js";
export class ResourseFetcher {
    static async fetchText(url) {
        let xhr = new XMLHttpRequestX();
        let p = xhr.get(url);
        let ret;
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
    static async fetchText2(url) {
        let fetcher = new FetchAPI();
        let rval;
        rval = fetcher.get(url)
            .then((response) => {
            return response.text();
        });
        return rval;
    }
    //=========================================================================
    static async fetchHtml_toHTMLElementSelector(eltOrSelector, url) {
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
    static async fetchHtmlCreateElement(url, tagName) {
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
    static async loadImageBlob(imgElt, url) {
        let fetcher = new FetchAPI();
        let promise = fetcher.get(url)
            .then(function (response) {
            let ret = response.blob();
            return ret;
        })
            .then(function (myBlob) {
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
