const { run } = require('runjs');

const config = require('../config');;

const {
	scripts
} = config;

function lintScripts() {
	return run(`cross-conf-env eslint ${scripts.dev}** ${scripts.dev}* -c .eslintrc`);
}

module.exports = lintScripts;
