import '../xCommon/initWeb.js';
import { AppInit, AppLib, AppPage, ConfigX, HTMLElementOverlay, JElt, LocationUrl, MessageBox, MOutput, Randomizer, ThreadX } from '../xCommon/tsLib/tsLibPkg.js';

class DownloadStatus {
    count!: number;
    downloadNumber!: number
    downloadTotal!: number
    fileName!: string;
    folderName!: string;
    url!: string;
    static toStr(stat: DownloadStatus) {
        let ret = `${stat.downloadNumber}/${stat.downloadTotal}: Downloading: ${stat.url}\n To: ${stat.folderName}, file: ${stat.fileName}`;
        console.log(ret);
        return ret;
    }
}
//=========================================================================
export async function crawlWebsite() {
    ConfigX.initDataApiUrlBase("api/Crawler/");
    await AppInit.getConfigFromDataApiSvc();

    let rootElt = JElt.createRoot("div");
    let f = rootElt.createForm();
    let row: JElt;

    let url = LocationUrl.searchParams.getNullable("url");
    if (url === null) {
        url = "http://doadocs.mccarran.com/dsweb/View/Collection-34";
        url = "https://apps.fs.usda.gov/DATIM/Default.aspx";
        //url = "http://doadocs.mccarran.com/dsweb/View/Collection-36832: errors April 2007 LAS Listing (jpg images, eg: 14324-3.jpg)
        url = "https://www.usda.gov/policies-and-links";
        url = "http://doadocs.mccarran.com/dsweb/View/Collection-36998"; //OK, September 2006 LAS
        url = "http://doadocs.mccarran.com/dsweb/View/Collection-36930";  //Aerotech Aerials 2007-08 (folders by months. eg: April 2007 LAS)
    }

    let urlInputEl = f.createInput("baseUrl");
    MOutput.ahref(url);
    urlInputEl.attr("value", url);

    f.createBr(1);
    f.createButton("Get Indexed Text");
    f.createButton("Get Html Source"); //.el.style.marginLeft = "10px";
    f.createButton("Get AHrefs"); //.el.style.marginLeft = "10px";
    f.createBr(1);

    row = f.createRow();
    let downloadPathInputEl = row.createInputFieldCell("downloadPath", "Download Path: C:\\temp\\", "folder1");

    row = f.createRow();
    let downloadCB = row.createCheckbox("DownloadConfirmed", "Download");
    //downloadCB.el.setAttribute("checked", "true");
    let recursiveCB = row.createCheckbox("IsRecursive", "Recursive");
    row.createBr(1)

    row = f.createRow();
    let downloadEl = row.createRow().createButton("Download User Files");

    downloadEl.attr("type", "button").el.addEventListener("click", async () => {
        let form = qs(".formx") as HTMLFormElement;
        let formData = new FormData(form);
        let crawlerID = Randomizer.generateGUID();
        formData.append("crawlerID", crawlerID);

        let pauseTime = 1000;
        let statusCount = 0;

        let ol = HTMLElementOverlay.showOverlay("Downloading files");

        let timerId = setInterval(async () => {
            let statusClient = AppLib.newDataApiClient("");
            let stat = await statusClient.getPayload("GetDownloadStatus?crawlerID=" + crawlerID) as DownloadStatus;
            stat.count = ++statusCount;
            let statStr = DownloadStatus.toStr(stat);
            ol.setText(statStr);
        }, pauseTime);

        try {
            let client = AppLib.newDataApiClient("");
            let res = await client.postPayload("WebPageInfo/downloadUserFiles", formData);
            AppPage.setPageContent(res);
        }
        // catch (err) {
        //     clearInterval(timerId);
        //     await MessageBox.showAlert("err: " + err);
        // }
        finally {
            clearInterval(timerId);
            await ol.hideWithDelay(1000);
        }
        //await MessageBox.showAlert("done");
    });
    //HTMLElementOverlay.tests();

    f.createBr(1);
    qsMany("button", 3, 10, f.el).forEach(e => { e.style.marginRight = "10px"; });

    f.createChild("div", "htmlText").innerText(f.el.outerHTML);

    JElt.qs("main").prependChild(f);

    //get the html text of the page and set it to an html element.
    //let wsEl = await ResourseFetcher.fetchHtml_toHTMLElementSelector("#tempWorkspace1", url);

    if (LocationUrl.searchParams.containsKey("dl")) {
        await ThreadX.sleep(100);
        downloadEl.el.click();
    }
    //MessageBox.showInfo("websiteCrawler done");
}
