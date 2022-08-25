import { ResourseFetcher } from "../dom/ResourceFetcher.js";

export class IncludeHTML {

    //<div data-include-html="shared/section1.html"></div>
    //<div ng-if="mySiteName=='myiuhealth'" ng-include="'/shared/partials/abc.html'"></div>
    //<div class="header-content ng-hide" ng-show="!isPrintReceipt()">

    static attrName: string = "data-include-html";
    static includeHtmlCount = 0;

    static async processDirective_IncludeHtml() {
        const elts = document.querySelectorAll(`[${this.attrName}]`);
        for (let i = 0; i < elts.length; i++) {
            const includeElt = elts.item(i) as HTMLLIElement;
            const eltID = includeElt.id;
            if (eltID === 'header' || eltID === 'footer') {
                if (qsNullable(eltID) != null) {
                    includeElt.id = eltID + '_alreadyDefined';
                    continue; //footer/header already defined, skip this.
                }
            }
            const dataIncludeHtmlAttr = includeElt.getAttribute(this.attrName);
            if (dataIncludeHtmlAttr) {
                await ResourseFetcher.fetchHtml_toHTMLElementSelector(includeElt, dataIncludeHtmlAttr);
            }
        }//end for
    }
}
