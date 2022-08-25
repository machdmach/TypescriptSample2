
/*
innerHeight: clientHeight includes the height and vertical padding.
outerHeight: offsetHeight = clientHeight + borders.
scrollHeight includes the height of the contained document (would be greater than just height in case of scrolling), vertical padding, and borders.

To get the element’s width and height that include padding and border, you use the offsetWidth and offsetHeight properties of the element.
To get the element’s width and height that include padding but without the border, you use the clientWidth and clientHeight properties.

To get the margin of an element, you use the getComputedStyle() method:
--
let box = document.querySelector('.box');
let style = getComputedStyle(box);
--
let marginLeft = parseInt(style.marginLeft);
let marginRight = parseInt(style.marginRight);
let marginTop = parseInt(style.marginTop);
let marginBottom = parseInt(style.marginBottom);

To get the height and width of the window, you use the following code:
--
let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

Image dimensions are the length and width of a digital image
*/

export class ElementMeasurementLib {
}
export class ElementDimensionsLib {

    static getHeight_eg1(element: HTMLElement) {
        let tempEl = element.cloneNode(true) as HTMLElement;
        tempEl.style.visibility = "hidden";
        tempEl.style.position = "absolute";

        document.body.appendChild(tempEl);

        let height = tempEl.offsetHeight + 0;
        document.body.removeChild(tempEl);

        tempEl.style.visibility = "visible";

        return height;
    }

    //=========================================================================
    static getOuterWidth(el: HTMLElement) {
        let width = el.offsetWidth; //offsetWidth includes the border
        const style = getComputedStyle(el);

        let totalMargin = parseInt(style.marginLeft, 10) + parseInt(style.marginRight, 10);
        width += totalMargin;
        return width;
    }
    //=========================================================================
    static getOuterHeight_px(el: Element): string {
        return this.getOuterHeight(el) + "px";
    }
    static getOuterHeight(el: Element): number {
        let elt = el as HTMLElement;
        let height = elt.offsetHeight;
        const style = getComputedStyle(el);

        let totalMargin = parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10);
        height += totalMargin;
        return height;
    }

}
