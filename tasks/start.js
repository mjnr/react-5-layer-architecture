const { options, run } = require('runjs');

const reset = require('./reset');
const optimizeImages = require('./optimizeImages');
const bundleWithServer = require('./bundleWithServer');
const bundle = require('./bundle');

function start(env) {
	const givenOptions = options(this);

	// run(`./node_modules/.bin/nsp check`);
	reset();
	optimizeImages();
	bundleWithServer(givenOptions)
}

module.exports = start;
