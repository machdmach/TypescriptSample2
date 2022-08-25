import '../xCommon/initWeb.js';
import { AppInit, ConfigX, GlobalErrorHandler, HTableData, MessageBox, MOutput, StatusBar, ThreadX } from '../xCommon/tsLib/tsLibPkg.js';
import { FiaTest1 } from './FiaTest1.js';

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

    //MOutput.tests();
    //HTableData.tests();
    await FiaTest1();

    //Wait for 3 secondsxs
    //await ThreadX.sleep(3000);

    //Remove (black) flash screen
    document.documentElement.style.backgroundColor = "unset";
    document.body.style.display = "unset";

    //Show an info dialog box
    //MessageBox.showInfo("This is a sample Info MessageBoxx");
}
