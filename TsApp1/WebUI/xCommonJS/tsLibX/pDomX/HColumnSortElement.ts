
export class HColumnSortElementCollection {
    colHeaderRowElt: HTMLElement;
    sortCols: HColumnSortElement[];

    constructor(colHeaderRowElt: HTMLElement) {
        this.colHeaderRowElt = colHeaderRowElt;
        this.sortCols = [];
    }
    //=========================================================================
    toggleSortDirection(parentContainerElt: HTMLElement, sortDir?: string): HColumnSortElement {
        let ret: HColumnSortElement | undefined;
        this.sortCols.forEach(sc => {
            if (sc.parentContainerElt === parentContainerElt) {
                if (sortDir) {
                    sc.show(sortDir);
                }
                else {
                    sc.toggleSortDirection();
                }
                ret = sc;
            }
            else {
                sc.hide();
            }
        });
        if (!ret) {
            throw Error("nto found elmg for coL: " + getTagNameIDClass(parentContainerElt));
        }
        return ret;
    }
    //=========================================================================
    hideAll() {
        let ret: HColumnSortElement | undefined;
        this.sortCols.forEach(sc => {
            sc.hide();
        });
    }

    //=========================================================================
    createColumnSortElt(parentContainerElt: HTMLElement, fieldName: string) {
        let se = new HColumnSortElement(parentContainerElt, fieldName);
        this.sortCols.push(se);
        return se;
    }
}

//=========================================================================
export class HColumnSortElement {
    parentContainerElt: HTMLElement;
    static sortIconContainerClassName = "sortedIconContainer";
    iconContainer: HTMLElement;

    constructor(parentContainerElt: HTMLElement, fieldName: string) {
        this.parentContainerElt = parentContainerElt;
        this.iconContainer = document.createElement("span");
        this.iconContainer.className = HColumnSortElement.sortIconContainerClassName;
        this.iconContainer.dataset.fieldName = fieldName;
        //this.iconContainer.dataset.sortedDir = "ASC";
        parentContainerElt.appendChild(this.iconContainer);
    }
    static find(parentEltOrSelector: string | HTMLElement) {
        let parentElt = qs(parentEltOrSelector);
        let elt = qs("." + this.sortIconContainerClassName, parentElt);
        let ret = new HColumnSortElement(parentElt, elt.dataset.fieldName + "");
        return ret;
    }
    get sortedDir() {
        let ret = this.iconContainer.dataset.sortedDir + "";
        return ret;
    }
    set sortedDir(sortedDir: string) {
        if (sortedDir !== "ASC" && sortedDir !== "DESC") {
            throw Error("invalid sortDir: " + sortedDir);
        }
        this.iconContainer.dataset.sortedDir = sortedDir;
    }

    getSortReversedDir() {
        let iconContainer = this.iconContainer;
        let sortedDir = iconContainer.dataset.sortedDir;
        let newSortDir: string;
        if (sortedDir === "ASC") {
            newSortDir = "DESC";
        }
        else {
            newSortDir = "ASC";
        }
        return newSortDir;
    }

    get fieldName() {
        let ret = this.iconContainer.dataset.fieldName + "";
        return ret;
    }

    //=========================================================================
    toggleSortDirection() {
        let newSortDir = this.getSortReversedDir();
        this.show(newSortDir);
    }

    //=========================================================================
    show(newSortDir?: string) {
        let iconContainer = this.iconContainer;

        let sortDir: string | undefined;
        if (newSortDir) {
            newSortDir = newSortDir.toUpperCase();
            if (newSortDir !== "ASC" && newSortDir !== "DESC") {
                throw Error("invalid sortDir: " + newSortDir);
            }
            sortDir = newSortDir;
        }
        else {
            if (iconContainer.dataset.sortedDir) {
                sortDir = iconContainer.dataset.sortedDir;
            }
            else {
                sortDir = "ASC";
            }
        }
        let icon = document.createElement("i");

        let st = icon.style;
        st.color = "black";
        st.fontSize = "0.8em";
        st.fontWeight = "normal";
        st.marginLeft = "1px";

        if (sortDir === "ASC") {
            icon.className = "fas fa-arrow-up";
        }
        else {
            icon.className = "fas fa-arrow-down";
        }
        this.sortedDir = sortDir;
        iconContainer.dataset.sortedTime = Date.now() + "";
        console.log("iconContainer sorted", iconContainer);
        iconContainer.innerHTML = "";
        iconContainer.appendChild(icon);
    }
    hide() {
        this.iconContainer.innerHTML = "";
    }
}
