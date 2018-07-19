const webpack = require('webpack'),
			webpackClientConfig = require('./client.config.js'),
			HtmlWebpackPlugin = require('html-webpack-plugin'),
			path = require('path'),
			pathConfig = require(path.resolve('./config')),
			ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin'),
			commonCssLoaderConfig = require('./common/loaders'),
			commonPlugins = require('./common/plugins');

const prependEntryPoints = (collection, prependCollection) => {
	let newCollection = [].concat(collection);
	[].unshift.apply(newCollection, prependCollection);
	return newCollection;
};

module.exports = (env = {}) => {

	const commonClientConfig = webpackClientConfig(env),
				devEntryPoints = [
					'react-hot-loader/patch',
					'webpack-dev-server/client?http://0.0.0.0:8081',
					'webpack/hot/only-dev-server'
				];

	return Object.assign({}, commonClientConfig, {
		entry: {
			main: prependEntryPoints(commonClientConfig.entry.main, devEntryPoints)
		},
		output: Object.assign({}, commonClientConfig.output, {
			chunkFilename: 'scripts/bundle.[name].js?v=[chunkHash]',
			filename: 'scripts/bundle.[name].js?v=[hash]'
		}),
		devServer: {
			contentBase: path.resolve(__dirname, '../', 'build'),
			disableHostCheck: true,
			historyApiFallback: true,
			host: '0.0.0.0',
			hot: true,
			inline: false,
			port: 8081,
			quiet: false
		},
		devtool: 'source-map',
		module: {
			rules: commonClientConfig.module.rules.concat([
				{
					test: /\.js$/,
					exclude: /node_modules\/(?!(components)\/).*/,
					use: [
						{
							loader: 'babel-loader',
							options: {
								presets: [['env', { modules: false }], 'react'],
								plugins: [
									...commonPlugins(env),
									'react-hot-loader/babel'
								]
							}
						}
					]
				},
				{
					test: /\.styl$/,
					use: [
						'style-loader',
						commonCssLoaderConfig(env),
						'stylus-loader'
					]
				}
			])
		},
		plugins: commonClientConfig.plugins.concat([
			new webpack.NamedModulesPlugin(),
			new webpack.HotModuleReplacementPlugin(),
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, '../', 'server/template', 'index.ejs'),
				filename: path.resolve(__dirname, '../', `${pathConfig.dest}index.html`),
				dist: path.resolve(__dirname),
				showErrors: true,
				isProd: false,
				inject: true,
				hasFonts: false,
				appWrapper: '<div id="react-view"><div></div></div>',
				webpackDevServer: true,
				googleAnalytics: {
					trackingId: 'UA-XXXX-XX',
					pageViewOnLoad: true
				},
				mobile: true,
				links: [
					'https://fonts.googleapis.com/css?family=Roboto',
					{
						rel: 'manifest',
						href: 'icons/manifest.json'
					}
				],
				title: 'RVBR - React Boilerplate - Development Env'
			}),
			new ScriptExtHtmlWebpackPlugin({
				defer: ['vendor', 'main']
			}),
			new webpack.LoaderOptionsPlugin({
				minimize: false,
				debug: true
			}),
			new webpack.DefinePlugin({
				'process.env': {
					'NODE_ENV': JSON.stringify(env.local ? 'local' : 'development'),
				}
			})
		])
	});
}
