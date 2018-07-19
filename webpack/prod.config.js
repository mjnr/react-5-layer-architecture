const webpack = require('webpack'),
			webpackClientConfig = require('./client.config.js'),
			path = require('path'),
			HtmlWebpackPlugin = require('html-webpack-plugin'),
			ExtractTextPlugin = require('extract-text-webpack-plugin'),
			PreloadWebpackPlugin = require('preload-webpack-plugin'),
			ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin'),
			pathConfig = require(path.resolve('./config')),
			FaviconsWebpackPlugin = require('favicons-webpack-plugin'),
			bundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
			commonCssLoaderConfig = require('./common/loaders'),
			commonPlugins = require('./common/plugins'),
			LodashWebpackPlugin = require('lodash-webpack-plugin'),
			HtmlIgnoreChunkPlugin = require('html-webpack-exclude-assets-plugin');

module.exports = (env = {}) => {

	const commonClientConfig = webpackClientConfig(env);

	return Object.assign({}, commonClientConfig, {
		output: Object.assign({}, commonClientConfig.output, {
			filename: 'scripts/bundle.[name].js?v=[hash]',
			chunkFilename: 'scripts/bundle.[name].js?v=[chunkHash]'
		}),
		devtool: 'cheap-module-source-map',
		module: {
			rules: commonClientConfig.module.rules.concat([
				{
					test: /\.js$/,
					exclude: /node_modules\/(?!(components)\/).*/,
					use: [{
						loader: 'babel-loader',
						options: {
							presets: [
								['env', {
									targets: {
										ie: 10,
										safari: 10
									},
									modules: false
								}],
								'react'
							],
							plugins: commonPlugins(env)
						}
					}]
				},
				{
					test: /\.styl$/,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: [
							commonCssLoaderConfig(env),
							'stylus-loader'
						]
					})
				}
			])
		},
		plugins: commonClientConfig.plugins.concat([
			new LodashWebpackPlugin({
				currying: true,
				flattening: true,
				paths: true,
				placeholders: true,
				shorthands: true
			}),
			new HtmlIgnoreChunkPlugin(),
			new ExtractTextPlugin({
				filename: 'styles/[name].css',
				allChunks: true
			}),
			new ScriptExtHtmlWebpackPlugin({
				defer: ['vendor', 'main']
			}),
			new FaviconsWebpackPlugin({
				logo: path.resolve(__dirname, '../', `build/images/logo.png`),
				emitStats: false,
				prefix: 'icons/',
				persistentCache: true,
				inject: true,
				background: 'red',
				title: 'Red Ventures App',
				icons: {
					android: true,
					appleIcon: true,
					appleStartup: true,
					coast: true,
					favicons: true,
					firefox: true,
					opengraph: true,
					twitter: true,
					yandex: true,
					windows: true
				}
			}),
			new webpack.DefinePlugin({
				rootPath: '/',
				'process.env': {
					NODE_ENV: JSON.stringify('production')
				}
			}),
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					'screw_ie8': true,
					'unused': true,
					'warnings': false,
					'dead_code': true
				},
				output: {
					comments: false
				},
				mangle: true,
				sourceMap: true
			}),
			new webpack.LoaderOptionsPlugin({
				minimize: true,
				debug: false
			}),
			new webpack.optimize.CommonsChunkPlugin({
				name: 'vendor',
				minChunks: m => m.resource && m.resource.includes('node_modules')
			}),
			new webpack.optimize.CommonsChunkPlugin({
				children: true,
				minChunks: 2
			}),
			new webpack.optimize.ModuleConcatenationPlugin(),
			new bundleAnalyzerPlugin({
				analyzerMode: 'static',
				reportFilename: 'report.html',
				defaultSizes: 'gzip',
				openAnalyzer: false
			})
		])
	});
}
