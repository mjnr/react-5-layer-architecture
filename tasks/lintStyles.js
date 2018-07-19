const { run } = require('runjs');

const config = require('../config');;

const {
	styles
} = config;

function lintStyles() {
	return run(`cross-conf-env stylint ${styles.dev}** -c ./.stylintrc`);
}

module.exports = lintStyles;
