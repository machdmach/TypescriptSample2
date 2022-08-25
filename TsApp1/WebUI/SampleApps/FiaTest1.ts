import '../xCommon/initWeb.js';
import { ConfigX, HTableData, HTMLElementOverlay, Matrix, MOutput, ResourseFetcher } from '../xCommon/tsLib/tsLibPkg.js';

//D:\ws\ts2\WebUIx\Apps\FiaTest1.js
export async function FiaTest1() {

    let url = "https://apps.fs.usda.gov/fiadb-api/fullreport?pselected=Artificial%20regen%20species&rselected=Forest%20Service%20Region&cselected=Condition%20proportion&snum=6&sdenom=59&wc=312020";
    MOutput.ahref(url);

    //get the html text of the page and set it to an html element.
    let wsEl = await ResourseFetcher.fetchHtml_toHTMLElementSelector("#tempWorkspace1", url);

    if (!"stopHere") {
        wsEl.style.display = "unset";
        return;
    }

    //Get the html table
    let pivotEl = qsFirst(".dataframe.evalidTabs") as HTMLTableElement;
    //MOutput.pre(pivotEl);
    MOutput.appendChild(pivotEl);

    //Read text data from html table
    let pivotData = HTableData.readData(pivotEl);
    //MOutput.div(HTableData.toHtml(pivotData));

    //unpivot the data
    let unpivotData = Matrix.unpivot(pivotData);
    unpivotData[0][0] = "";

    //Output the unpivoted data
    MOutput.html("h3", "unpivoted:");
    MOutput.appendChild(HTableData.toHtml(unpivotData));
    if (ConfigX.isMediaScreenMobile) {
    }
}
