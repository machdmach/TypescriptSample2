export class HTMLImageElementX {
    static setPositionAbsoluteCenter(selector) {
        let img = qs(selector);
        if (!(img instanceof HTMLImageElement)) {
            throw Error(`${selector} is not an image element`);
        }
        console.log(selector, img);
        let st = img.style;
        st.position = "absolute";
        let leftPos = window.innerWidth - img.naturalWidth;
        st.left = (leftPos / 2) + "px";
        console.log(img.width);
        // How wide the image itself actually is
        console.log(img.naturalWidth);
        st.display = "";
        st.visibility = ""; //unset
        return img;
    }
    //=========================================================================
    static async loadImages_eg() {
        let imgLoadPromises = new Array();
        let imgEl = document.createElement("img");
        let p = HTMLImageElementX.loadImageAsync(imgEl, "url");
        imgLoadPromises.push(p);
        return Promise.all(imgLoadPromises);
    }
    //=========================================================================
    static async loadImageAsync(imgEl, src) {
        let promise = new Promise((resolve, reject) => {
            imgEl.src = src;
            imgEl.addEventListener("load", (ev) => {
                if (imgEl.complete) {
                    let mesg = `${ev.type}: src=${src} load event fired, imgEl.complete=${imgEl.complete}`;
                    console.log(mesg);
                    resolve({ src: src, status: 'ok, complete' });
                }
                else {
                    let mesg = `${ev.type}: src=${src} load event fired, but imgEl.complete=${imgEl.complete}`;
                    console.error(mesg);
                    resolve({ src: src, status: 'ok, notComplete' });
                }
            });
            imgEl.addEventListener("error", (ev) => {
                let mesg = `Error loadImageAync, ${ev.type}, src=${src}`; //ev.type="error"
                console.error(mesg);
                resolve({ src: src, status: 'error' });
            });
        });
        return promise;
    }
}
