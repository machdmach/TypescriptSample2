import { StringBuilder } from "../core/StringBuilder.js";

export class NodeX {
    static test1() {
        let textNode: Text = document.createTextNode("nodeValue1");
        //Node - CharacterData(Text, Comment, ProcessingInstruction) - Text (Text is not Element which has tagName)

    }
    static toStr(elt: Element, isDebug: boolean = false): string {
        let buf: StringBuilder = new StringBuilder();

        let rval = buf.toString();
        if (isDebug) {
            console.log('FormData.toStr', elt, rval);
        }

        return rval;
    }
    //=========================================================================
    static insertBefore(newNode: Node, refChild: Node) {
        let parentNode = refChild.parentNode;
        if (parentNode === null) {
            throw Error("parent node is null");
        }
        else {
            parentNode.insertBefore(newNode, refChild);
        }
    }
    //=========================================================================
    static insertAfter(newNode: Node, referenceNode: Node) {
        let parentNode = referenceNode.parentNode;
        if (parentNode === null) {
            throw Error("parent node is null");
        }
        else {
            parentNode.insertBefore(newNode, referenceNode.nextSibling);
        }
    }
}
