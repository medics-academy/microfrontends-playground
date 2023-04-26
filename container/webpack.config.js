const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
    mode: "development",
    devServer: {
        port: 1000
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "container",
            remotes: {
                barchart: "barchartModule@http://localhost:1001/remoteEntry.js"
            }
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        })
    ]
}
