export class DomLib {
    static getNextZIndex() {
        let rval = this.currentZIndex++;
        return rval.toString();
    }
    static generateUniqueID(prefix) {
        //#generateID, #id, #autogen
        let rval;
        if (prefix) {
            rval = prefix + this.currentUniqueID++;
        }
        else {
            rval = "uid" + this.currentUniqueID++;
        }
        rval = rval + "_generated";
        return rval;
    }
    //=========================================================================
    static scrollToBottom() {
        //document.documentElement  === <html> elt or whatever the rootElt in non-empty XML document
        const elt = (document.scrollingElement || document.body);
        elt.scrollTop = elt.scrollHeight;
        elt.scrollLeft = elt.scrollWidth;
    }
    //=========================================================================
    static fixElementsForActivity(act, rootElt) {
        console.log('fixElementsForActivity: ' + act);
        //act = "," + act + ",";
        act = act.toLocaleLowerCase();
        //<div class='fRow has-data' data-if-activities='add'>
        let elts = qsAll("[data-if-activities]", rootElt);
        for (let elt of elts) {
            let acts = elt.dataset.ifActivities;
            if (acts === undefined) {
                continue;
            }
            //acts = acts.trim();
            acts = acts.replace(/[ ]+/, ",");
            acts = acts.toLocaleLowerCase();
            acts = "," + acts + ",";
            let remove;
            if (acts.length === 0) {
                remove = false;
            }
            else if (acts.includes(",*,")) {
                remove = false;
            }
            else if (acts.includes(",!" + act + ",")) { // add,!edit,edit
                remove = true;
            }
            else if (acts.includes("!")) { //!add
                remove = false;
            }
            else if (!acts.includes("," + act + ",")) { //
                remove = true;
            }
            else {
                remove = false;
            }
            //------
            if (remove) {
                console.log('removing elt: ' + elt.className + ", data-if-activities=" + acts);
                elt.remove();
            }
            else {
                console.log('NOT removing elt: ' + elt.className + ", data-if-activities=" + acts);
            }
        } //end for
    }
    //=========================================================================
    addchildToRoot(tagName, className, parentElt) {
        let elt = document.createElement(tagName);
        elt.classList.add(className);
        parentElt.appendChild(elt);
        return elt;
    }
}
//=========================================================================
DomLib.currentZIndex = 111;
DomLib.currentUniqueID = 1;
