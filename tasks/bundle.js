const { run } = require('runjs');

const config = require('../config'),
			parseWebpackOptions = require('./parseWebpackOptions');

const {
	webpack
} = config;

function bundle({ static, ...webpackOptions }) {
	const webpackConfigFile = static
		? webpack.staticConfig
		: webpack.clientProdConfig;

	return run(`webpack ${parseWebpackOptions(webpackOptions)} --config ${webpackConfigFile}`);
}

module.exports = bundle;
