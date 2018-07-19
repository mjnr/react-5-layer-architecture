const parseWebpackOptions = (webpackOptions) => {
	const byOption = (option) => {
		const paramValue = webpackOptions[option];
		return `
			--env.${option}${typeof paramValue !== 'boolean'
				? `=${paramValue}`
				: ''}
		`.trim();
	};

	return Object.keys(webpackOptions)
		.map(byOption)
		.join(' ');
};

module.exports = parseWebpackOptions;
