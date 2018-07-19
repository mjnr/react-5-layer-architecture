const webpack = require('webpack'),
			webpackCommonConfig = require('./common/config'),
			fs = require('fs'),
			path = require('path'),
			StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin'),
			commonPlugins = require('./common/plugins'),
			commonCssLoaderConfig = require('./common/loaders'),
			pathConfig = require(path.resolve('./config')),
			nodeExternals = require('webpack-node-externals'),
			createPageNames = require('../app/utils/createPageNames');

module.exports = (env = {}) => {

	const commonWebpackConfig = webpackCommonConfig(env);

		const currentAppConfig = commonWebpackConfig.plugins.find(p => {
			if (p.definitions && p.definitions['APP']) return true;
		}).definitions['APP'];

		const currentApp = JSON.parse(currentAppConfig);

	const pageNames = createPageNames(currentApp.ROOT_PATH),
				routesList = Object.keys(pageNames)
					.map((page) => pageNames[page].path.split('?').shift());

	return Object.assign({}, commonWebpackConfig, {
		name: 'Server',
		target: 'node',
		entry: {
			staticApp: path.resolve('./staticGenerator/index.js')
		},
		output: {
			publicPath: currentApp.ROOT_PATH,
			filename: `./staticApp.js`,
			path: path.join(process.cwd(), pathConfig.dest),
			libraryTarget: 'umd'
		},
		module: {
			rules: commonWebpackConfig.module.rules.concat([
				{
					test: /\.(css|styl)$/,
					loader: 'ignore-loader'
				},
				{
					test: /\.js$/,
					exclude: /node_modules\/(?!(components)\/).*/,
					use: [
						{
							loader: 'babel-loader',
							options: {
								presets: ['env', 'react'],
								plugins: commonPlugins(env).concat([
									'system-import-transformer'
								])
							}
						}
					]
				}
			])
		},
		plugins: commonWebpackConfig.plugins.concat([
			new webpack.optimize.LimitChunkCountPlugin({
				maxChunks: 1,
			}),
			new webpack.DefinePlugin({
				'process.env': {
					'NODE_ENV': JSON.stringify(!(env.local) ? 'production' : 'development'),
					'BROWSER': false
				},
			}),
			new StaticSiteGeneratorPlugin({
				paths: [currentApp.ROOT_PATH, ...routesList],
				locals: {
					rootPath: currentApp.ROOT_PATH,
					isProd: true,
					title: currentApp.SETTINGS.title,
				}
			})
		])
	});
};
