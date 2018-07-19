const build = require('./tasks/build');
const bundle = require('./tasks/bundle');
const bundleWithServer = require('./tasks/bundleWithServer');
const clean = require('./tasks/clean');
const create = require('./tasks/create');
const generateCritical = require('./tasks/generateCritical');
const lintScripts = require('./tasks/lintScripts');
const lintStyles = require('./tasks/lintStyles');
const optimizeImages = require('./tasks/optimizeImages');
const prepush = require('./tasks/prepush');
const reset = require('./tasks/reset');
const start = require('./tasks/start');

module.exports = {
	'generate:critical': generateCritical,
	'bundle:with:server': bundleWithServer,
	'lint:styles': lintStyles,
	'lint:scripts': lintScripts,
	'optimize:images': optimizeImages,
	create,
	clean,
	reset,
	bundle,
	build,
	prepush,
	start
};
