import { DevLib } from "./DevLib.js";

export class DevDisplayCount {
    count: number = 0;
    lbCounterElt = uninit as HTMLElement;

    run() {
        if (alreadyExecuted("DevDisplayCount.run")) return;

        if (this.count === 0) {
            console.log('DisplayCount starts running');
        }
        let e = this.lbCounterElt;
        let count = this.count;
        if (e === uninit) {
            e = document.createElement("span");
            e.className = "clsDisplayCount";
            document.body.appendChild(e);
            e.addEventListener('click', () => {
                DevLib.showServerDebugInfo();
            });
        }
        let text = (count < 10 ? "0" : "") + count;
        text += ", Elts:" + document.querySelectorAll("*").length;
        text += ", jqDialogs:" + document.querySelectorAll("div.ui-dialog").length;
        e.textContent = text;

        if (!"flashy screen") {
            e.style.fontSize = (count < 1) ? '500pt' : '14pt'; //
        }

        setTimeout(() => {
            this.run();
        }, (count === 0) ? 200 : 1000);
        //}
        count++;
        if (count > 600) {
            count = 1;
        }
        this.lbCounterElt = e;
        this.count = count;
    }
}
