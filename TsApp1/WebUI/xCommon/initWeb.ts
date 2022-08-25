import './tsLib/ambient/globals.js';
import './tsLib/dom/ConfigX.js';
import './tsLib/dom/ConfigX.js'; //calling twice OK, no effect

import { ConfigX } from './tsLib/dom/ConfigX.js';
import { CreateEl } from './tsLib/dom/CreateEl.js';

if (ConfigX.isLocalDev) {
    if (ConfigX.isRunningOnWebpackDevServer) {
        //addWebpackForAutoReloading
        //<script src="/webpackEntryBundle.js"></script>
        let el = CreateEl.script_p(document.head, "/webpackEntryBundle.js");
        //script.charset = "utf-8";
        el.async = false;
        el.defer = false;
    }
    else if ("add aspnet AutoReloading") {
        let el = CreateEl.script_p(document.head, "http://localhost:4141/NetApps/cs/build/xCommon/tsLib/web/PageAutoReloader.js");
        el.type = "module";
    }
}
else if (location.hostname.startsWith("beta")) {
    //remote
    //let el = CreateEl.script_p(document.head, "https://www.mccarran.com/FSWeb/assets/PubSitesClientSide/WebUIx/xCommonJS/tsLibX/pWebAppX/PageAutoReloader.js"); el.type = "module";
}
//windowBag.serverSideBag = new KeyedBag(windowBag.server_side_bag);
//serverSideBag.