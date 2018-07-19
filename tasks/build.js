const { options } = require('runjs');

const reset = require('./reset'),
			bundle = require('./bundle'),
			optimizeImages = require('./optimizeImages');

function build() {
	const givenOptions = options(this);

	const callBundleTask = (opts = { static: false }) => {
		bundle({
			static: opts.static,
			...givenOptions
		});
	};

	reset();
	optimizeImages();
	callBundleTask();
	callBundleTask({ static: true });
}

module.exports = build;
