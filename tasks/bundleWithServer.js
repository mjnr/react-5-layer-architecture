const { run } = require('runjs');

const config = require('../config'),
			parseWebpackOptions = require('./parseWebpackOptions');

const {
	webpack
} = config;

function bundleWithServer(webpackOptions = {}) {
	return run(`webpack-dev-server --config ${webpack.clientLocalConfig} --env.env=local ${parseWebpackOptions(webpackOptions)}`);
}

module.exports = bundleWithServer;
