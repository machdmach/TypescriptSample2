import '../xCommon/initWeb_3p.js';
import { AppInit, AppLib, AppPage, ConfigX, GlobalErrorHandler, LocationUrl, MessageBox, ResourseFetcher, SideNavBar as DevSideNavBar, StatusBar } from '../xCommon/tsLib/tsLibPkg.js';
import { crawlWebsite } from './WebsiteCrawler.js';

//=======================================================================
windowExt.onDOMContentLoaded(function () {
    GlobalErrorHandler.init();
    main().catch((err: any) => {
        GlobalErrorHandler.HandleErrorFromMain(err);
    });
});

//=========================================================================
async function main() {
    //DevHelpPage.isInitDevPage = false;
    StatusBar.disable();
    document.body.style.display = "unset";

    // let f = Function("return import.meta.url;");
    // let url = f();
    //console.log("import.meta", import.meta.url);
    //console.info("url=" + url);

    await AppInit.init("NetApps");
    DevSideNavBar.init(null);
    //AppMenu.setupHamburgerMenuButton();

    //FiaTest1();
    //MessageBox.showAlert("asdf13");

    if (LocationUrl.pathContains("Crawler/WebPageInfo")) {
        await crawlWebsite();
    }

    //await ThreadX.sleep(3000);
    document.documentElement.style.backgroundColor = "unset";

    //<script src='http://localhost:4141/NetApps/cs/build/NetApps/mainNetApps.js?ts=260458640' type='module'></script>

    //
    let el1 = await ResourseFetcher.fetchHtmlCreateElement(AppLib.getResourceUrl("WebUI/xCommon/assets/aaTest1.html"))
    //MessageBox.showInfo(el1);
    AppPage.prependToPageContent(el1);

    //MessageBox.showInfo("This is a sample Info MessageBox: " + ConfigX.clientSideBaseUrl);
    await AppInit.postInit();
}
