import { CssExternalStyleSheet } from "./CssExternalStyleSheet.js";
export class Theme {
    static setThemeFromUrl() {
        let qstr = location.search;
        let urlParams = new URLSearchParams(qstr);
        let theme = urlParams.get("theme");
        if (!theme) {
            theme = "ThemeDark.css";
        }
        if (theme.toLowerCase() === "none") {
            console.log("theme is set to none");
            return;
        }
        let externalCssUrl = theme;
        if (!externalCssUrl.endsWith(".css")) {
            externalCssUrl += ".css";
        }
        let ConfigAny = Config;
        CssExternalStyleSheet.loadExternalStyleSheet(externalCssUrl);
    }
}
