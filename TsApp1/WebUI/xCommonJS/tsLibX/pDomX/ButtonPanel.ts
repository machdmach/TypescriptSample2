export class ButtonPanel {
    _buttonPaneElt!: HTMLElement; //: HTMLFormElement;

    constructor(parentContainer?: HTMLElement) {
        if (parentContainer) {
            this.setParentContainer(parentContainer);
        }
    }

    get buttonPaneElt() {
        if (!this._buttonPaneElt) {
            throw Error("Invalid op, setParentContainer() needs to be called first");
        }
        return this._buttonPaneElt;
    }

    //=========================================================================
    setParentContainer(parentContainer: HTMLElement) {
        console.log("parentContainer of ButtonPanel is: " + getTagNameIDClass(parentContainer));

        let pane = qsNullable('.dialogx-button-pane', parentContainer);
        if (pane === null) {
            pane = document.createElement("div");
            pane.className = "dialogx-button-pane";
            parentContainer.appendChild(pane);
        }
        this._buttonPaneElt = pane;
    }

    //=========================================================================
    addButton(btnText: string, onClick?: Function): HTMLButtonElement {
        let btnElt: HTMLButtonElement = document.createElement("button");
        btnElt.setAttribute("type", "button");
        btnElt.innerHTML = btnText;

        if (onClick !== emptyFunc) {
            btnElt.addEventListener('click', (ev: MouseEvent) => {
                //ev.preventDefault();
                //ev.cancelBubble = true;
                if (onClick === undefined) {
                    //?this.close();
                }
                else {
                    onClick(ev);
                }
            });
        }
        this.buttonPaneElt.appendChild(btnElt);
        return btnElt;
    }

    //=========================================================================
    addButtonSubmitPrimary(btnText: string, onClick?: Function): HTMLElement {
        let btnElt = this.addButton(btnText, onClick) as HTMLButtonElement;
        btnElt.className = 'btnx btnx-primary';
        //btnElt.type = "submit";
        btnElt.setAttribute("type", "submit");

        return btnElt;
    }
    //=========================================================================
    addButtonPrimary(btnText: string, onClick?: Function): HTMLElement {
        let btnElt = this.addButton(btnText, onClick) as HTMLButtonElement;
        btnElt.className = 'btnx btnx-primary';
        return btnElt;
    }

    addButtonDanger(btnText: string, onClick?: Function): HTMLElement {
        let btnElt = this.addButton(btnText, onClick);
        btnElt.className = 'btnx btnx-danger';
        return btnElt;
    }
    addButtonWarning(btnText: string, onClick?: Function): HTMLElement {
        let btnElt = this.addButton(btnText, onClick);
        btnElt.className = 'btnx btnx-warning';
        return btnElt;
    }
    addButtonInfo(btnText: string, onClick?: Function): HTMLElement {
        let btnElt = this.addButton(btnText, onClick);
        btnElt.className = 'btnx btnx-info';
        return btnElt;
    }

    //=========================================================================
    getButton(btnSelector: string) {
        if (!btnSelector.startsWith(".")) {
            throw Error("btnSelector must start with a period (.) for className");
        }
        let rval = qsNullable(btnSelector, this.buttonPaneElt);
        if (rval === null) {
            let availButtons = "";
            this.getButtons().forEach((btn: HTMLElement) => { availButtons += "[." + btn.className + "], "; });
            throw Error(`no button found for selector ${btnSelector}, available buttons are: ${availButtons}`);
        }
        return rval;
    }

    //=========================================================================
    getButtons() {
        let ret: HTMLButtonElement[] = [];
        let nodeList = this.buttonPaneElt.querySelectorAll("button");
        nodeList.forEach(e => {
            ret.push(e);
        });
        return ret;
    }
    //=========================================================================
    clearButtons() {
        this.buttonPaneElt.innerHTML = "";
    }
    //=========================================================================
    hide() {
        this.buttonPaneElt.style.display = "none";
    }

}
