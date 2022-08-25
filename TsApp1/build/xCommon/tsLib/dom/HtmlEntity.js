//https://www.compart.com/en/unicode/category/So
//https://unicode-table.com/en/sets/check/
//https://unicode-table.com/en/sets/star-symbols/
//http://xahlee.info/comp/unicode_arrows.html
//https://unicode-table.com/en/1F5D9/
//https://www.vertex42.com/ExcelTips/unicode-symbols.html#emoticons
export class HtmlEntity {
    static get arrowBackElement() {
        let el = this.createEl("&#129092;"); //129044
        el.style.fontWeight = "bold";
        return el;
    }
    static get arrowForwardElement() {
        // let iconElt = document.createElement("i");
        // iconElt.className = "material-icons";
        // iconElt.textContent = "arrow_forward";
        //return iconElt;
        //return "<span> &#10140; </span>"; //➜
        let el = this.createEl("&#129094;"); //&#10140; &#10142;
        el.style.fontWeight = "bold";
        return el;
    }
    static get busyElement() {
        //&#x21bb;  hex
        //let text = "&#128472;";
        let text = "&#8635;";
        let el = this.createEl(text);
        el.className = "busyIcon1";
        //el.style.fontSize = "60pt";
        return el;
    }
    static get searchElement() {
        return this.createEl("&#x1F50E;&#xFE0E;");
    }
    //=========================================================================
    static createEl(htmlText) {
        let el = document.createElement("span");
        el.innerHTML = htmlText;
        return el;
    }
    //=========================================================================
    static decode(str) {
        let txt = document.createElement('textarea');
        txt.innerHTML = str;
        return txt.value;
    }
    static get checkmarkElement() {
        //https://unicode-table.com/en/sets/check/
        let el = this.createEl("&check;");
        el.style.fontWeight = "bold";
        el.style.fontSize = "30pt";
        return el;
    }
    static get checkmarkHeavyElement() {
        let el = this.createEl("&#x2714;");
        el.style.fontWeight = "bold";
        el.style.fontSize = "30pt";
        return el;
    }
    static get crossElement() {
        //https://unicode-table.com/en/sets/check/
        let el = this.createEl("&cross;");
        el.style.fontWeight = "bold";
        el.style.fontSize = "30pt";
        return el;
    }
    static get crossHeavyBallotXElement() {
        //https://unicode-table.com/en/sets/check/
        let el = this.createEl("&#x2718;");
        el.style.fontWeight = "bold";
        el.style.fontSize = "30pt";
        return el;
    }
    static get infoElement() {
        let el = this.createEl("&#x1F6C8;");
        el.style.fontWeight = "bold";
        el.style.fontSize = "30pt";
        return el;
    }
    //css: ::before { content: '\xxxx';
    //=========================================================================
    static test() {
        //let div = CreateEl.div_p(document.body.firstElementChild);
        let div = document.createElement("div");
        div.appendChild(this.arrowForwardElement);
        div.appendChild(this.arrowBackElement);
        div.appendChild(this.busyElement);
        div.appendChild(this.checkmarkElement);
        div.appendChild(this.checkmarkHeavyElement);
        div.appendChild(this.crossElement);
        div.appendChild(this.crossHeavyBallotXElement);
        //ban, circled division slash: U+2298
        //stop, circled dash: U+229D
        //WaringSign: 0x26A0
        let el = this.createEl("&plus; ban: &#x2298; stop: &#x229D; warning: &#x26A0; info: &#x1F6C8;   &quest;  &#x003F;  &#x2753;   ");
        el.style.fontWeight = "bold";
        el.style.fontSize = "30pt";
        el.style.color = "red";
        div.appendChild(el);
        let t = document.createElement("span");
        t.textContent = "asdsdfsdf";
        t.style.lineHeight = "30pt";
        div.appendChild(t);
        // for (let x: any of IconLib) {
        // }
        return div;
    }
}
