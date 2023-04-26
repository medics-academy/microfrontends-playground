const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
    mode: "development",
    devServer: {
        port: 1001
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "barchartModule",
            filename: "remoteEntry.js",
            exposes: {
                "./BarchartIndex": "./src/index" // This is an alias for the main index file
            }
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
    ]
}
