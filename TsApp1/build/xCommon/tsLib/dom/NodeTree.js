export class NodeTree {
    constructor(elt) {
        this.containerElt = elt;
    }
    setTextContentFor(selector, textContent) {
        let elt = qs(selector, this.containerElt);
        elt.textContent = textContent;
        return elt;
    }
    //=========================================================================
    static getDescendantNodes(node, accum) {
        //Usage: getDescendants( document.querySelector("#main") );
        accum = accum || [];
        for (let i = 0; i < node.childNodes.length; i++) {
            accum.push(node.childNodes[i]);
            this.getDescendantNodes(node.childNodes[i], accum);
        }
        return accum;
    }
    //=========================================================================
    static getDescendantTextNodes(node, accum) {
        //node.textContent = Text Node, node.nodeValue, also content of the Comment node
        accum = accum || [];
        for (let i = 0; i < node.childNodes.length; i++) {
            if (node.nodeType === node.TEXT_NODE) {
                accum.push(node.childNodes[i]);
            }
            else {
                //Text node has no children anyway.
                this.getDescendantTextNodes(node.childNodes[i], accum);
            }
        }
        return accum;
    }
    //=========================================================================
    static traverseTree(node, callback) {
        let callbackRes = callback(node);
        if (callbackRes === false) {
            return;
        }
        if (node.hasChildNodes()) {
            let childNodes = node.childNodes;
            for (let i = 0, len = childNodes.length; i < len; ++i) {
                let childNode = childNodes[i];
                this.traverseTree(childNode, callback);
            }
        }
    }
    //=========================================================================
    static grep(parentNode, pattern) {
        let matches = [];
        let endScan = false;
        this.traverseTree(parentNode, function (node) {
            if (endScan) {
                return false;
            }
            // Ignore anything which isn't a text node
            if (node.nodeType !== Node.TEXT_NODE) {
                //node.nodeName =="#text"
                return false;
            }
            let textContent = node.textContent;
            if (textContent && textContent.length > 0) {
                if (typeof pattern === "string") {
                    if (textContent.indexOf(pattern) !== -1)
                        matches.push(node);
                }
                else if (pattern.test(textContent)) {
                    matches.push(node);
                    if (!pattern.global) {
                        endScan = true;
                    }
                }
            }
            return true;
        });
        return matches;
    }
    //=========================================================================
    static grep_tests() {
        setTimeout(() => {
            let typos = ["teh", "adn", "btu", "adress", "youre", "Local", "More"];
            //let pattern = new RegExp("\\b(" + typos.join("|") + ")\\b", "gi");
            let pattern = "More";
            let mistakes = this.grep(document.body, pattern);
            console.log("grepResult", mistakes);
            if (mistakes.length > 0) {
                console.log("grepResult0.nodeValue", mistakes[0].nodeValue);
            }
        }, 1000);
    }
}
