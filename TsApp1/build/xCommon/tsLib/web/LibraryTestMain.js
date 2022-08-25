import { DocumentX, HColumnSortElementCollection, HTMLElementOverlay, HtmlEntity, HTMLGridBuilder, HTMLTableBuilder, MessageBox, AppLocalStorage, NodeTree, RegExpr, ResourseFetcher, StatusBar, StringInterpolation, StringX, TimedThrottleJobQueue } from "../tsLibPkg.js";
export class LibraryTestMain {
    //=========================================================================
    static async runTests() {
        // var fixed: any = {};
        // Object.preventExtensions(fixed);
        // fixed.newProp = 'ohai'; // throws a TypeError
        // var obj1: any = {};
        // Object.defineProperty(obj1, 'x', { value: 42, writable: false });
        // obj1.x = 9; // throws a TypeError
        // var undefined = 5;
        //delete Object.prototype; // throws a TypeError
        //console.assert(false, "aa");
        let hrefLower = location.href.toLowerCase();
        this.handleDialogTests();
        if (hrefLower.includes('zz-icon'))
            MessageBox.showInfo(HtmlEntity.test());
        if ("x")
            HTMLElementOverlay.tests();
        if ("")
            TimedThrottleJobQueue.Tests();
        if ("")
            this.HTMLGridBuilder_test1();
        if ("")
            NodeTree.grep_tests();
        if ("")
            AppLocalStorage.test1();
        if ("")
            HTMLTableBuilder.tests();
        if ("")
            StringX.format_tests();
        if ("")
            RegExpr.exec_tests();
        if ("")
            StringInterpolation.test1();
        if ("")
            StatusBar.test1();
        if ("")
            await ResourseFetcher.loadImageBlob(document.body, "flowers.jpg");
        if ("")
            DocumentX.createDummyDivs(100, qs("main"));
        //if ("") PrintDocument.test1();
        //if ("") MyObservable.test1();
        // setTimeout(() => {
        //     tc.egz();
        //     let d = MomentX.newInstance(); console.log("fs342", d);
        // }, 1000);
        if ("") {
            if (alreadyExecuted("x123"))
                return;
            console.log("this should runx");
            if (alreadyExecuted("x123"))
                return;
            throw "This should never be reached";
        }
        // window.addEventListener("load", function () {
        //     //alert('sadfsd');
        // });
        if ("") {
            windowExtBag.MutationObserverX.observeSelector('body');
        }
        window.onhashchange = function () {
            console.log("onhashchange event fired: location.hash=" + location.hash);
        };
        console.log("window.onhashchange registered");
        // import * as React from 'react';
        // import * as ReactDOM from 'react-dom';
        //import * as React from 'react';
        //import * as React from 'react-dom/node_modules/@types/react';
        // class Hello extends React.Component {
        //     render() {
        //         // let p = props as any;
        //         // return React.createElement('div', null, `Hello ${p.toWhat}`);
        //     }
        // }
        if ("")
            await ResourseFetcher.loadImageBlob(document.body, "flowers.jpg");
        //?.isValidASCIIOnlyData_test();
    }
    //=========================================================================
    static HTMLGridBuilder_test1() {
        //if ("x") return;
        //if (window.matchMedia('ss').matches)
        let g = new HTMLGridBuilder();
        // g = new HTMLGridBuilder("table");
        //g.tab.setAttribute("border", "1");
        g.tab.className = "serpGrid";
        g.tab.style.width = "800px";
        g.tab.style.margin = "auto";
        let headerRow = g.addHeaderRow(); //.style.display = "flex";
        headerRow.className = "serpHeaderRow";
        let h1 = g.createCell("headerCell1 ", "confirmNo");
        let h2 = g.createCell("headerCell2 ", "arrDate");
        h1.dataset.fieldName = "ReservationID";
        let gSort = new HColumnSortElementCollection(headerRow);
        gSort.createColumnSortElt(h2, "f1");
        for (let i = 0; i < 5; i++) {
            g.addDataRow();
            if (true) {
                gSort.createColumnSortElt(h1, "f2");
                g.addCell("cellx" + i, h1);
            }
            g.addCell("celly" + i, h2);
        }
        gSort.toggleSortDirection(h2);
        gSort.toggleSortDirection(h2);
        g.addDataRow();
        g.addCell("c2", " c2last     class2 ");
        g.addCell("c2x", " c2last     class2 ");
        //console.log("tab=" + g.toHtml());
        document.body.insertBefore(g.getTableElement(), document.body.firstChild);
        //document.body.insertBefore(g.tbody, document.body.firstChild);
        //document.body.insertBefore(g.thead, document.body.firstChild);
        //document.body.insertBefore(document.createTextNode(g.toHtml()), document.body.firstChild);
        // let se = new HColumnSortElement(h1);
        // let se2 = new HColumnSortElement(h2);
        // se.show();
        // se.hide();
        // //se.show();
        // se2.show("asC");
        // //se.show();
    }
    //=========================================================================
    static async handleDialogTests() {
        if ("") {
            //let userInput = await MessageBox.showPrompt("Please type \"delete\" to delete this record.");
            let userInput = MessageBox.showAlert("1, Alert,  Are you sure to delete this record zzzzzzzzzzzzzzz zz .");
            let userInput2 = await MessageBox.showConfirm("2, Confirm, Are you sure to delete this record.");
            MessageBox.showAlert("3, Alert, Are you sure to delete this record zzzzzzzzzzzzzzz zz .");
            MessageBox.showInfo("4, Info, FYI");
            MessageBox.showUserError("5 user error");
        }
        let hrefLower = location.href.toLowerCase();
        if (!hrefLower.includes("zz-"))
            return; //--------------------------
        let showAllDialogs = hrefLower.includes("zz-dialogs");
        if (hrefLower.includes('zz-help') || showAllDialogs) {
            //not implemented to avoid circular dependency
        }
        if (hrefLower.includes('zz-test') || showAllDialogs) {
            //not implemented to avoid circular dependency
        }
        if (hrefLower.includes('zz-info') || showAllDialogs) {
            MessageBox.showInfo("testing info");
        }
        if (hrefLower.includes('zz-showdialogs')) {
            MessageBox.showInfo("testing info");
        }
        if (hrefLower.includes('zz-alert') || showAllDialogs) {
            MessageBox.showAlert("testing alert");
        }
        if (hrefLower.includes('zz-confirm') || showAllDialogs) {
            MessageBox.showConfirm("testing confirm");
        }
        if (hrefLower.includes('zz-warn') || showAllDialogs) {
            MessageBox.showAlert("testing warn");
        }
        if (hrefLower.includes('zz-error') || showAllDialogs) {
            MessageBox.showUserError("testing error, this is a very long line.  use zz-boxes to show all", "err");
        }
    }
}
