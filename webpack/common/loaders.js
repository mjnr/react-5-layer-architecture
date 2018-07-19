module.exports = env => ({
	loader: 'css-loader',
	options: {
		importLoaders: 1,
		sourceMap: !env.local,
		modules: false,
		localIdentName: '[local]',
		minimize: !env.local,
		discardComments: { removeAll: !env.local },
	}
});
