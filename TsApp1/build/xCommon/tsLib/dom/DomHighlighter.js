import { CreateEl } from './CreateEl.js';
export class DomHighlighter {
    static hiliteText(text, options = {}) {
        //let options = optionsP || {};
        var _a, _b, _c;
        let newText = (_a = options.newText) !== null && _a !== void 0 ? _a : text;
        let bgColor = (_b = options.bgColor) !== null && _b !== void 0 ? _b : this.defaultHiliteBgColor;
        let hiliteCount = 0;
        /* tslint:disable:no-bitwise */
        let treeWalker = document.createTreeWalker((_c = options.rootNode) !== null && _c !== void 0 ? _c : document.body, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_DOCUMENT_FRAGMENT, //tslint:disable:no-bitwise doesn't work here
        {
            acceptNode: (node) => {
                if (node instanceof HTMLSpanElement && node.classList.contains(this.hilitedClassName)) {
                    //node1.tagName === "span"
                    return NodeFilter.FILTER_REJECT; //child nodes are also rejected.
                    //return NodeFilter.FILTER_SKIP; //NodeFilter.FILTER_SKIP = "skip this node but not its children".
                }
                else if (node instanceof HTMLOptionElement ||
                    node instanceof HTMLInputElement ||
                    node instanceof HTMLTextAreaElement) {
                    return NodeFilter.FILTER_REJECT; //child nodes are also rejected.
                }
                else if (node.nodeType !== node.TEXT_NODE) {
                    return NodeFilter.FILTER_SKIP; //NodeFilter.FILTER_SKIP = "skip this node but not its children".
                }
                else {
                    return NodeFilter.FILTER_ACCEPT;
                }
            }
        });
        /* tslint:enable:no-bitwise */
        let nodeList = [];
        if ("walk the tree") {
            let node = treeWalker.currentNode;
            while (node !== null) {
                node = treeWalker.nextNode();
                if (node) {
                    nodeList.push(node);
                }
            }
        }
        nodeList.forEach((node) => {
            var _a;
            if (node.nodeType === node.TEXT_NODE) {
                let tc = node.textContent;
                if (tc && tc.includes(text)) {
                    console.log("found Text: " + tc);
                    let sa = tc.split(text);
                    let saLength = sa.length;
                    let fr = document.createDocumentFragment();
                    for (let i = 0; i < saLength; i++) {
                        const subStr = sa[i];
                        if (subStr.length > 0) {
                            fr.appendChild(document.createTextNode(subStr));
                        }
                        if (i < saLength - 1) { //except the last subStr
                            hiliteCount++;
                            let hiliteElt = CreateEl.span_c(this.hilitedClassName, newText);
                            hiliteElt.style.backgroundColor = bgColor;
                            if (options.color) {
                                hiliteElt.style.color = options.color;
                            }
                            let elTitle = `Ocurrence #${hiliteCount}`;
                            if (text !== newText) {
                                elTitle += ", was: " + text;
                            }
                            fr.appendChild(hiliteElt);
                        }
                    }
                    (_a = node.parentElement) === null || _a === void 0 ? void 0 : _a.replaceChild(fr, node);
                }
            }
        });
        return hiliteCount;
    }
}
DomHighlighter.hilitedClassName = "dom-hilited";
DomHighlighter.defaultHiliteBgColor = "yellow";
