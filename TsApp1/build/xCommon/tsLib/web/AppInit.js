import { ConfigX } from "../dom/ConfigX.js";
import { AppMenu, IncludeHTML, StatusBar } from "../tsLibPkg.js";
import { AppCurrentUser } from "./AppCurrentUser.js";
import { AppLib } from "./AppLib.js";
import { AppPage } from "./AppPage.js";
import { DevLib } from "./DevLib.js";
import { DxLib } from "./DxLib.js";
import { LibraryTestMain } from "./LibraryTestMain.js";
export class AppInit {
    static async init(appName) {
        ConfigX.init(appName);
        if (alreadyExecuted("AppInit.init"))
            return;
        if (ConfigX.isLocalDebug) {
            //Run dev task for local debugging, webapack reload...
            await DevLib.RunDevTasks();
        }
        DevLib.processEnvTags();
        AppPage.setupUnimplemented_onClicked();
    }
    //=========================================================================
    static async postInit() {
        if (alreadyExecuted("AppInit.postInit"))
            return;
        await DxLib.handle_zzStuff();
        if (ConfigX.isLocalhost && location.href.includes("zz-libtest")) {
            await LibraryTestMain.runTests();
        }
    }
    //=========================================================================
    static async initAll() {
        if (alreadyExecuted("AppInit.initAll"))
            throw "dkwokd";
        Config.isUsingJQueryDialog = true;
        console.log('... BoottstrappingFuncs.ts, {Config}=', Config);
        ConfigX.init(ConfigX.appName);
        await AppInit.getConfigFromDataApiSvc();
        await AppInit.init("appAll"); //----------------------
        AppPage.SetDocumentTitle(ConfigX.appName);
        await IncludeHTML.processDirective_IncludeHtml();
        AppMenu.setupHamburgerMenuButton();
        AppPage.fixHyperLinks();
        AppPage.setPageFooterOnBottom();
        AppPage.populateBasicInfo();
        StatusBar.init(null);
        StatusBar.setText("Application  loaded");
        await AppInit.postInit(); //----------------------
    }
    //=========================================================================
    static async getConfigFromDataApiSvc() {
        var _a;
        if (alreadyExecuted("AppInit.getConfigFromDataApiSvc"))
            return;
        const api = AppLib.newDataApiClient("getDataSvcInfo?zxThrow");
        const svcInfo = await api.getPayloadWithBusyMesg("Loading DataSvcInfo");
        console.log('DataSvcInfo', svcInfo);
        AppCurrentUser._username = svcInfo.username;
        let roles = (_a = svcInfo.userRoles) !== null && _a !== void 0 ? _a : "";
        AppCurrentUser._userRoles = roles.toLocaleLowerCase();
        ConfigX._publicFacingUrlRoot = svcInfo.publicFacingUrlRoot;
        ConfigX._dbEnv = svcInfo.dbEnv;
        ConfigX.DataApiVersion = svcInfo.apiVersion;
    }
}
