/* eslint-env node */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
	publicPath: config.output.publicPath,
	hot: true,
	inline: true,
	historyApiFallback: true,
}).listen(8080, config.ip, function (err) {
	if (err) {
		console.log(err);
	}

	console.log('Listening at ' + config.ip + ':8080');
});
