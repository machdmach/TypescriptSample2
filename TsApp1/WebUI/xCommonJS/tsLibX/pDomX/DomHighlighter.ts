import { CreateEl } from './CreateEl.js';

interface DomHighlighterOptions {
    newText?: string; znewText?: string;
    bgColor?: string; zbgColor?: string;
    color?: string; zColor?: string;
    rootNode?: HTMLElement;
}
export class DomHighlighter {
    static hilitedClassName = "dom-hilited";
    static defaultHiliteBgColor = "yellow";

    static hiliteText(text: string, options: DomHighlighterOptions = {}) {
        //let options = optionsP || {};

        let newText = options.newText ?? text;
        let bgColor = options.bgColor ?? this.defaultHiliteBgColor;

        let hiliteCount = 0;

        /* tslint:disable:no-bitwise */
        let treeWalker = document.createTreeWalker(
            options.rootNode ?? document.body,
            NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_DOCUMENT_FRAGMENT, //tslint:disable:no-bitwise doesn't work here
            {
                acceptNode: (node: Node) => {
                    if (node instanceof HTMLSpanElement && node.classList.contains(this.hilitedClassName)) {
                        //node1.tagName === "span"
                        return NodeFilter.FILTER_REJECT; //child nodes are also rejected.
                        //return NodeFilter.FILTER_SKIP; //NodeFilter.FILTER_SKIP = "skip this node but not its children".

                    }
                    else if (
                        node instanceof HTMLOptionElement ||
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
            }
        );
        /* tslint:enable:no-bitwise */

        let nodeList: Node[] = [];
        if ("walk the tree") {
            let node: Node | null = treeWalker.currentNode;
            while (node !== null) {
                node = treeWalker.nextNode();
                if (node) {
                    nodeList.push(node);
                }
            }
        }

        nodeList.forEach((node: Node) => {
            if (node.nodeType === node.TEXT_NODE) {
                let tc = node.textContent;
                if (tc && tc.includes(text)) {
                    console.log("found Text: " + tc);

                    let sa = tc.split(text);
                    let saLength = sa.length;
                    let fr: DocumentFragment = document.createDocumentFragment();
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
                    node.parentElement?.replaceChild(fr, node);
                }
            }
        });
        return hiliteCount;
    }
}
