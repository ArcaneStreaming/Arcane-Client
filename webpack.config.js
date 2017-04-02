const path = require("path")
const webpack = require('webpack')
const BundleTracker = require('webpack-bundle-tracker')

const ip = 'localhost';

module.exports = {
  context: __dirname,

  entry: {
    App: [
      'webpack-dev-server/client?http://' + ip + ':3000',
      'webpack/hot/only-dev-server',
      "./src/main.jsx",
   ],
    vendors: [
      "react",
      "react-dom",
      "react-redux",
      "react-tap-event-plugin",
      "material-ui",
   ]
  },

  plugins: [
     new webpack.HotModuleReplacementPlugin(),
     new webpack.NoEmitOnErrorsPlugin(),
     new webpack.optimize.CommonsChunkPlugin({name: 'vendors', filename: 'vendors.js'}),
     new BundleTracker({filename: './webpack-stats-local.json'})
 ],

  output: {
    path: path.resolve("./bundles/"),
    filename: "[name]-[hash].js",
    publicPath: 'http://' + ip + ':3000' + '/assets/bundles/'
  },
  module: {
    loaders: [
      { test: /\.html$/, loader: "file?name=[name].[ext]" },
      { test: /.css$/, loader: "file?name=[name].[ext]" },
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ["react-hot-loader","babel-loader"]}
   ]
  },
     resolve: {
       extensions: ['.js', '.jsx']
   },
   devtool:  "#eval-source-map",

}
