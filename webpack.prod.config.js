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
      "lodash",
      "react",
      "react-color",
      "react-cookie",
      "react-dom",
      "react-dropzone",
      "react-redux",
      "react-responsive",
      "react-router-redux",
      "react-slick",
      "react-tap-event-plugin",
      "react-waypoint",
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
