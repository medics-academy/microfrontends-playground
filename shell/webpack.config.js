const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');


// @Todo configure remote location
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      // library: { type: 'var', name: 'Shell' },
      remotes: {
        ngRemote: 'ngRemote@http://localhost:2000/remoteEntry.js'
      }
    })
  ]
}
