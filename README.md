
This is a sample Typescript app written in Typescript 4.7 and sass 1.53.

<pre>
## Prerequisites ----------------------------------------------------------------------
install Node.js
install npm
npm install -g typescript
npm install -g sass
npm install -g webpack
npm install -g webpack-cli

# Optional ---------------------------------------------------------------------------
npm install -g webpack-dev-server
npm install -g copy-webpack-plugin         #for webpack.config.js
npm install -g write-file-webpack-plugin   #for webpack.config.js
npm install -g tslint

# Compile -----------------------------------------------------------------------------
tsc           #compile/transpile .ts to .js files and output to ./WebUIx directory
sass2css.cmd  #compile/transpile .scss to .css files and output to ./WebUIx directory
webpack       #optimize, minimize, and bundle all js files into a single js file
               and output to ./zzWebpackOut

# Run -----------------------------------------------------------------------------
# On Localhost:
 Mount ./TsApp1 on an IIS website as "cs"
 Access the main html page: http://localhost:4141/NetApps/cs/WebUI/Apps/main.html
</pre>
