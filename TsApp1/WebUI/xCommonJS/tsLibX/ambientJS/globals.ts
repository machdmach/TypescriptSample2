window.windowBag = window; // as any;
if (!windowBag.ext) {
    windowBag.ext = {};
}
windowBag.windowExt = windowBag.ext;
windowBag.windowExtBag = windowBag.ext;

//=======================================================================
windowBag.uninit = new Object(); // Symbol('uninitialized var desc1');
windowBag.uninitString = Symbol('uninitialized string'); // if (var1 === uninitString)
windowBag.uninitNumber = Symbol('uninitialized number'); // if (var1 === uninitNumber)

windowBag.emptyFunc = function () { };
windowBag.lastUIEvent = uninit;
windowBag.myGlobalUIEventHandler = function (ev: Event) {
    console.log("#myGlobalUIEventHandler, ev=", ev);
    windowBag.lastUIEvent = ev;
};

//=======================================================================
if (true) {
    let alreadyExecutedBag = new Set();
    windowBag.alreadyExecuted = function (targetName: string): boolean {
        if (targetName.length > 41) {
            throw new Error("name len is GT 41, len=" + targetName.length);
        }
        if (alreadyExecutedBag.has(targetName)) {
            return true;
        }
        else {
            if (alreadyExecutedBag.size > 100) {
                throw new Error("too many items, GT 100");
            }
            alreadyExecutedBag.add(targetName);
            return false;
        }
    };
}

//=======================================================================
windowBag.Config = {};
windowBag.config = windowBag.Config;
windowBag.db = false;
windowBag.False = false;
windowBag.True = true;
windowBag.TrueTodo = true;

//=======================================================================
if (true) {
    let log: any = {};
    windowBag.log = log;
    let logInfoCount = 0;
    log.info = function info(caller: any, mesg: any) {
        if (typeof caller === "string") {
            mesg = caller + mesg;
        }
        else {
            if (caller.debugging === false) {
                return;
            }
        }
        mesg = logInfoCount + ": " + mesg;
        console.log(mesg);
        logInfoCount++;
    };
}

//=======================================================================
windowExtBag.onDOMContentLoaded = function (callbackFn: any) {
    console.log('document.readyState', document.readyState);

    // DOMContent should be loading right now, but `DOMContentLoaded` may fire before
    // your script has a chance to run, so check before adding a listener
    if (document.readyState === "loading") {
        //loading,
        document.addEventListener("DOMContentLoaded", callbackFn);
    }
    else if (document.readyState === "interactive") {
        //interactive: DOMContentLoaded about to fire, images, stylesheetgs, and frames are still loading

        //callbackF(document.readyState);
        document.addEventListener("DOMContentLoaded", callbackFn);
    }
    else { //document.readyState === "complete"
        //`DOMContentLoaded` already fired, load event is about to fire or already fired.
        callbackFn(document.readyState);
    }
};
//=======================================================================
window.addEventListener("DOMContentLoaded", e => {
    console.log('window/document DOMContentLoaded event fired', e);
});
window.addEventListener("load", e => {
    console.log('window load event fired, document.readyState', document.readyState); //document.readyState=complete
    //console.log('windowExtBag keys', Object.keys(windowExt));
});

//=======================================================================
windowExtBag.scriptLoaded = (src: any) => {
    console.log('---script loaded', src);
};

//#getTagNameIDClass# =========================================================================
windowBag.getTagNameIDClass = function (eltOrSelector: Element | string | null | undefined) {
    let ret = "";
    if (typeof (eltOrSelector) === 'undefined') {
        ret = "undefined";
    }
    else if (eltOrSelector === null) {
        ret = "null";
    }
    else if (typeof eltOrSelector === "string") {
        ret = eltOrSelector;
    }
    else {
        ret = eltOrSelector.tagName;
        if (eltOrSelector.id) {
            ret += "#" + eltOrSelector.id;
        }
        if (eltOrSelector.className) {
            ret += "." + eltOrSelector.className;
        }
    }
    ret = `selector[${ret}]`;
    return ret;
};

//#getSelectorShortInfo# =========================================================================
windowBag.getSelectorShortInfo = function (selector: string | HTMLElement, parent?: HTMLElement | null): string {
    let ret = getTagNameIDClass(selector);
    if (parent) {
        ret += " in parent: " + getTagNameIDClass(parent);
    }
    return ret;
};
//#qsFirstOrDefault# =======================================================================
windowBag.qsFirstOrDefault = function (selector: string, parent?: HTMLElement | null): Element | null {
    let arr = qsAll(selector, parent);
    let ret: Element | null;
    if (arr.length > 0) {
        ret = arr[0];
    }
    else {
        ret = null;
    }
    return ret;
};

//#qs# =======================================================================
windowBag.qs = function (selector: string | Node, parent?: HTMLElement | null): HTMLElement {
    if (typeof (selector) !== "string") {
        return selector as HTMLElement;
    }
    if (parent === undefined || parent === null) {
        parent = document.body;
    }
    let rval = qsNullable(selector, parent);

    if (rval == null) {
        let errMesg = "No element found for " + getSelectorShortInfo(selector, parent);
        let otherPlaces = qsAll(selector, document.body);
        if (otherPlaces && otherPlaces.length > 0) {
            errMesg += `, <br>but found in document.body count` + otherPlaces.length;
        }
        errMesg += `, <br>make sure prefix dot.for class and # for id`;
        //console.trace("parent: ", parent);
        throw Error(errMesg);
    }
    return rval;
};

//#qsInputElement# =======================================================================
windowBag.qsInputElement = function (selector: string | HTMLElement, parent?: HTMLElement | null): HTMLInputElement {
    let ret = qs(selector, parent);
    if (!(ret instanceof HTMLInputElement)) {
        throw Error(getSelectorShortInfo(selector, parent) + " is not instanceof HTMLInputElement, but instanceof " + ret);
    }
    return ret;
};
//#qsClosest# =========================================================================
windowBag.qsClosest = function (selector: string, child: HTMLElement): HTMLElement {
    let rval = child.closest(selector);
    if (rval == null) {
        let errMesg = "No element found for selector: " + selector + ", make sure prefix dot. for class and # for id";
        console.error(errMesg, child);
        throw Error(errMesg);
    }
    return rval as HTMLElement;
};
//#qsParent# =========================================================================
windowBag.qsParent = function (selectorOrElt: string | Node): HTMLElement {
    let elt = qs(selectorOrElt);
    let parentElt = elt.parentElement;
    if (parentElt == null) {
        throw Error("No Parent found for elt " + selectorOrElt);
    }
    return parentElt; // as HTMLElement;
};
//#qsAll# =======================================================================
windowBag.qsAll = function (selector: string, parent: HTMLElement): Element[] { //NodeListOf<Element> {
    //query a single node
    if (!selector) {
        throw Error("Argument selector is blank" + selector);
    }
    let elts;
    if (parent === null) {
        throw Error('invalid arg, parent is null');
    }
    if (parent === uninit) {
        throw Error('invalid arg, parent is uninit');
    }

    if (parent === undefined) {
        elts = document.querySelectorAll(selector);
    }
    else {
        if (!parent.querySelectorAll) {
            let t: string;
            console.error(t = 'parent.zzquerySelectorAll is undefined, ', parent);
            throw Error(t);
        }
        else {
            elts = parent.querySelectorAll(selector);
        }
    }
    let arr = Array.from(elts);
    return arr;
};
//#qsMany# =======================================================================
windowBag.qsMany = function (selector: string, min: number = 0, max: number = 999, parent?: HTMLElement | null): HTMLElement[] {
    min = min || 0;
    max = max || 999;
    let elts = qsAll(selector, parent);
    const eltsLen = elts.length;
    if (eltsLen < min) {
        throw Error(`${eltsLen} elements found, expect at least ${min}, ` + getSelectorShortInfo(selector, parent));
    } else if (eltsLen > max) {
        throw Error(`${eltsLen} elements found, expect at most ${max}, ` + getSelectorShortInfo(selector, parent));
    }
    const arr = Array.from(elts) as HTMLElement[];
    return arr;
};
//#qsChildAll# =======================================================================
windowBag.qsChildAll = function (selector: string, parent: HTMLElement): HTMLElement[] {
    if (!parent) {
        throw Error('invalid arg, parent is null or undefined');
    }
    let elts = Array.from(qsAll(selector, parent));
    let children = parent.children;
    let rval: HTMLElement[] = [];
    for (let i = 0; i < children.length; i++) {
        let child = children[i] as HTMLElement;
        if (elts.includes(child)) {
            rval.push(child);
        }
    }
    return rval;
};

//#qsNullable# =======================================================================
windowBag.qsNullable = function (selector: string, parent?: HTMLElement | null): HTMLElement | null {
    //query a single node or null if not found
    let elts = qsAll(selector, parent);
    const eltsLen = elts.length;
    if (eltsLen === 0) {
        return null;
    } else if (eltsLen > 1) {
        throw Error(`Too many elements, ${eltsLen}, found for ` + getSelectorShortInfo(selector, parent));
    }
    return elts[0] as HTMLElement;
};

//#qsChildNullable# =======================================================================
windowBag.qsChildNullable = function (selector: string, parent: HTMLElement): HTMLElement | null {
    //query a single node or null if not found
    let elts = qsChildAll(selector, parent);
    const eltsLen = elts.length;
    if (eltsLen === 0) {
        return null;
    } else if (eltsLen > 1) {
        throw Error(`Too many elements, ${eltsLen}, found for selector: ` + selector);
    }
    return elts[0] as HTMLElement;
};

//#qsChild# =======================================================================
windowBag.qsChild = function (selector: string, parent: HTMLElement): HTMLElement {
    let rval = qsChildNullable(selector, parent);
    if (rval == null) {
        throw Error("No element found for selector: " + selector + ', make sure prefix dot. for class and # for id');
    }
    return rval;
};

windowBag.Deno = {};
windowBag.Deno.noColor = false;
