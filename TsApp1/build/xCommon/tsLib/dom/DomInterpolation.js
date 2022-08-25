import { StringInterpolation } from "../core/StringInterpolation.js";
import { NodeTree } from "./NodeTree.js";
import { ConfigX } from "./ConfigX.js";
//#domeInt
export class DomInterpolation2 {
    constructor(rootElt) {
        this.interpolableElts = [];
        if (rootElt) {
            let interpolateHTMLElts = qsMany('.interpolateHTML', 0, 100, rootElt);
            interpolateHTMLElts.forEach(elt => {
                this.addNode(elt, true);
            });
            let textNodes = qsMany('.interpolateDescendantTextNodes, .interpolateText', 0, 100, rootElt);
            textNodes.forEach(baseNode => {
                NodeTree.traverseTree(baseNode, (node) => {
                    if (interpolateHTMLElts.includes(node)) {
                        return false;
                    }
                    else if (node.nodeType === Node.TEXT_NODE) {
                        let tc = node.textContent;
                        if (tc && tc.length > 2 && tc.indexOf('{') >= 0) {
                            this.addNode(node);
                        }
                        return false;
                    }
                    else {
                        return true;
                    }
                });
            });
        }
    }
    //=========================================================================
    static interpolateTextContent(elt, data) {
        let s = elt.textContent + "";
        let si = new StringInterpolation(s);
        elt.textContent = si.evaluateWith(data);
    }
    //=========================================================================
    addNode(elt, isInterpolatingHTML = false) {
        if (this.interpolableElts.some(e => e.node === elt)) {
            return; //already included
        }
        let s;
        if (isInterpolatingHTML) {
            if (elt instanceof HTMLElement) {
                s = elt.innerHTML;
            }
            else {
                throw Error("elt is not HTML Element");
            }
        }
        else {
            s = elt.textContent + "";
        }
        let si = new StringInterpolation(s);
        if (si.hasPlaceHolderExpressions()) {
            let ent = {
                node: elt,
                interpolator: si,
                isInterpolatingHTML: isInterpolatingHTML
            };
            this.interpolableElts.push(ent);
        }
    }
    //=========================================================================
    expandWithDataObject(data) {
        for (const ent of this.interpolableElts) {
            let expanded = ent.interpolator.evaluateWith(data);
            if (ent.isInterpolatingHTML) {
                if (ent.node instanceof HTMLElement) {
                    let htmlElt = ent.node;
                    htmlElt.innerHTML = expanded;
                }
                else {
                    throw "not html elt";
                }
            }
            else {
                ent.node.textContent = expanded;
                if (ConfigX.isLocalDebug) {
                    ent.node.textContent = expanded; // + "--tc";
                }
            }
        }
    }
}
