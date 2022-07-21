import '../xCommonJS/initWeb.js';
import { AppInit, DevLib, GlobalErrorHandler, MessageBox, StatusBar, ThreadX } from '../xCommonJS/tsLibX/tsLibPkg.js';

//Register DOMContentLoaded event handler.
windowExt.onDOMContentLoaded(function () {
    GlobalErrorHandler.init();
    main().catch((err: any) => {
        GlobalErrorHandler.HandleErrorFromMain(err);
    });
});

//=========================================================================
/**
 * Main method for the html page
 * @author: Bradley Mach
 * @version: 1.0
 */
async function main() {
    //Disable status bar
    StatusBar.disable();

    //Initialize app
    await AppInit.init("commonApps");

    if (Config.isLocalDebug) {
        //Run dev task for local debugging
        DevLib.RunDevTasks();

        //Wait for 3 seconds
        await ThreadX.sleep(3000);

        //Remove (black) flash screen
        document.documentElement.style.backgroundColor = "unset";
        document.body.style.display = "unset";

        //Show an info dialog box
        MessageBox.showInfo("This is a sample Info MessageBox");
    }
}
