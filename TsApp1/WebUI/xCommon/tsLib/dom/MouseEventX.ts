import { StringBuilder } from '../tsLibPkg.js';

export class MouseEventX {

    toString(e: MouseEvent): string {

        const buf = new StringBuilder();
        buf.appendLine(`ctrlKey ${e.ctrlKey}`);
        buf.appendLine(`altKey ${e.altKey}`);
        //this.addProp`altKey ${e.altKey}`;

        return buf.toString();
    }

    //=========================================================================
    static getMouseDirection_test1() {
        let bodyElement = qs("body");
        bodyElement.addEventListener("mousemove", this.getMouseDirection.bind(MouseEventX), false);
        //useCapture(default=false) (capturing vs bubbling),this listener will receive event before underneath the DOM tree nodes
        //
    }
    static getMouseDirection(e: MouseEvent) {
        // var bodyElement = document.querySelector("body");
        // bodyElement.addEventListener("mousemove", getMouseDirection, false);

        let xDirection = "";
        let yDirection = "";

        let oldX = window.innerHeight / 2;
        let oldY = 0;

        //deal with the horizontal case
        if (oldX < e.pageX) {
            xDirection = "right";
        } else {
            xDirection = "left";
        }

        //deal with the vertical case
        if (oldY < e.pageY) {
            yDirection = "down";
        } else {
            yDirection = "up";
        }

        oldX = e.pageX;
        oldY = e.pageY;

        console.log(xDirection + " " + yDirection);
    }
}

export class EventX {
    //=========================================================================
    toString(e: Event): string {
        const buf = new StringBuilder();
        return buf.toString();
    }
    static test1() {
        //https://javascript.info/dispatch-events
        let ev = new Event("click");
        let elt = qs("x");
        elt.dispatchEvent(ev);
        ev.stopImmediatePropagation();
        ev.stopPropagation();
        let prev = ev.defaultPrevented;

        let isRealUserClicked: boolean = ev.isTrusted;
        let mouseEvent = new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            clientX: 100,
            clientY: 100,
        });
    }
}
