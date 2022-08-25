
export class RangeX {

    static appendTo(range: Range, el: Element) {
        let elParent = el.parentNode;
        range.surroundContents(el);
        if (elParent) {
            elParent.appendChild(el);
        }
    }
}