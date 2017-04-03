const path = require("path")
const webpack = require('webpack')

const ip = 'localhost';

module.exports = {
  context: __dirname,

  entry: {
    App: [
      "./src/main.jsx",
   ],
    vendors: [
      "react",
      "react-dom",
      "react-redux",
      "react-tap-event-plugin",
      "react-router-redux",
      "material-ui",
   ]
  },

  plugins: [
     new webpack.HotModuleReplacementPlugin(),
     new webpack.NoEmitOnErrorsPlugin(),
     new webpack.optimize.CommonsChunkPlugin({name: 'vendors', filename: 'vendors.js'}),
 ],

  output: {
    path: path.resolve("./bundles/"),
    filename: "[name]-prod.js",
  },
  module: {
    loaders: [
      { test: /\.html$/, loader: "file?name=[name].[ext]" },
      { test: /.css$/, loader: "file?name=[name].[ext]" },
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ["babel-loader"]}
   ]
  },
     resolve: {
       extensions: ['.js', '.jsx']
   },
   devtool:  "#eval-source-map",

}
