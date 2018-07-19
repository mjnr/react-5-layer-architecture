const { run } = require('runjs');

function optimizeImages(env, webpackConfigFile) {
	return run("node scripts/kraken.js");
}

module.exports = optimizeImages;
