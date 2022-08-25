import { CookiesX } from "../dom/Cookies.js";
import { MessageBox } from "../dom/MessageBox.js";
export class DxLib {
    static async handle_zzStuff() {
        if (alreadyExecuted("DxLib.handle_zzStuff"))
            return;
        let hrefLower = location.href.toLowerCase();
        if (!hrefLower.includes("zz"))
            return;
        let searchParams = new URLSearchParams(location.search.toLowerCase());
        let zzuname = searchParams.get("zzuname");
        if (zzuname && zzuname.length > 0) {
            CookiesX.setValue("zzuname", zzuname, Infinity, "/");
            await MessageBox.showInfo("username set in cookie to: " + zzuname);
            location.href = location.href.replace("zzuname", "zzunamx");
        }
    }
}
