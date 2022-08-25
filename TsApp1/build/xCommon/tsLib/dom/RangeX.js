export class RangeX {
    static appendTo(range, el) {
        let elParent = el.parentNode;
        range.surroundContents(el);
        if (elParent) {
            elParent.appendChild(el);
        }
    }
}
