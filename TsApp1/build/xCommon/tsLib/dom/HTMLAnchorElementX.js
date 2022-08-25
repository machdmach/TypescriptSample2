//https://css-tricks.com/how-to-disable-links/
export class HTMLAnchorElementX {
    static init() {
        document.body.addEventListener('click', function (event) {
            // filter out clicks on any other elements
            let elt = event.target;
            if (!elt)
                throw "never";
            if (elt.nodeName === 'A' && elt.getAttribute('aria-disabled') === 'true') {
                event.preventDefault();
            }
        });
    }
    //=========================================================================
    resetTargetAttribute(link) {
        link.setAttribute('aria-disabled', 'true');
        let elts = document.getElementsByTagName("a");
        if (elts) {
            for (let i = 0; i < elts.length; i++) {
                let elt = elts[i];
                if (elt.href && elt.href.toLowerCase().includes("/maps?")) {
                    elt.target = "_self";
                }
            }
        }
    }
    //=========================================================================
    disableLink(link) {
        if (!link.parentElement)
            throw "never";
        // 1. Add isDisabled class to parent span
        link.parentElement.classList.add('isDisabled');
        // 2. Store href so we can add it later
        link.setAttribute('data-href', link.href);
        // 3. Remove href
        link.href = '';
        // 4. Set aria-disabled to 'true'
        link.setAttribute('aria-disabled', 'true');
    }
    //=========================================================================
    enableLink(link) {
        if (!link.parentElement)
            throw "never";
        // 1. Remove 'isDisabled' class from parent span
        link.parentElement.classList.remove('isDisabled');
        // 2. Set href
        let hrefStored = link.getAttribute('data-href');
        if (!hrefStored) {
            hrefStored = "#";
        }
        link.href = hrefStored;
        // 3. Remove 'aria-disabled', better than setting to false
        link.removeAttribute('aria-disabled');
    }
}
