const { run } = require('runjs');

const lintScripts = require('./lintScripts');

function prepush(env) {
	lintScripts();
}

module.exports = prepush;
