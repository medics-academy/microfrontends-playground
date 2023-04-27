const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
    mode: "development",
    devServer: {
        port: 1002
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "linechartModule",
            filename: "remoteEntry.js",
            exposes: {
                "./LinechartIndex": "./src/index" // This is an alias for the main index file
            }
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
    ]
}
