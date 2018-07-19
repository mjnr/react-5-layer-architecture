const penthouse = require('penthouse'),
		path = require('path'),
		fs = require('fs'),
		cleanCSS = require('clean-css'),
		filterCSS = require('filter-css'),
		css = require('css');

const createPagesCollection = pageNames => Object.keys(pageNames).map(page => {
	if ((pageNames[page].nonCritical)) return null;
	let currentPage = pageNames[page],
			pageRoute = currentPage.path,
			pageName = currentPage.name || '';

	if (currentPage.customPathname) {
		pageRoute = `${currentPage.path}${currentPage.customPathname}`;
	} else if (currentPage.customParams) {
		pageRoute = `${currentPage.path}?${currentPage.customParams.key}=${currentPage.customParams.value}`;
	}

	return {
		route: pageRoute,
		name: pageName.toLowerCase()
	};
}).filter(i => i);

const nonCriticalStyles = ['@font-face'];

function criticalConfig(url, css) {
	return {
		url,
		css,
		forceInclude: [
			'#icons'
		],
		width: 1280,
		height: 768,
		timeout: 120000,
		strict: false,
		maxEmbeddedBase64Length: 1000,
		userAgent: 'critical',
		renderWaitTime: 5000,
		blockJSRequests: true
	};
}

function parseCSS(input) {
	return css.parse(input, {
		silent: true
	})
}

function minifyCSS(input) {
	return new cleanCSS({ level: 2 }).minify(input).styles;
}

function stringigyCSS(tree) {
	return css.stringify(tree, {
		silent: true
	});
}

function createStylesTree(rules) {
	return {
		stylesheet: {
			rules
		}
	};
}

function removeRulesWithEmptySelectors(rules) {
	return rules.filter(rule => rule.selectors && rule.selectors.length > 0);
}

function getStyleRules(cssInput) {
	let cssTree = parseCSS(cssInput),
			{ stylesheet } = cssTree,
			{ rules } = stylesheet;

	return rules;
}

function extractStylesSelectors(cssInput) {
	let rules = getStyleRules(cssInput);
	return rules && rules.length && rules.reduce((collection, rule) => {
		return collection.concat(rule.selectors);
	}, []);
}

function removeRulesBySelector(cssInput, blackListSelectors) {
	let baseRules = getStyleRules(cssInput);

	let newBaseRules = baseRules.map(baseRule => {
		if (baseRule.selectors) {
			return {
				...baseRule,
				selectors: baseRule.selectors.filter(selector => {
					return !blackListSelectors.includes(selector);
				})
			}
		}

		return baseRule;
	});

	return removeRulesWithEmptySelectors(newBaseRules);
}

function generateCriticalStyles(pageNames, host, mainCSSPath) {
	const mainCssFile = path.join(__dirname, `build${mainCSSPath}`),
				pagesCollection = createPagesCollection(pageNames);

	createCriticalPath(pagesCollection, host, mainCssFile, mainCSSPath);
}

function createCriticalPath(pagesCollection, host, mainCssFile, mainCSSPath) {

	if (pagesCollection.length > 0) {
		const currentPage = pagesCollection.shift();

		let { name, route } = currentPage;

		console.log(`Generating critical path of ${name} route`);

		const url = `${host}${route === '/' ? '' : route}/?nocache`,
					fileName = `${name}.critical.css`;

		const onWriteCriticalFile = criticalCss => {
			const cssPath = 'build/styles',
					criticalFile = `${cssPath}/${fileName}`,
					filteredCSSData = filterCSS(criticalCss, nonCriticalStyles),
					criticalCssData = minifyCSS(filteredCSSData);

			fs.writeFile(criticalFile, criticalCssData, (err) => {
				fs.readFile(mainCssFile, 'utf-8', (err, mainCssData) => {
					if (err) {
						console.log('Error on read critical file', err);
						process.exit(1);
					}

					const criticalCssSelectors = extractStylesSelectors(criticalCssData),
							nonCriticalCssRules = removeRulesBySelector(mainCssData, criticalCssSelectors),
							nonCriticalCssTree = createStylesTree(nonCriticalCssRules),
							nonCriticalCss = stringigyCSS(nonCriticalCssTree);

					fs.writeFile(`${cssPath}/${name}.css`, minifyCSS(nonCriticalCss), 'utf-8', (err) => {
						if (err) {
							console.log('Error on write noncritical file', err);
							process.exit(1);
						} else {
							console.log(`Critical path of route ${name} successfully generated`);
							createCriticalPath(pagesCollection, host, mainCssFile, mainCSSPath);
						}
					});
				})
			});
		};

		const onError = err => {
			console.log('Error on start penthouse', err);
			process.exit(1);
		};

		return penthouse(criticalConfig(url, mainCssFile))
			.then(onWriteCriticalFile)
			.catch(onError);
	} else {
		console.log('Done!');
		process.exit();
	}

}

module.exports = generateCriticalStyles;
