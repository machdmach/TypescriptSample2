
export class ImageSliderUsingCSS {
    src: string[];
    el: HTMLElement;
    viewingIndex = 0;
    intervalTimeout = 3000;

    constructor(selector: string) {
        this.src = [
            "https://www.mccarran.com/FSWeb/assets/VGT/images/jumbotron/VGT-slider-1920X384.jpg",
            "https://www.mccarran.com/FSWeb/assets/VGT/images/jumbotron/VGT-slider10-1920X384.jpg",
        ];
        this.el = qs(selector);
    }
    intervalHandle: number = -1;

    //=========================================================================
    start() {
        this.loadNext();
        this.intervalHandle = window.setInterval(() => {
            this.loadNext();
        }, this.intervalTimeout);
    }
    stop() {
        window.clearInterval(this.intervalTimeout);
    }
    //=========================================================================
    loadCount = 0;
    loadNext(fileName?: string) {
        if (this.loadCount++ > 100) {
            throw Error("loadCount over 100");
        }
        if (fileName === undefined) {
        }
        let nextElement = this.src[this.viewingIndex];

        this.rebuild(nextElement, (function (_el) {
            return function () {
                // Fade Image in
                //document.querySelectorAll(".active")[0].style.left = "0px";
                //qs(".active")[0].style.left = "0px";
            };
        })(this.el));

        this.viewingIndex++;
        if (this.viewingIndex > this.src.length - 1) {
            this.viewingIndex = 0;
        }
    }
    //=========================================================================
    rebuild(src: string, callback: Function) {
        let el = this.el;
        let imgNode = document.createElement("img");
        imgNode.onload = function () {
            /* When the new Image is loaded, scroll the one already there
               to the left. The new Image slides to the left at the same time,
               creating a smooth transition. */

            let firstImgElt = el.firstChild as HTMLElement;
            if (firstImgElt) { //childNodes.length > 1) {

                firstImgElt.classList.remove("active");
                /* Once the fading image has scrolled out of view completely, it
                   has to be removed before the next loadNext() starts. */

                // TODO dirty hax for IE < 9
                firstImgElt.addEventListener("transitionend", function () {
                    console.log("transitionend", firstImgElt);

                    let parentNode = this.parentNode;
                    if (!parentNode) {
                        //throw Error("parentNode is null");
                        console.log("parentNode is null");

                    }
                    else {
                        parentNode.removeChild(this);
                    }
                }); //, false);

                let leftx = "-" + el.offsetWidth + "px";
                let left = "-2930px";
                //console.log(left === "-1930px");

                //firstImgElt.style.left = "-" + el.offsetWidth + "px";
                //left = "-1930px";
                firstImgElt.style.left = left;
                //firstImgElt.style.left = "-1930px";
                console.log("firstImgElt.style.left", firstImgElt.style.left);

            }
            //callback();
        };
        //imgNode.setAttribute("class", "imageslider-img active");
        //imgNode.setAttribute("style", "display: block;width: 100%;height: auto;top: 0;bottom: 0;left: 0;right: 0;margin: auto;position:
        //                               absolute;transition:left .75s ease;" + "left:" + el.offsetWidth + "px;");

        imgNode.style.left = el.offsetWidth + "px;";

        imgNode.setAttribute("src", src);
        el.appendChild(imgNode);
        imgNode.style.left = "0px";
    }
}
