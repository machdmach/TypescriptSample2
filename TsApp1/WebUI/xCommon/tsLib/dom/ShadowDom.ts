import { ResourseFetcher } from "./ResourceFetcher.js";

export class ShadowDom {

  static attachShadow(selector: string, innerHTML: string) {
    let elt = qs(selector);
    let srInit: ShadowRootInit = { mode: "open" };
    let sr: ShadowRoot = elt.attachShadow(srInit);
    sr.innerHTML = innerHTML;
    //angular: ViewEncapsulation.Native/Emulate/None
  }

  //=========================================================================
  static async attachShadowFromUrl(selector: string, templateUrl: string, cssUrl?: string) {
    let elt = qs(selector);
    let srInit: ShadowRootInit = { mode: "open" };
    let sr: ShadowRoot = elt.attachShadow(srInit);

    let templateHtml = await ResourseFetcher.fetchText(templateUrl);
    if (cssUrl) {
      let cssRules = await ResourseFetcher.fetchText(cssUrl);
      cssRules = "<style>\n" + cssRules + "</style>\n";
      templateHtml = cssRules + templateHtml;
    }
    sr.innerHTML = templateHtml;
  }

  //=========================================================================
  eg1() {
    // if (document.body.attachShadow) {
    // }
    let sh = qs("#sh1");
    let h = document.querySelector("#sh1");
    if (h !== null) {
      let srInit: ShadowRootInit = { mode: "open" };
      let sr = h.attachShadow(srInit);
      //console.log("shadowRoot", h.shadowRoot);

      let e1 = document.createElement("p");
      e1.textContent = "elt created inside shadow dom";

      sr.appendChild(e1);

      sr.innerHTML = `
      <style>
        p {
          color: pink;
          font-size:20pt;
        }
      </style>
    add
      <p>Element with Shadow DOM</p>
    `;

    }
    let newiframe = document.createElement("iframe");
    newiframe.srcdoc = '<h1>aa</h1>';
    //newiframe.src = 'data:text/html;charset=UTF-8,' + content;

    let elm = qs("#form1");
    //selectElementContents(elm);
    let ha: HTMLTextAreaElement = document.createElement("textarea") as HTMLTextAreaElement;
    if (ha) {
      ha.select();
    }

    //let body = qs("body");

    //ElementX.selectElementContents(document.body);

    if ("") {
    }
    //let sd = qs("#insideSH");
    //console.log("sd", sd);

    //customElements.define()

  }

}
