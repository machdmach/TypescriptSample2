

//https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model
/*
External style sheet
Internal style sheet
Inline style
*/
export class CssExternalStyleSheet {
    //=========================================================================
    static findLinkedExternalCss(url: string): StyleSheet | null {
        let ss = Array.from(document.styleSheets);
        let urlLower = url.toLowerCase();

        for (let s of ss) {
            if (s.href) {
                console.log(`href=${s.href}`);
                let hrefLower = s.href.toLowerCase();
                if (hrefLower.endsWith(urlLower)) {
                    return s;
                }
            }
            else {
                console.log('href null: ', s);
            }
        }
        return null;
    }

    //=========================================================================
    static removeExternalStyleSheet(url: string) {
        let styleSheet = this.findLinkedExternalCss(url);
        if (styleSheet !== null) {
            if (styleSheet.ownerNode && styleSheet.ownerNode.parentNode) {
                styleSheet.ownerNode.parentNode.removeChild(styleSheet.ownerNode);
            }
            else {
                throw Error("styleSheet.ownerNode.parentNode is null"); //, styleSheet);
            }
        }
        else {
            throw Error("external stylesheet not found :" + url);
        }
    }

    // removejscssfile(filename, filetype){
    //     var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" //determine element type to create nodelist from
    //     var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" //determine corresponding attribute to test for
    //     var allsuspects=document.getElementsByTagName(targetelement)
    //     for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
    //     if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
    //         allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
    //     }
    // }
    //=========================================================================
    static isExternalStyleSheetLinked(url: string) {
        let css: StyleSheet | null = this.findLinkedExternalCss(url);
        return css !== null;
    }

    //=========================================================================
    static async loadExternalStyleSheet(srcUrl: string) {
        //document.head.insertAdjacentHTML( 'beforeend', '<link rel=stylesheet href=/ext.css>' );
        if (this.isExternalStyleSheetLinked(srcUrl)) {
            console.log("already linked: " + srcUrl);
            return; //-------------------------------------
        }
        //document.createStyleSheet('http://server/style-facebook.css'); //IE
        let linkEl = document.createElement("link");
        linkEl.rel = "stylesheet";
        linkEl.type = "text/css";
        linkEl.href = srcUrl;

        if (False) {
            let styles = "@import url('http://server/file1.css');"; //@import './my-commonjs-misc.scss';
            linkEl.href = 'data:text/css,' + escape(styles); //"@import%20url%28%27http%3A//server/file1.css%27%29%3B" //space = %20
        }
        //elt.classList
        //document.getElementsByTagName("head")[0].appendChild(element);
        document.head.appendChild(linkEl);
        let p = new Promise<void>((resolve, reject) => {
            linkEl.onload = (ev: Event) => {
                console.log("style loaded: " + srcUrl);
                resolve();
            };
            linkEl.onerror = (ev: any) => {
                console.log("style err: " + ev);
                reject();
            };
        });
        return p;
    }
    //=======================================================================
    // static async loadStyle(srcUrl: string) {
    //     let linkEl = document.createElement("link");
    //     linkEl.href = srcUrl;
    //     linkEl.charset = "utf-8";
    //     linkEl.rel = "stylesheet";
    //     document.head.appendChild(linkEl);
    //     let p = new Promise<void>((resolve, reject) => {
    //         linkEl.onload = (ev: Event) => {
    //             console.log("style loaded: " + srcUrl);
    //             resolve();
    //         };
    //     });
    //     return p;
    // }

}
