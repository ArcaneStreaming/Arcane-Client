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
      "react-cookie",
      "react-dom",
      "react-dropzone",
      "react-responsive",
      "react-waypoint",
   ],
   style: [
      "material-ui",
      "react-slick",
      "react-tap-event-plugin",
      "react-color"
   ],
   store: [
      "react-redux",
      "react-router-redux",
      "redux",
      "redux-logger",
      "redux-promise",
      "redux-thunk"
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
