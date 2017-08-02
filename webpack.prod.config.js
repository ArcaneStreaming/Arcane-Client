/* eslint-env node */
const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
	context: __dirname,

	entry: {
		App: [
			'./src/main.jsx',
		],
		vendors: [
			'react',
			'react-dom',
			'react-dropzone',
			'react-responsive',
			'react-waypoint',
		],
		style: [
			'material-ui',
			'react-slick',
			'react-tap-event-plugin',
			'react-color',
		],
		store: [
			'react-redux',
			'react-router-redux',
			'redux',
			'redux-logger',
			'redux-promise',
			'redux-thunk',
		],
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.optimize.CommonsChunkPlugin({ name: 'vendors', filename: 'vendors.js' }),
		new webpack.optimize.UglifyJsPlugin({
			mangle: true,
			compress: {
				warnings: false,
				pure_getters: true,
				unsafe: true,
				unsafe_comps: true,
				screw_ie8: true,
			},
			output: {
				comments: false,
			},
			exclude: [/\.min\.js$/gi],
		}),
		new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
		new CompressionPlugin({
			asset: '[path].gz[query]',
			algorithm: 'gzip',
			test: /\.js$|\.css$\.html$/,
			threashold: 10240,
			minRatio: 0,
		}),
	],

	output: {
		path: path.resolve('./bundles/'),
		filename: '[name].js',
	},
	module: {
		loaders: [
			{ test: /\.html$/, loader: 'file?name=[name].[ext]' },
			{ test: /.css$/, loader: 'file?name=[name].[ext]' },
			{ test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel-loader'] },
		],
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	devtool:  'cheap-module-source-map, #eval-source-map',

};
