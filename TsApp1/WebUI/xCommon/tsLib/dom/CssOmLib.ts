import { ConfigX } from "../tsLibPkg.js";

//https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model
/*
External style sheet
Internal style sheet
Inline style
*/
export class CssOmLib {
    static devicePixelRatio() {
        let mqString = `(resolution: ${window.devicePixelRatio}dppx)`;

        const updatePixelRatio = () => {
            let pr = window.devicePixelRatio;
            let prString = (pr * 100).toFixed(0);
            let dispElt = qs(".pixel-ratio");
            dispElt.innerText = `${prString}% (${pr.toFixed(2)})`;
        };
        updatePixelRatio();
        window.matchMedia(mqString).addEventListener("change", updatePixelRatio);
    }
    //=========================================================================
    static getStyleRule(selectorText: string, styleElt: HTMLStyleElement, errorMesgOnNotFound?: string) {
        if (!errorMesgOnNotFound) {
            errorMesgOnNotFound = `No css Rule found for selectorText: ${selectorText} in style element with id: ${styleElt.id}`;
        }
        let ret = this.getStyleRuleNullable(selectorText, styleElt, errorMesgOnNotFound);
        if (ret === null) throw "never";
        return ret;
    }
    //=========================================================================
    static getStyleRuleNullable(targetSelectorText: string, styleElt: HTMLStyleElement, errorMesgOnNotFound?: string) {
        //let targetSelectorTextLower = targetSelectorText.toLowerCase();
        let styleSheet = styleElt.sheet as CSSStyleSheet;
        let ruleList: CSSRuleList = styleSheet.cssRules;
        let ret: CSSStyleRule | null = null;
        for (let i = 0; i < ruleList.length; i++) {
            let rule: CSSRule = ruleList[i];

            if (rule.type === CSSRule.STYLE_RULE) {
                let styleRule = rule as CSSStyleRule;
                let cssText: string = styleRule.cssText;
                let selectorText: string = styleRule.selectorText;

                //selectorText = selectorText.trim();
                if (selectorText.includes(",")) {
                    //"foo, bar,,foobar,".split(/[\s,]+/) returns ["foo", "bar", "foobar", ""]
                    let arr = selectorText.split(/\s*,\s*/);
                    for (let j = 0; j < arr.length; j++) {
                        let s = arr[j];
                        if (s === targetSelectorText) {
                            //if (s.toLowerCase() === targetSelectorTextLower) {
                            ret = styleRule;
                            break;
                        }
                    }
                }
                else {
                    if (selectorText === targetSelectorText) {
                        //if (selectorText.toLowerCase() === targetSelectorTextLower) {
                        ret = styleRule;
                        break;
                    }
                }

                // let pattern = styleRuleSelectorText + "\\b";
                // pattern = pattern.replace(/\./g, "\\.");

                // if (/^w/.test(styleRuleSelectorText)) {
                //     pattern = "\\b" + pattern;
                // }
                // else {
                //     //pattern = "\\b" + pattern;
                // }

                // let pattern = "[\\b]?" + styleRuleSelectorText + "\\b";  //#regex
                // console.log(`pattern: ${pattern}, selectorText: ${selectorText}`);
                // let regex: RegExp = new RegExp(pattern, "i");
                // if (regex.test(selectorText)) {
                //     ret = styleRule;
                //     break;
                // }
            }
        }
        if (ret === null && errorMesgOnNotFound !== undefined) {
            throw Error(errorMesgOnNotFound);
        }
        return ret;
        //styleSheet.insertRule()
    }

    static test1() {

        if (ConfigX.isLocalDev) {
            let elts = qsAll(".localDevOnly");
            elts.forEach(e => {
                if ("isLocalDev") {
                    //e.classList.add("displayNone-important");
                    e.style.display = "block";
                }
                else {
                    e.style.display = "block";
                }
                e.style.display = "block !important";

                e.style.setProperty("display", "block", "important");
                //e.classList.remove("localDevOnly");
                //console.log("disp: " + e.style.display, e);

                //e.style.cssText.display = "block !important";
            });
        }

        if ("X") return;

        let elt = document.createElement("div");
        // Get the color value of .element:before
        let color = window.getComputedStyle(elt, ':before').getPropertyValue('color');

        // Get the content value of .element:before
        let content = window.getComputedStyle(elt, ':before').getPropertyValue('content');
        //if ("x") return;
        let styleEl = document.createElement('style');
        document.head.appendChild(styleEl);

        let st = styleEl.sheet as CSSStyleSheet;
        if (!st) throw "?";
        //st.insertRule(".sel", st.cssRules.length);
        let sszz = document.styleSheets[0] as CSSStyleSheet;
        //st.cssRules[0]
        let internal1 = qs("#internalStyleSheet1", document.head);

        // ss.parentStyleSheet.
        // .addRule(selector, `content: "${value}";`);

        //myStyle.insertRule('#blanc { color: white }', 0);  //to top of the list
    }
    /*
function removeIfExists(class_name)
{
    ...
    var styleRef = styleTag.sheet ? styleTag.sheet : styleTag.styleSheet;
    var len = styleRef.cssRules ? styleRef.cssRules.length : styleRef.rules.length;
    if(styleRef.rules){ //all browsers except IE 9-
        for(i=len;i>0;i--)
        {
                if (styleRef.cssRules[i-1].selectorText === "." + class_name+":hover" ||styleRef.cssRules[i-1].selectorText === "." + class_name )
                styleRef.deleteRule(i-1);
        }
    }
    ......
    .....firstrule.style.color="red"
    }
    return styleRef;
}
*/

}
