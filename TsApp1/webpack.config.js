const path = require('path');

let webpackConf1 = {
    mode: 'production',
    //mode: 'development', //default=production, unless running webpack-dev-server, from CLI: --mode production
    devtool: false,
    performance: {
        maxEntrypointSize: 700123, //in bytes, 700K
        maxAssetSize: 10123123, //in bytes, 10M
        //hints: false, //warning, 'error',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/'),
        //path: '//vhpweb01/Sites/FsWeb_StaticFiles/PubSitesRoot/build/PubSites/'.replaceAll('/', '\\'),
        //libraryTarget: 'var',
        //library: '[name]',
    },
    entry: {
        mainSampleBundle: './build/SampleApps/mainApps.js',
        //mainMapsBundle: './build/PubSites/Maps/mainMaps.js',
        //mainPubSitesBundle: './build/PubSites/mainPubSites.js',

        //pubAppsMainBundle: './zz_tsOut/PubApps/PubAppsMain.js',
        //garsMainBundle: './zz_tsOut/GARS/GarsMain.js',
        //reamsMainBundle: './zz_tsOut/REAMS/ReamsMain.js',
        //fidsMainBundle: './zz_tsOut/GaFids/FidsMain.js',
        //<script src='../../../build/PubSites/Maps/mainMaps.js' type='module'></script>
        //webpackEntryBundle: './WebUI/xCommonJS/jsLibX/webpackEntry.js',
    },
    stats: 'normal', //https://webpack.js.org/configuration/stats/  verbose, normal, minimal, errors-only, none
};
module.exports = function (env) {
    return webpackConf1;
};
