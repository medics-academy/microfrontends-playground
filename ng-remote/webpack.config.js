const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'ngRemote',
      library: { type: 'var', name: 'ng-remote' },
      filename: 'remoteEntry.js',
      exposes: {
        './NgRemoteModule': './src/app/app.module.ts'
      }
    })
  ]
}
