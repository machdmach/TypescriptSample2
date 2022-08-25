export class MutationObserverX {
    static observeSelector(selector) {
        const targetNode = qs(selector);
        console.log('observing node: ', targetNode);
        const config = { attributes: true, childList: true, subtree: true };
        const observer = new MutationObserver((mutationsList, observr) => {
            //console.log('================================================== observed ');
            //this.showTotalNodes();
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    //console.log('A child node has been added or removed.', mutation);
                    let addedNodes = mutation.addedNodes;
                    let removedNodes = mutation.removedNodes;
                    let totalNodesLen = document.querySelectorAll('*').length;
                    console.log(`=========== observed, added/removed=${addedNodes.length}/${removedNodes.length} total nodes count: ${totalNodesLen}`);
                }
                else if (mutation.type === 'attributes') {
                    //console.log('The ' + mutation.attributeName + ' attribute was modified.');
                }
                else if (mutation.type === 'characterData') {
                    //console.log('The ' + mutation.attributeName + ' attribute was modified.');
                }
                else {
                    throw Error('unknown mutation.type: ' + mutation.type);
                }
            }
        });
        observer.observe(targetNode, config);
        //observer.disconnect();
    }
    //=========================================================================
    static showTotalNodes() {
        console.log('=========== observed, total nodes count: ', document.querySelectorAll('*').length);
    }
}
MutationObserverX.debug = false;
//=========================================================================
//document.getElementsByTagName('*').length
//var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
function MutationObserver1() {
    const list = qs('ol', document.body);
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type === 'childList') {
                const list_values = [].slice.call(list.children)
                    .map(function (node) { return node.innerHTML; })
                    .filter(function (s) {
                    if (s === '<br>') {
                        return false;
                    }
                    else {
                        return true;
                    }
                });
                console.log(list_values);
            }
        });
    });
    observer.observe(list, {
        attributes: true,
        childList: true,
        characterData: true,
    });
}
windowExtBag.MutationObserverX = MutationObserverX;
